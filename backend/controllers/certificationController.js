import fs from "fs";
import PDFDocument from "pdfkit";
import { sendPaymentStatusEmail } from "../utils/sendCertificate.js";

export const generateCertificateController = async (req, res) => {
  try {
    const { name, email, courseName, xp } = req.body;

    // 1. Generate certificate PDF
    const certPath = `./certificates/${courseName}-${name}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(certPath));

    doc.fontSize(24).text("🎓 TechLearn Solutions", { align: "center" });
    doc.moveDown();
    doc.fontSize(20).text(`Certificate of Completion`, { align: "center" });
    doc.moveDown();
    doc
      .fontSize(16)
      .text(`${name} has completed the course`, { align: "center" });
    doc
      .fontSize(18)
      .text(`"${courseName}"`, { align: "center", underline: true });
    doc.moveDown();
    doc.text(`XP Earned: ${xp}`, { align: "center" });
    doc.moveDown();
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, {
      align: "center",
    });
    doc.end();

    // 2. Email the certificate
    await sendPaymentStatusEmail({ user: { firstName: name, email }, status: "approved" });

    res
      .status(200)
      .json({ message: "Certificate generated and emailed successfully" });
  } catch (err) {
    console.error("Certificate generation error:", err);
    res.status(500).json({ error: "Failed to generate/send certificate" });
  }
};
