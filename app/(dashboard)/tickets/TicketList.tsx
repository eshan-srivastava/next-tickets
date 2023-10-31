import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    email: string,
}

const getTickets = async () => {
    const supabase = createServerComponentClient({cookies});

    const { data, error } = await supabase.from('tickets')
    .select()
    //returns array of all ticket objects

    if (error){
        console.log(error.message);
    }
    return data;
}

export default async function TicketList () {
    const tickets = await getTickets();

    //TODO IMPLEMENT CONDITION WHEN TICKETS IS EMPTY
    return(
        <div>
            {tickets!.map((ticket: Ticket) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.body.slice(0, 200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
                    </Link>
                </div>
            ))}
            {tickets!.length === 0 && (
                <p className="text-center">There are no pending tickets •♣•</p>
            )}
        </div>
    )
}

/*
LEGACY FOR JSON WEBSERVER
const getTickets = async () => {
    //imitate delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const res = await fetch('http://localhost:4001/tickets', {
        next: {
            //opting out of cache: 0, 2mins: 2*60
            revalidate:2*60,
        }
    });

    return res.json();
}
*/