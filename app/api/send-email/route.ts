import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { name, email } = await request.json();

    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Skipping email send.");
        return NextResponse.json({ message: "Email skipped (no API key)" });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Cre8Core <onboarding@resend.dev>', // Default testing domain
            to: [email],
            subject: 'Welcome to the Cre8Core Waitlist!',
            html: `
        <div style="font-family: 'Montserrat', sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #000; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Welcome to the Revolution!</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">Hi ${name},</p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            You've successfully secured your spot on the <strong>Cre8Core Waitlist</strong>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            We're building the future of decentralized collaboration, and we're thrilled to have you with us on this journey.
            You'll be among the first to know when we launch new features and opportunities.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #E4B95C; border-radius: 4px;">
            <p style="margin: 0; font-style: italic; color: #666;">"The future belongs to those who build it."</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">Stay tuned for updates!</p>
          
          <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 14px; color: #888;">Best,</p>
            <p style="font-size: 14px; font-weight: bold; color: #E4B95C;">The Cre8Core Team</p>
          </div>
        </div>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Email API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
