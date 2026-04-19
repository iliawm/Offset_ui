"use client"
import React, {useEffect, useRef, useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import { getSession, logout } from "@/lib/auth";

export  function Nav({scrollContainerId}:{scrollContainerId:string}){
    const [ham,SetHam]=useState(false)
    const [LoggedIn,setLoggedin] = useState(false);
    const navHeight= useRef<HTMLDivElement>(null)
    const [profileDrop,SetProfileDrop]=useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [user, setUser] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const NavBarData={
        SiteName:"MedicalEngineering",
        UserProfile:"placeholder.png",
        ButtonText:{
            signup:"شروع کنیم",
            signin:"اکانت داشتی؟"
        } ,
            ItemsName:[{
                Name:"صفحه اصلی",
                Path:"/"
            }, 
            {
                Name:"درباره ما",
                Path:"/AboutUs",
            },{
                Name:"محصولات ما",
                Path:"/Products",
            },{
                Name:"تماس با ما",
                Path:"/contactUs",
            }],
    }
    const ProfDrop = [{
        Name:"ٔداشبورد",
        Path:"/Dashboard",
    },
        {
            Name:"مقالات",
            Path:"/Dashboard",
        },
        {
            Name:"تماس با ما",
            Path:"/ContactUs",
        }]
    useEffect(()=>{
        if (navHeight.current){
          const height = navHeight.current.offsetHeight - 15
            document.documentElement.style.setProperty('--navbar-height', `${height}px`)

        }


    },[])
    useEffect(() => {
        const session = getSession();
        if (!session) {
            console.log("not logged in");

        } else {
            setUser(session);
            setLoggedin(true);
        }
        // console.log(session);
    }, []);
    useEffect(() => {
        const container = document.getElementById("main-scroll")

        if (!container) {
            console.log("کانتینر پیدا نشد!")
            return
        }

        const handleScroll = () => {
            if (container.scrollTop>124){
                SetProfileDrop(false)
            }
            setScrollY(container.scrollTop)
            
            
        }
        

        container.addEventListener('scroll', handleScroll, { passive: true })

        return () => container.removeEventListener('scroll', handleScroll)
    }, [scrollContainerId])
    return (
        <nav className={`w-full h-fit flex items-center bg-[#223645] justify-between p-8 lg:p-14  z-20`} dir={"rtl"} ref={navHeight} >
            <div className={`nav-blur inset-0 transition-all duration-200 w-full bg-black/10 backdrop-blur-xs fixed z-30 ${ham?"translate-x-0 ":"-translate-x-full"}`} onClick={()=>{
                SetHam(!ham)
            }}>
            </div>
            <div
                className={`rounded-3xl h-fit overflow-hidden bg-white fixed left-3 p-8 pr-5 max-h-60 transition-all duration-100 ease-linear  ${profileDrop ? " lg:w-50 w-30 opacity-100 translate-x-0" : " w-0 opacity-0 -translate-x-full"}`}
                style={{ top: 'var(--navbar-height, 0px)' }}
                
            >
                <ul className={`w-full h-full flex flex-col overflow-y-scroll gap-4 `}>
                    {ProfDrop.map((e, index) => (
                        <li key={index} className={"hover:opacity-85 cursor-pointer"}>
                            <Link href={e.Path}>{e.Name} </Link>
                        </li>
                    ))}
                    <li onClick={()=>{
                        logout()
                    }} className={"hover:opacity-85 cursor-pointer"}>لاگ اوت</li>
                </ul>
            </div>
            <div className={`nav-bar h-full right-0 top-0 transition-all duration-200 w-3/5 bg-[#e12454] flex flex-col  p-5 fixed z-40 gap-10 ${ham?"-translate-x-0 ":"translate-x-full"}`}>
                <div className={"w-fit h-fit"} onClick={()=>{
                    SetHam(!ham)
                }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <ul className={"w-full h-full flex flex-col border-b gap-5 border-black"}>
                    {NavBarData.ItemsName.map((e,index)=>{
                        return(
                            <li key={index} className={"border-b border-black/30"}><Link href={e.Path } >{e.Name}</Link></li>
                        )})}
                        
                    
                    
                </ul>
            </div>
            <div className={"nav-right"}>
                <div className={`ham-menu font-bold transition-all duration-500 ease-in-out ${ham?"rotate-90":""}`} >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={"lg:hidden"} onClick={()=>{
                        SetHam(!ham)
                    }}>
                        <path d="M4 7H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M4 15H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M4 23H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <Link href={"/"} className={"hidden lg:block text-2xl text-white hover:text-green-600 cursor-pointer"}>
                        {NavBarData.SiteName}
                    </Link>
                </div>
            </div>
            <div className={"nav-left"}>
                <div className={`flex items-center font-medium text-sm  cursor-pointer`}>
                    {!LoggedIn  ?
                        <>
                            {/* Sign Up Button */}
                            <Link
                                href="/signup"
                                className={`
                                  StartBtn z-20 bg-[#e12454] 
                                  rounded-3xl px-4 py-2 lg:px-7 lg:py-3 
                                  lg:text-md text-white
                                  transition-all duration-300
                                `}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {NavBarData.ButtonText.signup}
                            </Link>

                            {/* Sign In Button  */}
                            <Link
                                href="/SignIn"
                                className={`
                                  absolute z-10 bg-green-500 rounded-3xl 
                                  px-4 py-2 lg:px-7 lg:py-3 
                                  lg:text-md text-white
                                  transition-all duration-700
                                  ${isHovered
                                    ? "translate-y-15 opacity-100 visible"
                                    : "opacity-0 invisible translate-y-0"
                                }
        `}
                                style={{
                                    transitionDelay: isHovered ? '100ms' : '500ms'
                                }}
                            >
                                {NavBarData.ButtonText.signin}
                            </Link>
                        </>
                        :
                        <div  className={""} onClick={()=>{
                            SetProfileDrop(!profileDrop)
                        }}>
                            <Image alt={""} width={400} height={400} src={`/${ NavBarData ? NavBarData.UserProfile : "placeholder"}`} className={"h-12 w-12 rounded-full"} />
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
