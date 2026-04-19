"use client"

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Admins from "@/Components/(admin)/admins";
import {getSession} from "@/lib/auth";
import Link from "next/link";
import Posts from "@/Components/(admin)/Posts";
import Users from "@/Components/(admin)/Users";

export const Adminpanel = ({isadmin}:{ isadmin : boolean}  ) => {
    const [PageNav,SetPageNav]= useState<React.ReactNode>(null);
    const searchparams = useSearchParams()
    const section = searchparams.get("section")
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    
    useEffect(()=>{
   
        if(section==="admins"){
            SetPageNav(<Admins isAdmin={isadmin}/>)
        }else if(section==="Posts"){
            SetPageNav(<Posts isAdmin={isadmin}/>)
        }else if(section==="Theme"){
            SetPageNav(<Admins isAdmin={isadmin}/>)
        }else if(section==="Orders"){
            SetPageNav(<Admins isAdmin={isadmin}/>)
        }else if(section==="Users"){
            SetPageNav(<Users isAdmin={isadmin}/>)
        }
        else {
            SetPageNav(<Admins isAdmin={isadmin}/>)
        }


    },[section])
    useEffect(() => {

        const checkAuth = async () => {
            const session = await getSession();
            setIsAuthenticated(!!session);
        };

        checkAuth();
    }, []);

    return (
        <div className={"p-4 w-full h-full"}>
            
            {isAuthenticated?
                PageNav
                :
                <div className={"w-full h-full flex flex-col items-center justify-center gap-5"}>
                        <h1 className={"text-3xl text-gray-500 font-bold animate-pulse"}>
                            Please wait while we fetch data . . .
                        </h1>
                    <div className={"text-2xl text-gray-500 font-bold animate-pulse "}>
                         Dont Have An account ?
                    </div>
                        <div className={"flex gap-4 text-white font-black"}>
                            <Link href={"/signup" } className={"bg-indigo-900 py-3 px-4 rounded-4xl shadow-md shadow-black "}>Signup</Link>
                            <Link href={"/" } className={"bg-[#e12454] py-3 px-4 rounded-4xl shadow-md shadow-black "}>Home</Link>
                        </div>
                    </div>

                
            }
        </div>
    )
}
