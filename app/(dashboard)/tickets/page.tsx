import TicketList from "./TicketList"
import { Suspense } from "react";
import Loading from "../loading";

//metadata export for layout to use
export const metadata = {
  title: "HelpDesk Portal"
}

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