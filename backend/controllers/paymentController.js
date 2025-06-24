import Payment from "../models/Payment.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import UserProgress from "../models/UserProgress.js";
import { sendPaymentStatusEmail } from "../utils/sendCertificate.js";

export const checkEligibility = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;
    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing user or course ID" });
    }
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    // Calculate total possible XP
    let totalQuizXP = 0;
    let totalExerciseXP = 0;
    for (const topic of course.topics) {
      if (topic.quizId) {
        const quiz = await Quiz.findById(topic.quizId);
        if (quiz) totalQuizXP += quiz.questions.length * 10;
      }
      if (topic.exerciseId) {
        totalExerciseXP += 10;
      }
    }
    const totalPossibleXP = totalQuizXP + totalExerciseXP;
    // Fetch user progress
    const userProgress = await UserProgress.findOne({ userId });
    const userQuizXP = userProgress?.courseXP.get(courseId) || 0;
    const userExerciseXP = userProgress?.exerciseXP.get(courseId) || 0;
    const userTotalXP = userQuizXP + userExerciseXP;
    res.json({
      eligible: userTotalXP >= totalPossibleXP,
      userTotalXP,
      totalPossibleXP,
      details: { userQuizXP, userExerciseXP, totalQuizXP, totalExerciseXP },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eligibility check failed", error: error.message });
  }
};

export const payCertificateFee = async (req, res) => {
  try {
    const { transactionId, paymentType } = req.body;
    const userId = req.user._id;
    if (!transactionId || !paymentType) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const payment = await Payment.create({
      userId,
      transactionId,
      paymentType,
    });
    res.status(201).json({ success: true, payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment submission failed", error: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  const payments = await Payment.find().populate(
    "userId",
    "firstName",
    " email"
  );
  if (!payments || payments.length === 0) {
    return res.status(404).json({ message: "No payments found" });
  }
  res.json(payments);
};

export const paymentConfirmation = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body; // "approved" or "rejected"
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const payment = await Payment.findById(paymentId).populate(
      "userId",
      "firstName email"
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    payment.status = status;
    await payment.save();
    await sendPaymentStatusEmail({ user: payment.userId, status });
    res.json({ success: true, payment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Payment confirmation failed", error: error.message });
  }
};
