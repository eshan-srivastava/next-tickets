import { notFound } from "next/navigation";

interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    email: string,
}
export const dynamicParams = true;

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4001/tickets');

    const tickets = await res.json(); //get json data
    
    //this is done to generate routes at build time so a form of cachin
    //if revalidate is set to 0 then this is useless, only works on build time
    return tickets.map((ticket: Ticket) => ({
        id: ticket.id,
    }))
}
const getTicket = async (id: string) => {
    //imitate delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const res = await fetch('http://localhost:4001/tickets/' + id, {
        next: {
            //opting out of cache: 0, 2mins: 2*60
            revalidate:60*60,
        }
    });

    if (!res.ok){
        notFound();
    }

    return res.json();
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