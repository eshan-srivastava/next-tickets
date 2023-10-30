import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url); //url of request
    const code = url.searchParams.get('code');
    //this code is the verification code for user

    if (code){
        const supabase = createRouteHandlerClient({cookies});
        await supabase.auth.exchangeCodeForSession(code);
    }
    //TODO
    // else if (!code){
        
    // }
    return NextResponse.redirect(url.origin)
}