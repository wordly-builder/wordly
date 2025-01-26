// POST register account classic way

import {json} from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    const {token} = await request.json();

    console.log(token);

    return json({success: true});
}