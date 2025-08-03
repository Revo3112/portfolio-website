import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // App password (not regular password)
      },
    });

    // Get additional info for better context
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || 'Direct visit';
    const wordCount = message.split(' ').length;
    const charCount = message.length;

    // Email to you (the website owner)
    const mailToOwner = {
      from: process.env.GMAIL_USER,
      to: 'revorahmat@gmail.com',
      subject: `🚀 New Portfolio Contact: ${name} (${wordCount} words)`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); padding: 25px; border-radius: 15px 15px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">📬 New Portfolio Message!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Someone reached out through your website</p>
          </div>

          <!-- Main Content -->
          <div style="background: white; padding: 35px; border-radius: 0 0 15px 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">

            <!-- Contact Info Card -->
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #8b5cf6;">
              <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                👤 Contact Information
              </h3>

              <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <span style="font-weight: 600; color: #374151; min-width: 80px;">Name:</span>
                  <span style="color: #6b7280; font-size: 16px;">${name}</span>
                </div>

                <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <span style="font-weight: 600; color: #374151; min-width: 80px;">Email:</span>
                  <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                </div>

                <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <span style="font-weight: 600; color: #374151; min-width: 80px;">Time:</span>
                  <span style="color: #6b7280; font-size: 16px;">${timestamp} WIB</span>
                </div>
              </div>
            </div>

            <!-- Message Content -->
            <div style="background: linear-gradient(135deg, #fef7ff, #faf5ff); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #06b6d4;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                💬 Message Content
              </h3>

              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); position: relative;">
                <div style="position: absolute; top: -5px; left: 20px; background: white; padding: 0 10px; font-size: 12px; color: #6b7280; font-weight: 500;">
                  ${wordCount} words • ${charCount} characters
                </div>
                <div style="margin-top: 10px; color: #374151; line-height: 1.7; font-size: 16px; white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <!-- Technical Info -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
              <h4 style="color: #0f172a; margin: 0 0 15px 0; font-size: 14px; display: flex; align-items: center;">
                🔧 Technical Details
              </h4>

              <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
                <div style="margin-bottom: 5px;"><strong>Source:</strong> ${referer}</div>
                <div style="margin-bottom: 5px;"><strong>Browser:</strong> ${userAgent.split(' ').slice(-2).join(' ')}</div>
                <div><strong>Form:</strong> Portfolio Contact Form v2.0</div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; padding: 25px 0;">
              <a href="mailto:${email}?subject=Re: Your message from portfolio website"
                 style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3); margin: 0 10px;">
                📧 Quick Reply
              </a>

              <a href="https://wa.me/6285156895683?text=Hi, I saw your message from ${name}"
                 style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); margin: 0 10px;">
                💬 WhatsApp
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 20px; color: rgba(255,255,255,0.8); font-size: 12px;">
            <p style="margin: 5px 0;">This message was sent from your portfolio contact form</p>
            <p style="margin: 5px 0;">🌐 <strong>revorahmat.vercel.app</strong> • 📧 Portfolio Email System</p>
          </div>
        </div>
      `,
    };

    // Generate personalized greeting based on time
    const hour = new Date().getHours();
    let greeting = '👋';
    let timeGreeting = 'Good day';

    if (hour < 12) {
      greeting = '🌅';
      timeGreeting = 'Good morning';
    } else if (hour < 17) {
      greeting = '☀️';
      timeGreeting = 'Good afternoon';
    } else {
      greeting = '🌙';
      timeGreeting = 'Good evening';
    }

    // Auto-reply email to the sender
    const autoReply = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `${greeting} Thank you for reaching out, ${name}! - Revo Rahmat`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); padding: 25px; border-radius: 15px 15px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">${greeting} Message Received!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">${timeGreeting}, ${name}! Your message is in good hands.</p>
          </div>

          <!-- Main Content -->
          <div style="background: white; padding: 35px; border-radius: 0 0 15px 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">

            <!-- Personal Welcome -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-block; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <h2 style="color: #1e293b; margin: 0; font-size: 22px;">Hi ${name}! 👋</h2>
                <p style="color: #64748b; margin: 10px 0 0 0; font-size: 16px;">Thank you for reaching out through my portfolio!</p>
              </div>
            </div>

            <!-- Message Confirmation -->
            <div style="background: linear-gradient(135deg, #fef7ff, #faf5ff); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #8b5cf6;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📝 Your Message (Received ${timestamp} WIB):</h3>

              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <div style="color: #374151; line-height: 1.7; font-size: 16px; white-space: pre-wrap; font-style: italic;">"${message}"</div>
              </div>

              <div style="margin-top: 15px; padding: 12px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #8b5cf6; font-weight: 600; font-size: 14px;">
                  ✅ Message logged and prioritized for response
                </p>
              </div>
            </div>

            <!-- Response Timeline -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #dcfce7); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #10b981;">
              <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px;">⏰ What happens next?</h3>

              <div style="space-y: 15px;">
                <div style="display: flex; align-items: center; padding: 12px; background: white; border-radius: 10px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div style="background: #10b981; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">1</div>
                  <div>
                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 2px;">Message Review (Within 2 hours)</div>
                    <div style="color: #6b7280; font-size: 14px;">I'll carefully read and analyze your message</div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; padding: 12px; background: white; border-radius: 10px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div style="background: #06b6d4; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">2</div>
                  <div>
                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 2px;">Personal Response (24-48 hours)</div>
                    <div style="color: #6b7280; font-size: 14px;">Detailed reply with next steps or answers</div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; padding: 12px; background: white; border-radius: 10px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <div style="background: #8b5cf6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">3</div>
                  <div>
                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 2px;">Follow-up Discussion</div>
                    <div style="color: #6b7280; font-size: 14px;">Further conversation via email, call, or meeting</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- While You Wait -->
            <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
              <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px;">🚀 While you wait, explore more:</h3>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <a href="https://revorahmat.vercel.app/#projects" style="display: block; background: white; padding: 15px; border-radius: 10px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;">
                  <div style="color: #f59e0b; font-size: 20px; margin-bottom: 8px;">💼</div>
                  <div style="color: #1e293b; font-weight: 600; margin-bottom: 4px;">Latest Projects</div>
                  <div style="color: #6b7280; font-size: 12px;">See my recent work</div>
                </a>

                <a href="https://revorahmat.vercel.app/#skills" style="display: block; background: white; padding: 15px; border-radius: 10px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;">
                  <div style="color: #8b5cf6; font-size: 20px; margin-bottom: 8px;">🛠️</div>
                  <div style="color: #1e293b; font-weight: 600; margin-bottom: 4px;">Tech Stack</div>
                  <div style="color: #6b7280; font-size: 12px;">My technical skills</div>
                </a>
              </div>

              <div style="text-align: center;">
                <a href="https://linkedin.com/in/revorahmat" style="display: inline-block; background: #0077b5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 8px; font-size: 14px;">
                  🔗 LinkedIn
                </a>
                <a href="https://github.com/Revo3112" style="display: inline-block; background: #333; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 8px; font-size: 14px;">
                  🐙 GitHub
                </a>
                <a href="https://wa.me/6285156895683" style="display: inline-block; background: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 8px; font-size: 14px;">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            <!-- Footer Message -->
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border-radius: 12px; color: white;">
              <h3 style="margin: 0 0 10px 0; font-size: 18px;">🎯 Looking forward to our collaboration!</h3>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your message is important to me, and I'm excited to discuss how we can work together.</p>
            </div>

          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 20px; color: rgba(255,255,255,0.8); font-size: 12px;">
            <p style="margin: 5px 0;"><strong>Revo Rahmat</strong> - Full Stack Developer & AI/ML Engineer</p>
            <p style="margin: 5px 0;">📧 revorahmat@gmail.com | 🌐 revorahmat.vercel.app | 📱 +62 851 5689 5683</p>
            <p style="margin: 5px 0; opacity: 0.7;">This is an automated confirmation. You'll receive a personal reply soon!</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(autoReply);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
