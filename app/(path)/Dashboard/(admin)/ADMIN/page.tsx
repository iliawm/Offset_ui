
import {getServerSession} from "@/lib/aurh-server";

import Link from "next/link";
import {Adminpanel} from "@/Components/(admin)/adminpanel";




async function handleadmin(){
    const res = await fetch("http://localhost:3000/api/AdminPanel", {

       cache:"no-cache",
        
        
    });
    if (!res.ok) {
        throw new Error('Failed to fetch admins');
    }
    if(res.ok){
        const data = await res.json()
        const admins = data.data
        
        
       
        
        return [admins]
    }

    
}


const Page =async () => {
    const data = await handleadmin();
    const session =await getServerSession()
    let isAdmin;
    const admin = await data![0].find(a => a.id === session?.id)

    
    if(admin && admin.role === "admin"){
         isAdmin=true;
    }
    else{
        isAdmin=false
    }

    return (
        <div className={"Admin-panel bg-indigo-900 h-full  w-full flex items-center justify-center flex-col overflow-y-scroll min-h-screen"}>
            <div className={"text-white font-black text-2xl w-full pr-5 pt-5"} dir={"rtl"}>پنل ادمین</div>
            <div className={"flex flex-col gap-8 w-full md:flex-row-reverse  h-150 p-2 md:p-10 md:justify-end"}>
            <div className={"w-full md:min-w-25 overflow-x-scroll bg-white rounded-2xl h-20 overflow-y-hidden flex gap-4 text-indigo-900 items-center p-2 font-semibold md:w-fit md:h-full md:justify-start  md:overflow-y-scroll md:overflow-x-hidden md:flex-col md:items-start scroll-hidden"} dir={"rtl"}>
                <Link href={"/Dashboard/ADMIN/?section=admins"} className={"shrink-0 md:w-full md:hover:opacity-70 cursor-pointer md:hover:bg-gray-400 md:rounded-2xl transition-all ease-in duration-500 py-5 md:whitespace-nowrap"}>
                    ادمین‌ ها
                </Link>
                <Link href={"/Dashboard/ADMIN/?section=Posts"} className={"shrink-0 md:w-full md:hover:opacity-70 cursor-pointer md:hover:bg-gray-400 md:rounded-2xl transition-all ease-in duration-500 py-5 md:whitespace-nowrap"}>
                    پست ها
                </Link>
                <Link href={"/Dashboard/ADMIN/?section=admins"} className={"shrink-0 md:w-full md:hover:opacity-70 cursor-pointer md:hover:bg-gray-400 md:rounded-2xl transition-all ease-in duration-500 py-5 md:whitespace-nowrap"}>
                    تم ها
                </Link>
                <Link href={"/Dashboard/ADMIN/?section=admins"} className={"shrink-0 md:w-full md:hover:opacity-70 cursor-pointer md:hover:bg-gray-400 md:rounded-2xl transition-all ease-in duration-500 py-5 md:whitespace-nowrap"}>
                    سفارش ها
                </Link>
                <Link href={"/Dashboard/ADMIN/?section=Users"} className={"shrink-0 md:w-full md:hover:opacity-70 cursor-pointer md:hover:bg-gray-400 md:rounded-2xl transition-all ease-in duration-500 py-5 md:whitespace-nowrap"}>
                    یوزر ها
                </Link>


                
            </div>
             <div className={"w-full bg-white h-full  rounded-2xl min-h-[460px] overflow-y-scroll scroll-hidden"} >
                 <Adminpanel isadmin={isAdmin}/>
             </div>
            </div>
        </div>
    )
}
export default Page
