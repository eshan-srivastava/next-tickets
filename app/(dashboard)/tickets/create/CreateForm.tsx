//this component needs hydration because it is interactive
"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateForm() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('low');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault(); //prevent form from reloading
        setIsLoading(true);

        const newTicket = {
            title, 
            body, 
            priority, 
            user_email:"xyz@abcsupport.com"
        }

        const res = await fetch('http:localhost:4001/tickets', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTicket)
        })

        if (res.status === 201){
            router.refresh(); //refresh page to refetch tickets and re-render main
            router.push('/tickets')
        }
    }

    return(
        <form onSubmit={handleSubmit} className="w-1/2" action="">
            <label htmlFor="title">
                <span>Title:</span>
                <input
                type="text"
                required 
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
                />
            </label>
            <label htmlFor="body">
                <span>Body:</span>
                <textarea 
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
                />
            </label>
            <label htmlFor="priority">
                <span>Priority:</span>
                <select
                name="priority" id="priority-select"
                onChange={(e) => setPriority(e.target.value)}
                value={priority}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </label>
            <button className="btn-primary" disabled={isLoading}>
            {isLoading && <span>Adding...</span>}
            {!isLoading && <span>Add Ticket</span>}
            </button>
        </form>
    )
}