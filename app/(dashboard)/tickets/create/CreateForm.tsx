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

        const newTicket = {title, body,priority}; //handling email dynamically

        //update db.json with the new ticket data for testing
        // const res = await fetch('http:localhost:4001/tickets', {
        
        const res = await fetch('http:localhost:3001/api/tickets', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTicket)
        })

        const json = await res.json();
        if (json.error){
            console.log(json.error.message)
        }
        else if (json.data){
            router.refresh();
            router.push('/tickets');
        }
        // if (res.status === 201){
        //     router.refresh(); //refresh page to refetch tickets and re-render main
        //     router.push('/tickets')
        // } //Used if json API server is being used instead of supabase
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