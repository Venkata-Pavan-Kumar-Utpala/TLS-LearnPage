import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft,
  Trophy, Star, RotateCcw, Home, X, Send
} from "lucide-react";
import ScrollProgress from "../../components/ScrollProgress";
import useInViewport from "../../hooks/useInViewport";
import { courseAPI } from "../../services/api";

const CourseQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [titleRef, isTitleInViewport] = useInViewport();

  // Backend data state
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [quizId, setQuizId] = useState(null); // Store quiz ID from backend response

  // Get topicId from URL params or location state
  useEffect(() => {
    // Try to get topicId from URL search params or location state
    const urlParams = new URLSearchParams(window.location.search);
    const topicIdFromUrl = urlParams.get('topicId');
    const topicIdFromState = location.state?.topicId;

    const finalTopicId = topicIdFromUrl || topicIdFromState;

    console.log('Quiz component - URL params:', urlParams.toString());
    console.log('Quiz component - topicId from URL:', topicIdFromUrl);
    console.log('Quiz component - topicId from state:', topicIdFromState);
    console.log('Quiz component - final topicId:', finalTopicId);

    if (finalTopicId) {
      setTopicId(finalTopicId);
    } else {
      setError('Topic ID is required to load quiz');
      setLoading(false);
    }
  }, [location]);

  // Fetch quiz data from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!topicId || !courseId) return;

      try {
        setLoading(true);

        // First, get the course data to find the quiz ID
        console.log('Fetching course data to get quiz ID...');
        const courseData = await courseAPI.getCourse(courseId);
        console.log('Course data received:', courseData);

        // Find the topic and get its quiz ID
        const topic = courseData.topics?.find(t => t.topicId === topicId || t._id === topicId);
        console.log('Found topic:', topic);

        if (topic && topic.quizId) {
          setQuizId(topic.quizId);
          console.log('Quiz ID found in course data:', topic.quizId);
        } else {
          console.error('Quiz ID not found in course data for topic:', topicId);
        }

        // Then fetch the quiz questions
        const quizData = await courseAPI.getQuiz(courseId, topicId);
        console.log('Quiz data from backend:', quizData);

        // Transform backend data to match frontend format
        // Handle both 'topic' and 'topicTitle' from backend response
        const topicTitle = quizData.topicTitle || quizData.topic || topic?.title || 'Quiz';

        const transformedQuiz = {
          title: `${topicTitle} Quiz`,
          description: `Test your knowledge on ${topicTitle}`,
          timeLimit: 600, // Default 10 minutes
          passingScore: 70, // Default passing score
          xpPerQuestion: 10, // Default XP per question
          questions: quizData.questions.map((q, index) => ({
            id: q._id, // Use actual database ID for backend API calls
            displayId: index + 1, // For display purposes
            question: q.question,
            options: q.options,
            correct: q.correctAnswer, // This won't be available from backend for security
            explanation: q.explanation || "No explanation provided"
          }))
        };

        setQuiz(transformedQuiz);
        setTimeLeft(transformedQuiz.timeLimit);
        setError(null);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError(error.message);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId, topicId]);

  const currentQ = quiz?.questions[currentQuestion];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizStarted && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResults, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      // Scroll to top when moving to next question
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      // Scroll to top when showing results
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Scroll to top when moving to previous question
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quiz.timeLimit);
    // Scroll to top when starting quiz
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    setTimeLeft(quiz.timeLimit);
    // Scroll to top when retaking quiz
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Quiz</h1>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              setTimeout(() => navigate('/learn/courses'), 100);
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Quiz not found state
  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quiz Not Found</h1>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              setTimeout(() => navigate('/learn/courses'), 100);
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <ScrollProgress />
      
      <div className="relative z-10 pt-24 pb-12">
        <div className="container px-6 mx-auto max-w-4xl">
          
          {!quizStarted ? (
            // Quiz Start Screen
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 
                ref={titleRef}
                className={`Marquee-title-no-border ${isTitleInViewport ? 'in-viewport' : ''} mb-6`}
              >
                {quiz.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {quiz.description}
              </p>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {quiz.questions.length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {formatTime(quiz.timeLimit)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Time Limit</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {quiz.passingScore}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Passing Score</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="px-8 py-4 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-800 dark:text-blue-200 font-bold rounded-xl transition-all duration-300 hover:shadow-md border border-blue-200/50 dark:border-blue-700/50 flex items-center gap-3 mx-auto"
              >
                <Trophy className="w-5 h-5" />
                <span>Start Quiz</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : showResults ? (
            // Results Screen
            <QuizResults
              score={calculateScore()}
              passingScore={quiz.passingScore}
              totalQuestions={quiz.questions.length}
              selectedAnswers={selectedAnswers}
              questions={quiz.questions}
              xpPerQuestion={quiz.xpPerQuestion}
              onRetake={handleRetakeQuiz}
              onBackToCourse={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setTimeout(() => navigate(`/learn/courses/${courseId}`), 100);
              }}
              onBackToHome={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setTimeout(() => navigate('/learn'), 100);
              }}
            />
          ) : (
            // Quiz Question Screen
            <QuizQuestion
              question={currentQ}
              questionNumber={currentQuestion + 1}
              totalQuestions={quiz.questions.length}
              selectedAnswer={selectedAnswers[currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              timeLeft={timeLeft}
              canGoNext={selectedAnswers[currentQuestion] !== undefined}
              canGoPrevious={currentQuestion > 0}
              isLastQuestion={currentQuestion === quiz.questions.length - 1}
              courseId={courseId}
              topicId={topicId}
              quizId={quizId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Quiz Question Component
const QuizQuestion = ({
  question, questionNumber, totalQuestions, selectedAnswer,
  onAnswerSelect, onNext, onPrevious, timeLeft, canGoNext,
  canGoPrevious, isLastQuestion, courseId, topicId, quizId
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);

  const handleAnswerClick = (index) => {
    if (!answerSubmitted) {
      onAnswerSelect(index);
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer !== undefined && !answerSubmitted && !submitting) {
      setSubmitting(true);
      try {
        // Call the backend API to verify the answer
        const response = await courseAPI.submitQuizAnswer(
          courseId,
          topicId,
          question.id,
          selectedAnswer,
          quizId // Pass the quiz ID we got from the quiz data
        );

        console.log('Backend response:', response);
        setAnswerResult(response);
        setAnswerSubmitted(true);
        setShowFeedback(true);
      } catch (error) {
        console.error('Error submitting answer:', error);
        // Create a fallback response for error cases
        setAnswerResult({
          correct: false,
          explanation: `Error submitting answer: ${error.message}`,
          receivedXP: 0,
          correctOption: null,
          selectedOption: selectedAnswer
        });
        setAnswerSubmitted(true);
        setShowFeedback(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleNextClick = () => {
    setShowFeedback(false);
    setAnswerSubmitted(false);
    onNext();
  };

  const getOptionStyle = (index) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
        : 'border-gray-300 dark:border-gray-500 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20';
    }

    // Use backend response for correct answer
    if (answerResult && index === answerResult.correctOption) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    }

    // Show selected answer as red if it's wrong
    if (selectedAnswer === index && answerResult && !answerResult.correct) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    }

    // Show selected answer as green if it's correct
    if (selectedAnswer === index && answerResult && answerResult.correct) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    }

    return 'border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300';
  };

  const getOptionIcon = (index) => {
    if (!showFeedback) {
      return selectedAnswer === index ? (
        <CheckCircle className="w-4 h-4 text-white" />
      ) : null;
    }

    // Use backend response for correct answer
    if (answerResult && index === answerResult.correctOption) {
      return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
    }

    // Show X for selected wrong answer
    if (selectedAnswer === index && answerResult && !answerResult.correct) {
      return <X className="w-4 h-4 text-red-600 dark:text-red-400" />;
    }

    return null;
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20">
        <h2 className="text-xl font-poppins font-medium text-gray-900 dark:text-white mb-6">
          {question.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={answerSubmitted}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${getOptionStyle(index)} ${
                answerSubmitted ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    showFeedback && answerResult && index === answerResult.correctOption
                      ? 'border-green-500 bg-green-500'
                      : showFeedback && selectedAnswer === index && answerResult && !answerResult.correct
                      ? 'border-red-500 bg-red-500'
                      : showFeedback && selectedAnswer === index && answerResult && answerResult.correct
                      ? 'border-green-500 bg-green-500'
                      : selectedAnswer === index && !showFeedback
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400 dark:border-gray-400'
                  }`}>
                    {!showFeedback && selectedAnswer === index && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                    {showFeedback && getOptionIcon(index)}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{option}</span>
                </div>

                {/* Visual feedback icons - only show after submission */}
                {showFeedback && answerResult && (
                  <div className="flex-shrink-0">
                    {index === answerResult.correctOption ? (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    ) : selectedAnswer === index && !answerResult.correct ? (
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-5 h-5 text-white" />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Submit Answer Button */}
        {!answerSubmitted && selectedAnswer !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={handleSubmitAnswer}
              disabled={submitting}
              className={`px-8 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105 text-sm border ${
                submitting
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200/50 dark:border-gray-700/50'
                  : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-800 dark:text-blue-200 border-blue-200/50 dark:border-blue-700/50'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Answer'}
            </button>
          </motion.div>
        )}

        {/* Explanation with backend response */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-4 rounded-xl border ${
              answerResult?.correct
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                answerResult?.correct
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}>
                {answerResult?.correct ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-semibold ${
                    answerResult?.correct
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {answerResult?.correct ? 'Correct!' : 'Incorrect'}
                  </h4>
                  {answerResult?.receivedXP > 0 && (
                    <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                      <Trophy className="w-4 h-4" />
                      <span className="font-medium text-sm">+{answerResult.receivedXP} XP</span>
                    </div>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${
                  answerResult?.correct
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {answerResult?.explanation || question.explanation || "No explanation provided"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation - only show after answer is submitted */}
      {answerSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              canGoPrevious
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNextClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Quiz Results Component
const QuizResults = ({
  score, passingScore, totalQuestions, selectedAnswers,
  questions, onRetake, onBackToCourse, onBackToHome, xpPerQuestion
}) => {
  const passed = score >= passingScore;
  const correctAnswers = questions.filter((q, index) => selectedAnswers[index] === q.correct).length;
  const earnedXP = correctAnswers * (xpPerQuestion || 10);
  const bonusXP = passed ? Math.floor(earnedXP * 0.2) : 0; // 20% bonus for passing
  const totalXP = earnedXP + bonusXP;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-8"
    >
      {/* Results Header */}
      <div className={`p-8 rounded-2xl ${
        passed
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
      }`}>
        <div className={`text-6xl mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {passed ? '🎉' : '😔'}
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${
          passed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
        }`}>
          {passed ? 'Congratulations!' : 'Keep Trying!'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {passed
            ? 'You have successfully passed the quiz!'
            : 'You need more practice. Don\'t give up!'}
        </p>
      </div>

      {/* Score Details */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${
              passed ? 'text-green-600' : 'text-red-600'
            }`}>
              {score}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Your Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {correctAnswers}/{totalQuestions}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {passingScore}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Passing Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              +{totalXP}
            </div>
            <div className="text-gray-600 dark:text-gray-400">XP Earned</div>
          </div>
        </div>

        {/* XP Breakdown */}
        {passed && bonusXP > 0 && (
          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
            <div className="text-center">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">🎉 XP Breakdown</h4>
              <div className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                <div>Base XP: {earnedXP} ({correctAnswers} correct × {xpPerQuestion || 10} XP)</div>
                <div>Passing Bonus: +{bonusXP} XP (20% bonus)</div>
                <div className="font-bold border-t border-orange-200 dark:border-orange-700 pt-1 mt-2">
                  Total: {totalXP} XP
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={onRetake}
          className="flex items-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-800 dark:text-blue-200 font-bold rounded-xl transition-all duration-300 border border-blue-200/50 dark:border-blue-700/50"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Quiz
        </button>

        <button
          onClick={onBackToCourse}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-xl transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </button>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-300"
        >
          <Home className="w-4 h-4" />
          Learn Home
        </button>
      </div>
    </motion.div>
  );
};

// Helper function for formatting time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default CourseQuiz;
