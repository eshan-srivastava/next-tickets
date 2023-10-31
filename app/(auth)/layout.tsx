import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthLayout ({children} : {children: React.ReactNode}) {
    const supabase = createServerComponentClient({cookies});
    const { data } = await supabase.auth.getSession();

    if (!data){
        //this is a server component so cannot use useRouter hooks
        redirect('/')
    }
    
    return(
        <>
            <nav>
                <h1>Helpdesk</h1>
                <Link href='/signup'>Sign up</Link>
                <Link href='/login'>Login</Link>
            </nav>
            {children}
        </>
    )
}