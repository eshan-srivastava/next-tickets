import Navbar from "../components/Navbar";

type LayoutProps = {
    children: React.ReactNode,
};

export default function DashboardLayout ( props: LayoutProps){
    return(
        <>
        <Navbar/>
        {props.children}
        </>
    )
}