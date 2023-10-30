"use client"

import { FormEvent, useState } from "react"

interface AuthFormProps {
    handleSubmit: (e: FormEvent, email:string, pass:string) => void
}

export default function AuthForm({ handleSubmit }: AuthFormProps) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <>
        <form onSubmit={(e) => handleSubmit(e, email, password)}>
            <label htmlFor="email">
                <span>Email</span>
                <input 
                type="email" 
                onChange={(e) => (setEmail(e.target.value))}
                value={email}
                required
                />
            </label>
            <label htmlFor="pass">
                <span>Password</span>
                <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                />
            </label>
            <button className="btn-primary">Submit</button>
        </form>
        </>
    )
}