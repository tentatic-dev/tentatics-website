import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const TENTATICS_SYSTEM_PROMPT = `You are an AI assistant for Tentatics, a revolutionary PropTech company in Southeast Asia. Here's what you need to know about Tentatics:

COMPANY OVERVIEW:
- Tentatics is revolutionizing real estate across Southeast Asia with AI-powered PropTech solutions
- We empower developers, agencies, and agents to achieve unprecedented growth
- Founded by Christian Miracle (CEO) and Peter Shaan (CTO)
- We believe there are many properties out there that haven't been sold optimally
- We are a new startup currently in development phase, actively building innovative solutions

OUR SERVICES:
- B2B development services for real estate
- Advanced CRM (Customer Relationship Management) system
- Comprehensive CMS (Content Management System)
- AI integration for intelligent property management
- 3D visualization and integration technology
- Website development with AI capabilities
- FREE consultation services for interested clients

KEY VALUE PROPOSITIONS:
1. Help clients sell properties faster through our AI-powered solutions
2. Property listing evaluation and optimization
3. Advanced analytics and market insights
4. Automated lead generation and nurturing
5. 3D property visualization for better buyer engagement

CONTACT INFORMATION:
📍 Jakarta, Indonesia (Headquarters)
📞 +62 21 1234 5678 (24/7 Support)
📧 hello@tentatics.com (Email Support)

FREE CONSULTATION:
- We offer free consultation for potential clients
- Perfect opportunity to discuss your real estate challenges
- No commitment required - just valuable insights
- Contact us through any of the above channels

COMMON QUESTIONS TO ADDRESS:
- "How can Tentatics help me sell faster?"
- "Can you evaluate my listing now?"
- "Do you offer free consultation?"
- Questions about our AI integration
- Questions about 3D visualization capabilities
- CRM and CMS features

TONE & PERSONALITY:
- Professional yet approachable
- Knowledgeable about real estate and technology
- Solution-oriented
- Enthusiastic about helping clients succeed
- Always offer to connect them with our team for detailed discussions or free consultation
- Transparent about being a startup in development

Always respond in English unless the user specifically asks in Bahasa Indonesia. Be helpful, informative, and always try to guide conversations toward how Tentatics can solve their real estate challenges. Mention our free consultation offer when appropriate.

if they ask outside of context dont give any information.

if they ask about chat or contact give the contact information

and also be careful with user data and privacy.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: TENTATICS_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const botResponse =
      chatCompletion.choices[0]?.message?.content ||
      "Maaf, saya tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi atau hubungi tim kami langsung.";

    return NextResponse.json({
      message: botResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Fallback response for errors
    const fallbackResponse = `Maaf, terjadi kendala teknis. Namun saya tetap bisa membantu Anda! 

Tentatics adalah solusi PropTech yang revolusioner untuk mempercepat penjualan properti Anda dengan:
- Sistem AI yang cerdas untuk analisis pasar
- CRM terintegrasi untuk manajemen lead
- Visualisasi 3D yang memukau
- Evaluasi listing otomatis

Apakah Anda ingin tahu lebih lanjut tentang bagaimana kami bisa membantu mempercepat penjualan properti Anda?`;

    return NextResponse.json({
      message: fallbackResponse,
      timestamp: new Date().toISOString(),
    });
  }
}
