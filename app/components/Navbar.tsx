import Link from 'next/link'
import Image from 'next/image'
import Logo from "./logo.png"

export default function Navbar(){
    return(
   <nav>
        <Image 
            src={Logo}
            width={70}
            alt='Helpdesk Logo'
            placeholder='blur'
        />
        <h1>HelpDesk</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/tickets">Tickets</Link>
    </nav>
    )
}