import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/email';
import nodemailer from 'nodemailer';

/**
 * Contact Form API Endpoint
 * Handles contact form submissions and sends emails
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Create email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.aloesigns.co.za',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: parseInt(process.env.SMTP_PORT || '465') === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email to admin
        const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2d2d2d; color: white; padding: 20px;">
    <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
  </div>
  
  <div style="background-color: #f9fafb; padding: 20px; margin-top: 20px;">
    <h2 style="color: #2d2d2d; margin-top: 0;">Contact Details</h2>
    
    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
      ${service ? `<p style="margin: 5px 0;"><strong>Service Interested In:</strong> ${service}</p>` : ''}
    </div>
    
    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin: 0 0 10px 0; color: #2d2d2d;">Message</h3>
      <p style="margin: 0; white-space: pre-wrap;">${message}</p>
    </div>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        Submitted: ${new Date().toLocaleString('en-ZA')}
      </p>
    </div>
  </div>
</body>
</html>
    `;

        const adminEmailText = `
NEW CONTACT FORM SUBMISSION

Contact Details:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${service ? `Service Interested In: ${service}` : ''}

Message:
${message}

Submitted: ${new Date().toLocaleString('en-ZA')}
    `.trim();

        // Email to customer (confirmation)
        const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Aloe Signs</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2d2d2d; color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 32px;">Aloe Signs</h1>
    <p style="margin: 10px 0 0 0; color: #d1d5db;">Thank you for getting in touch!</p>
  </div>
  
  <div style="background-color: #f9fafb; padding: 30px; margin-top: 20px;">
    <h2 style="color: #2d2d2d; margin-top: 0;">We've received your message</h2>
    <p>Hi ${name},</p>
    <p>Thank you for contacting Aloe Signs. We've received your message and will get back to you within 24 hours.</p>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0 0 10px 0; color: #2d2d2d;">Your Message</h3>
      <p style="margin: 0; color: #6b7280; white-space: pre-wrap;">${message}</p>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
      If you need immediate assistance, please call us at 
      <a href="tel:0116932600" style="color: #84cc16;">011 693 2600</a> or email 
      <a href="mailto:team@aloesigns.co.za" style="color: #84cc16;">team@aloesigns.co.za</a>.
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>© ${new Date().getFullYear()} Aloe Signs. All rights reserved.</p>
  </div>
</body>
</html>
    `;

        const customerEmailText = `
ALOE SIGNS - MESSAGE RECEIVED

Hi ${name},

Thank you for contacting Aloe Signs. We've received your message and will get back to you within 24 hours.

Your Message:
${message}

If you need immediate assistance, please call us at 011 693 2600 or email team@aloesigns.co.za.

© ${new Date().getFullYear()} Aloe Signs. All rights reserved.
    `.trim();

        // Send emails
        try {
            // Send to admin
            await transporter.sendMail({
                from: `"Aloe Signs Website" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
                to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
                subject: `New Contact Form: ${service || 'General Enquiry'}`,
                text: adminEmailText,
                html: adminEmailHtml,
            });

            // Send confirmation to customer
            await transporter.sendMail({
                from: `"Aloe Signs" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
                to: email,
                subject: 'Thank you for contacting Aloe Signs',
                text: customerEmailText,
                html: customerEmailHtml,
            });

            console.log(`Contact form submission from ${email}`);

            return NextResponse.json({
                success: true,
                message: 'Thank you! We\'ll be in touch soon.',
            });
        } catch (emailError) {
            console.error('Failed to send contact form emails:', emailError);
            return NextResponse.json(
                { error: 'Failed to send message. Please try again or contact us directly.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to process your request. Please try again.' },
            { status: 500 }
        );
    }
}
