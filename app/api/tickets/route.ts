//CANNOT PUT ROUTE.TS IN A FOLDER WHERE A PAGE.TSX EXISTS AS IT CAUSES ROUTE CONFLICT
//This method of fetching, posting data is redundant for current project and only serves as a 
//template for future projects where fetching for a client component is required
//as per best practices, fetching,posting data in server components is good because it is
//server sided

import { NextResponse } from "next/server";
import { request } from "http";

export const dynamic = "force-dynamic"

export async function GET(){
    const res = await fetch('http://localhost:4001/tickets')

    const tickets = await res.json();

    return NextResponse.json(tickets, {
        status: 200,
    });
    //this is currently a static route handler (Because it is a simple GET handler) so if changes are made to dB while
    //the application is running it wont pick them up since this is fixed from build time
}

export async function POST(request: Request) {
    const ticket = await request.json();

    const res = await fetch('http://localhost:4001/tickets', {
        method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ticket)
    });

    const newTicket = await res.json();

    return NextResponse.json(newTicket, {
        status: 201,
    })
}