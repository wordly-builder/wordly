// POST register account classic way
import {json} from "@sveltejs/kit";
import {sendMail} from "../../../lib/database/mail";
import {postgres} from "../../../lib/database/postgres/db";


function sendRegisterEmail(email: string, username: string) {
    return sendMail({
        to: email,
        subject: 'Welcome to Wordly!',
        text: `Welcome to Wordly! Your username is ${username}`,
        html: `<h1>Welcome to Wordly!</h1><p>Your username is ${username}</p>`
    });
}

export async function POST({ request }: { request: Request }) {
    const {email, username, password} = await request.json();

    console.log(email, username, password);

    if (!email || !username || !password) {
        return json({success: false, message: 'Missing email, username or password'});
    }

    // Create user
    try {
        const user = await postgres.user.createWithEmail(username, password, email);
        const emailSent = await sendRegisterEmail(email, username);

        return json({success: true});
    } catch (e) {
        console.error(e);
        return json({success: false, message: 'Failed to create user'});
    }
}