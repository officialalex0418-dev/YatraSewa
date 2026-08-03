import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string, tempPassword: string) => {
  try {
    const loginLink = process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/login` : 'http://localhost:3000/login';

    await resend.emails.send({
      from: 'YatraSewa <onboarding@resend.dev>', // Change to your domain in production
      to: email,
      subject: 'Welcome to YatraSewa - Your Company Account is Ready',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 24px; padding: 40px;">
          <h1 style="color: #7c3aed; font-size: 24px; font-weight: 900;">Welcome to YatraSewa, ${name}!</h1>
          <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
            Your transport company account has been successfully created by the Super Admin.
            You can now log in and start managing your fleet, routes, and trips.
          </p>

          <div style="background-color: #f8fafc; border-radius: 16px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Temporary Password</p>
            <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 900; color: #1e293b;">${tempPassword}</p>
          </div>

          <a href="${loginLink}" style="display: inline-block; background-color: #7c3aed; color: white; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; margin-top: 16px;">
            Log In to Your Dashboard
          </a>

          <p style="color: #94a3b8; font-size: 14px; margin-top: 32px;">
            *For security reasons, please change your password immediately after your first login.
          </p>

          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 32px 0;" />

          <p style="color: #cbd5e1; font-size: 12px; text-align: center;">
            &copy; 2026 YatraSewa. Your Journey, Simplified.
          </p>
        </div>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
