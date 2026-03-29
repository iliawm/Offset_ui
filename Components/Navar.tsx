import React from 'react'
import Link from "next/link";
import Image from "next/image";

export function Nav(){
    const LoggedIn = true
    const NavBarData={
        SiteName:"MedicalEngineering",
        UserProfile:"placeholder.png",
        ButtonText:" شروع کنیم",
            ItemsName:[{
                Name:"صفحه اصلی",
                Path:"/"
            }, 
            {
                Name:"درباره ما",
                Path:"/AboutUs",
            },{
                Name:"محصولات ما",
                Path:"/Services",
            },{
                Name:"تماس با ما",
                Path:"/contactUs",
            }],
        
    }
    return (
        <nav className={`w-full h-10 flex items-center bg-[#223645] justify-between p-8 lg:p-14 pb-6 `} dir={"rtl"}>
            <div className={"nav-right"}>
                <div className={"ham-menu font-bold  "}>
                    <svg width="30" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={"lg:hidden"}>
                        <path d="M4 7H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M4 15H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M4 23H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <div className={"hidden lg:block text-2xl text-white hover:text-green-600 cursor-pointer"}>
                        {NavBarData.SiteName}
                    </div>
                </div>
            </div>
            <div className={"nav-left"}>
                <div className={`flex items-center font-medium text-sm hover:opacity-60 bg-[#e12454] ${LoggedIn?"rounded-full " : "rounded-3xl px-4 py-2 lg:px-7 lg:py-3" }  lg:text-md  text-white cursor-pointer`}>
                    {!LoggedIn  ?
                        <Link href={"/signup"} className={"StartBtn"}>
                            {NavBarData.ButtonText}
                        </Link>
                        :
                        <Link href={"/Dashboard"} className={""}>
                            <Image alt={""} width={400} height={400} src={`/${ NavBarData ? NavBarData.UserProfile : "placeholder"}`} className={"h-12 w-12 rounded-full"} />
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}
