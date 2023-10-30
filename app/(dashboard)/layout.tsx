import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "../components/Navbar";

type LayoutProps = {
    children: React.ReactNode,
};

export default async function DashboardLayout (props: LayoutProps){
    const supabase = createServerComponentClient({cookies});
    const { data } = await supabase.auth.getSession();

    return(
        <>
        <Navbar/>
        {props.children}
        </>
    )
}