// POST login account classic way

import {json} from "@sveltejs/kit";
import {postgres} from "../../../lib/database/postgres/db";

export async function POST({ request }: { request: Request }) {
    const {email, password} = await request.json();

    console.log(email, password);

    if (!email || !password) {
        return json({success: false, message: 'Missing email or password'});
    }

    // Check password
    const user = await postgres.auth.loginWithEmail(email, password);
    if (!user) {
        return json({success: false, message: 'Invalid email or password'});
    }

    // Create session
    const token = postgres.session.generateToken();
    const session = await postgres.session.create(token, user.id);

    if (!session) {
        return json({success: false, message: 'Failed to create session'});
    }

    return json({success: true, token});
}