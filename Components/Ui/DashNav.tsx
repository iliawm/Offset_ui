"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {logout} from "@/lib/auth";

const DashNav = () => {
const [open,setOpen] = useState(false);
const [isAdmin,SetIsAdmin]=useState(false)
    const handleadmin=async ()=>{
        const response = await fetch("/api/Users",{
            method:"GET",
        })
        if(response.ok){
        const data = await  response.json()
            if(data?.user.role=="admin"){
                SetIsAdmin(true)
            }

        }
        
       
        

    }
    useEffect(() => {
        const runfetch =async ()=>{
            await handleadmin()
        }
        runfetch()
    }, []);
    return (
        <div>
            <div className={`h-full w-full bg-black/50 fixed top-0 transition-all ease-in-out z-30 ${open ? "left-0":"-left-full"}`} onClick={()=>{
                setOpen(!open);
            }}>
            </div>
            <div className={`fixed top-0 w-4/7 md:w-3/7 lg:w-2/7 h-fit bg-white flex flex-col duration-700 z-40 rounded-b-2xl mt-5 rounded-t-md ${open ? "left-0":"-left-full"}`}>
                <div className={"p-5 flex justify-between items-center "} onClick={()=>{
                    setOpen(!open);
                }}><svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500 md:text-gray-600 md:hover:text-red-500 transition-colors cursor-pointer "
                >
                    <path
                        d="M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                    <Link href={"/"} className={"w-fit h-fit"}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" transition-colors cursor-pointer  hover:text-blue-600 md:text-gray-500 text-blue-600 "
                        >
                            <path
                                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 22V12H15V22"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
                <ul className={" flex-col flex w-full h-full text-[#223645] font-semibold  pb-5"} dir={"rtl"} >
                    <Link href={"/Dashboard"} className={"border-b border-gray-200 hover:bg-gray-300 transition-all ease-in-out duration-1000 p-3"}>پروفایل</Link>
                    <Link href={"/Dashboard/Cart"} className={"border-b border-gray-200 hover:bg-gray-300 transition-all ease-in-out duration-1000 p-3"}>سبد خرید</Link>
                    <Link href={"/Dashboard"} className={"border-b border-gray-200 hover:bg-gray-300 transition-all ease-in-out duration-1000 p-3"}>محصولات</Link>
                    {isAdmin?
                    <Link href={"/Dashboard/ADMIN"} className={"border-b border-gray-200 hover:bg-gray-300 hover:text-yellow-500 transition-all ease-in-out duration-1000 p-3"}>پنل ادمین ⭐</Link>:"" }
                    <div className={"border-b border-gray-200 hover:bg-gray-300 hover:text-red-600 transition-all ease-in-out duration-1000 p-3 cursor-pointer hover:opacity-70"} onClick={()=>{
                        logout()
                    }}>
                        خروج از حساب
                    </div>
                    
                </ul>
            </div>
        <div className={"flex items-center justify-center rounded-full p-3 fixed z-20 top-10 left-5 bg-white shadow-md shadow-black animate-bounce hover:opacity-60 cursor-pointer text-gray-600 hover:text-blue-500"} onClick={()=>{
            setOpen(!open)
        }}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" transition-colors cursor-pointer"
            >
                <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
            
        </div>
            )
            
}
export default DashNav
