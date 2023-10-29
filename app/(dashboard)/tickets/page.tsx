import TicketList from "./TicketList"
import { Suspense } from "react";
import Loading from "../(dashboard)/loading";

export default function Tickets() {
    return (
      <main>
        <nav>
            <div>
                <h2>Tickets</h2>
            </div>
        </nav>
        <Suspense fallback={<Loading/>}>
        <TicketList />
        </Suspense>
      </main>
    )
}