"use client"

import { FormEvent } from "react";
import AuthForm from "../AuthForm";

export default function Login(){
    
    const handleFormSubmit = async(e:FormEvent, email:string, password:string) => {
        e.preventDefault();

        console.log("user login", email, password);
    }
    
    return(
        <main>
            <h2 className="text-center primary">Login</h2>
            <AuthForm handleSubmit={handleFormSubmit}/>
        </main>
    )
}