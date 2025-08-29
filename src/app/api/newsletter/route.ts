import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

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

    // Email ke admin (notifikasi subscriber baru)
    const adminEmailContent = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Source:</strong> Website Footer</p>
    `;

    // Email welcome ke subscriber
    const welcomeEmailContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://tentatics.com/logo-png.png" 
            alt="Tentatics Logo" 
            style="height: 60px; width: auto;" />
        </div>
        
        <h2 style="color: #2D5016; text-align: center;">Welcome to Tentatics Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. You'll now receive:</p>
        <ul>
        <li>Latest updates about our services</li>
        <li>Industry insights and trends</li>
        <li>Exclusive offers and promotions</li>
        <li>Tech tips and best practices</li>
        </ul>
        <p>We're excited to have you on board!</p>
        <br>
        <p>Best regards,<br>The Tentatics Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #666; text-align: center;">
        If you didn't sign up for this newsletter, please ignore this email or 
        <a href="mailto:hello@tentatics.com" style="color: #2D5016;">contact us</a>.
        </p>
    </div>
    `;

    // Kirim email ke admin dengan FROM newsletter@tentatics.com
    await transporter.sendMail({
      from: `"Tentatics Newsletter" <${process.env.NEWSLETTER_EMAIL}>`,
      replyTo: process.env.EMAIL_USER,
      to: "hello@tentatics.com",
      subject: "New Newsletter Subscription",
      html: adminEmailContent,
    });

    // Kirim welcome email ke subscriber dengan FROM newsletter@tentatics.com
    await transporter.sendMail({
      from: `"Tentatics Newsletter" <${process.env.NEWSLETTER_EMAIL}>`,
      replyTo: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Tentatics Newsletter!",
      html: welcomeEmailContent,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { success: false, message: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
