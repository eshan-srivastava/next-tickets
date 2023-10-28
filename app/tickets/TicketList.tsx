interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    email: string,
}

const getTickets = async () => {
    const res = await fetch('http://localhost:4001/tickets', {
        next: {
            //opting out of cache: 0, 2mins: 2*60
            revalidate:2*60,
        }
    });

    return res.json();
}

export default async function TicketList () {
    const tickets = await getTickets();

    return(
        <div>
            {tickets.map((ticket: Ticket) => (
                <div key={ticket.id} className="card my-5">
                    <h3>{ticket.title}</h3>
                    <p>{ticket.body.slice(0, 200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority}
                    </div>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no pending tickets •♣•</p>
            )}
        </div>
    )
}