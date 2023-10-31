import { cookies } from "next/headers";
//supabase client for server component
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

//components
import Navbar from "../components/Navbar";
type LayoutProps = {
    children: React.ReactNode,
};

export default async function DashboardLayout (props: LayoutProps){
    const supabase = createServerComponentClient({cookies});
    const { data } = await supabase.auth.getSession();

    if (!data){
        //this is a server component so cannot use useRouter hooks
        redirect('/login')
    }
    return(
        <>
        <Navbar user={data.session?.user}/>
        {props.children}
        </>
    )
}