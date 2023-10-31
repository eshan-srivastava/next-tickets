import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    email: string,
}
export const dynamicParams = true;

//exporting dynamic metadata for layout to use as metadata
export async function generateMetadata({ params: {id}} : {params: {id: string}}){
    // const ticketres = await fetch(`http://localhost:4001/tickets/${id}`);
    // const ticket = await ticketres.json();
    
    const supabase = createServerComponentClient({cookies});
    
    const { data: ticket } = await supabase.from('Tickets')
    .select()
    .eq('id', id)
    .single()
    
    return {
        title: `Ticket | ${ticket?.title || 'Not found'}`,
    }
};

const getTicket = async (id: string) => {
    const supabase = createServerComponentClient({cookies});
    
    const { data } = await supabase.from('Tickets')
    .select()
    .eq('id', id)
    .single()

    if (!data){
        notFound();
    }

    return data;
}

export default async function TicketDetails({ params: {id}} : {params: {id: string}}) {
    const ticket: Ticket = await getTicket(id);
    
    return(
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}

/*
LEGACY FOR JSON SERVER
not using static params here because now routes need to be built from data fetched from supabase

getTicket Function
//imitate delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const res = await fetch('http://localhost:4001/tickets/' + id, {
        next: {
            //opting out of cache: 0, 2mins: 2*60
            revalidate:60*60,
        }
    });

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4001/tickets');

    const tickets = await res.json(); //get json data
    
    //this is done to generate routes at build time so a form of cachin
    //if revalidate is set to 0 then this is useless, only works on build time
    return tickets.map((ticket: Ticket) => ({
        id: ticket.id,
    }))
}
*/