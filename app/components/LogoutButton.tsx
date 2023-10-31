"use client"
//client component because interacts with user like clickevent etc

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import Router from "next/router"

export default function Logout() {
    const router = useRouter();
    
    const handleLogout = async () => {
        const supabase = createClientComponentClient();
        const { error } = await supabase.auth.signOut();

        if (!error){
            router.push('/login')
        }
        else{
            console.log(error);
        }
    }

    return(
        <button className="primary" onClick={handleLogout}>
            Logout
        </button>
    )
}