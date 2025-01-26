import nodemailer from 'nodemailer';
import brevoTransport from 'nodemailer-brevo-transport';
import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport(new brevoTransport({
    apiKey: env.BREVO_API_KEY || '',
}));

export async function sendMail({ to, subject, text, html }: { to: string, subject: string, text: string, html: string }): Promise<boolean> {

    try {
        await transporter.sendMail({
            from: env.EMAIL_FROM,
            to,
            subject,
            text,
            html,
        });
    } catch (error) {
        console.error('Error sending email', error);
        return false;
    }
    return true;
}