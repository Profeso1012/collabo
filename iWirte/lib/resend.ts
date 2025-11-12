import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(email: string, blogTitle: string, blogUrl: string) {
  try {
    await resend.emails.send({
      from: 'iWrite <noreply@iwrite.com>',
      to: email,
      subject: `New Blog Post: ${blogTitle}`,
      html: `
        <h2>New Blog Post Published!</h2>
        <p>Check out our latest post: <strong>${blogTitle}</strong></p>
        <a href="${blogUrl}" style="background: #800020; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 16px;">Read Now</a>
      `,
    });
  } catch (error) {
    console.error('Failed to send newsletter:', error);
  }
}
