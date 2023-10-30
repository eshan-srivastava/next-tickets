"use client"

import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";

export default function Signup(){
    const router = useRouter();
    const [error, setError] = useState('');
    
    const handleFormSubmit = async(e:FormEvent, email:string, password:string) => {
        e.preventDefault();
        // console.log("user signup", email, password);

        const supabase = createClientComponentClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback`
            }
        })

        if (!error){
            router.push('/verify')
        }
        else if (error){
            setError(error.message);
        }
    }
    
    return(
        <main>
            <h2 className="text-center primary">Sign up</h2>
            <AuthForm handleSubmit={handleFormSubmit}/>
            {error && (
                <div className="error">{error}</div>
            )}
        </main>
    )
}