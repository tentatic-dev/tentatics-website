import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Deteksi jenis form berdasarkan struktur data
    let emailContent = "";
    let subject = "";

    if (data.requestFreeQuota) {
      // Form business customers contact
      emailContent = `
        <h2>New Business Contact Form Submission</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${
          data.message || "No message provided"
        }</p>
        <p><strong>Service For:</strong> ${
          data.serviceFor === "me" ? "For Me" : "For My Company"
        }</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `;
      subject = "New Business Contact Form Submission";
    } else {
      // Form multi-step contact
      emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>First Name:</strong> ${
        data.summary?.firstName || "Not specified"
      }</p>
      <p><strong>Last Name:</strong> ${
        data.summary?.lastName || "Not specified"
      }</p>
      <p><strong>Email:</strong> ${data.summary?.email || "Not specified"}</p>
      <p><strong>Phone:</strong> ${data.summary?.phone || "Not specified"}</p>
      <p><strong>Service:</strong> ${data.service || "Not specified"}</p>
      <p><strong>Request:</strong> ${data.request || "Not specified"}</p>
      <p><strong>Location:</strong> ${data.location || "Not specified"}</p>
      <p><strong>Contact:</strong> ${data.contact || "Not specified"}</p>
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
    `;
      subject = "New Contact Form Submission";
    }

    // Kirim email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "hello@tentatics.com",
      subject: subject,
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
