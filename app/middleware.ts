import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.refreshSession();
    return res;
}

//middleware is a function that runs on the server on every request immediately before any route is loaded -> a preliminary function