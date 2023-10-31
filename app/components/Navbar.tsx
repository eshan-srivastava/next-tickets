import Link from 'next/link'
import Image from 'next/image'
import Logo from "./logo.png"
import Logout from './LogoutButton'
import { User } from '@supabase/supabase-js'

interface NavbarProps{
    user?: User
}

export default function Navbar({ user }: NavbarProps){
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
        <Link href="/tickets" className='mr-auto'>Tickets</Link>
        
        {user && <span>Hello, {user.email}</span>}
        <Logout/>
    </nav>
    )
}