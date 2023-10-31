"use client"

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
//components
import AuthForm from "../AuthForm";

export default function Login(){
    const router = useRouter();
    const [error, setError] = useState('');

    const handleFormSubmit = async(e:FormEvent, email:string, password:string) => {
        e.preventDefault();
        // console.log("user login", email, password); //debugging

        setError(''); //new error on new submission
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error){
            setError(error.message);
        }
        else{
            router.push('/dashboard')
        }
    }
    
    return(
        <main>
            <h2 className="text-center primary">Login</h2>
            <AuthForm handleSubmit={handleFormSubmit}/>
            {error && (
                <div className="error">{error}</div>
            )}
        </main>
    )
}