import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// 🚀 Modern 2025 Email System with Resend + Gmail fallback
// Initialize Resend only when API key is available
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = parseInt(process.env.CONTACT_RATE_LIMIT || '3');

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const rateData = rateLimitMap.get(ip)!;

  if (now > rateData.resetTime) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (rateData.count >= maxRequests) {
    return false;
  }

  rateData.count++;
  return true;
}

// Professional email template
function createEmailTemplate(name: string, email: string, message: string) {
  const timestamp = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
                    New Contact Message
                </h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                    ${timestamp}
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">

                <!-- Contact Info in equal height boxes -->
                <div style="display: flex; gap: 20px; margin-bottom: 30px;">
                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; min-height: 80px; display: flex; flex-direction: column; justify-content: center;">
                        <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</h3>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500;">${name}</p>
                    </div>
                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; min-height: 80px; display: flex; flex-direction: column; justify-content: center;">
                        <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</h3>
                        <p style="margin: 0;">
                            <a href="mailto:${email}" style="color: #6366f1; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                        </p>
                    </div>
                </div>

                <!-- Message -->
                <div style="background: white; border: 2px solid #e5e7eb; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Message</h3>
                    <div style="color: #1f2937; font-size: 16px; line-height: 1.6; white-space: pre-wrap; font-weight: 400;">${message}</div>
                </div>

                <!-- Quick Actions -->
                <div style="text-align: center; margin-top: 30px;">
                    <a href="mailto:${email}?subject=Re: Your message from portfolio"
                       style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 0 8px; font-size: 14px;">
                        Reply
                    </a>
                    <a href="mailto:${email}?subject=Thank you for your message&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out through my portfolio. I received your message and will get back to you soon.%0D%0A%0D%0ABest regards,%0D%0ARevo"
                       style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 0 8px; font-size: 14px;">
                        Send Thanks
                    </a>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    Sent from Portfolio Contact Form • ${timestamp}
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Auto-reply template
function createAutoReplyTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for your message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
                    Message Received
                </h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                    Thank you for reaching out!
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Hi ${name}!</h2>

                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                    Thank you for contacting me through my portfolio website.
                    I have received your message and will get back to you as soon as possible.
                </p>

                <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
                    I typically respond within 24-48 hours. If you need urgent assistance,
                    please feel free to reach out via other channels.
                </p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #374151; font-size: 16px; font-weight: 500; margin: 0;">
                        Best regards,<br>
                        <strong>Revo</strong>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    This is an automated response from Revo's Portfolio
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Primary email sending function (Resend)
async function sendWithResend(to: string, subject: string, html: string) {
  if (!resend) {
    throw new Error('Resend not initialized - API key missing');
  }

  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  const result = await resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: subject,
    html: html,
  });

  return result;
}

// Fallback email function (Gmail SMTP)
async function sendWithGmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const result = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  });

  return result;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: 3600
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input with Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Email content
    const emailHtml = createEmailTemplate(name, email, message);
    const autoReplyHtml = createAutoReplyTemplate(name);

    const toEmail = process.env.TO_EMAIL || 'revorahmat@gmail.com';
    const ownerSubject = `🚀 New Portfolio Contact: ${name}`;
    const replySubject = `Thank you for contacting me, ${name}!`;

    let primarySuccess = false;
    let fallbackSuccess = false;
    let autoReplySuccess = false;

    // Try primary service (Resend) first
    try {
      if (resend && process.env.RESEND_API_KEY) {
        await sendWithResend(toEmail, ownerSubject, emailHtml);
        console.log('✅ Primary email sent via Resend');
        primarySuccess = true;

        // Send auto-reply
        try {
          await sendWithResend(email, replySubject, autoReplyHtml);
          console.log('✅ Auto-reply sent via Resend');
          autoReplySuccess = true;
        } catch (autoReplyError) {
          console.log('⚠️ Auto-reply failed via Resend, trying Gmail...');
        }
      }
    } catch (resendError) {
      console.log('⚠️ Resend failed, trying Gmail fallback...', resendError);
    }

    // Fallback to Gmail if Resend failed
    if (!primarySuccess) {
      try {
        await sendWithGmail(toEmail, ownerSubject, emailHtml);
        console.log('✅ Fallback email sent via Gmail');
        fallbackSuccess = true;

        // Send auto-reply via Gmail
        if (!autoReplySuccess) {
          try {
            await sendWithGmail(email, replySubject, autoReplyHtml);
            console.log('✅ Auto-reply sent via Gmail');
            autoReplySuccess = true;
          } catch (autoReplyError) {
            console.log('⚠️ Auto-reply failed via Gmail');
          }
        }
      } catch (gmailError) {
        console.log('❌ Gmail fallback also failed', gmailError);

        return NextResponse.json(
          {
            error: 'Email service temporarily unavailable. Please try again later.',
            fallback: `mailto:${toEmail}?subject=${encodeURIComponent(ownerSubject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
          },
          { status: 503 }
        );
      }
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      method: primarySuccess ? 'resend' : 'gmail',
      autoReply: autoReplySuccess,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
      },
      { status: 500 }
    );
  }
}
