"use client"
import Image from "next/image";
import { getSession } from "@/lib/auth";
import {useEffect, useRef, useState} from "react";

import Link from "next/link";




export default function Page() {
    const [loggedin, setLoggedin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, SetError] = useState(false);
    const [errorP, SetErrorP] = useState({
        message:"",
        color:"bg-red-500"
    });
    
    const [loadform, SetLoadform] = useState(false);
    const [dis, setDis] = useState(true);
    const refA = useRef(null)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name:"",
        phone: "",
        passlen:""
        
    });
    const fetchUserData = async () => {
        
        try {
            const response = await fetch("/api/Users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            })
            if (response.ok) {
                const data = await response.json();
                // console.log("data",data)
                setFormData({
                    ...formData,
                    email: data.user.email,
                    phone: data.user.phone.length === 11 ? data.user.phone : "Phone number not found ",
                    name: data.user.name || "",
                    passlen: data.user.passlen
                })

                setDis(true)
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            SetLoadform(false)
        }
    }
    useEffect(() => {
        
        const checkSession = async () => {
            const session = getSession();
            if (session) {
                setLoggedin(true);
                await fetchUserData()
            }
            setLoading(false);  
        };
        checkSession();

       
        const timer = setTimeout(checkSession, 100);

        return () => clearTimeout(timer);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        SetLoadform(true);

        try {
            const response = await fetch("/api/Users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setDis(true);
                SetLoadform(false);
                const data = await response.json();

                SetErrorP({
                    message: "اطلاعات با موفقیت تغییر کرد",
                    color: "bg-green-500"
                });
                SetError(true);

                setFormData({
                    ...formData,
                    email: data.user.email,
                    passlen: data.user.passlen || "",
                    phone: data.user.phone,
                });

                setTimeout(() => {
                    SetError(false);
                    SetErrorP({
                        message: "",
                        color: "bg-red-500"
                    });
                    window.location.reload();
                }, 1500);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "خطا در سرور");
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "خطای ناشناخته رخ داد";

            SetErrorP({
                message: errorMessage,
                color: "bg-red-500"
            });
            SetError(true);

            setTimeout(() => {
                SetError(false);
                SetErrorP({
                    message: "",
                    color: "bg-red-500"
                });
            }, 4000);
        } finally {
            SetLoadform(false);
        }
    };

    
    if (loading) {
        return (
            <div className="w-full h-screen bg-[#223645] flex items-center justify-center">
                <div className="text-white">در حال بارگذاری...</div>
            </div>
        );
    }

    if (!loggedin) {
    
        return <div className={"w-full h-full flex flex-col items-center justify-center gap-5"}>
            <h1 className={"text-3xl text-red-500"}>
                Not Authorized
            </h1>
            <div className={"flex gap-4 text-white font-bold"}>
            <Link href={"/SignIn" } className={"bg-green-400 py-3 px-4 rounded-4xl shadow-md shadow-black"}>SignIn</Link>
            <Link href={"/" } className={"bg-red-400 py-3 px-4 rounded-4xl shadow-md shadow-black"}>Home</Link>
            </div>
        </div> ;
    }

    return (
        <div className="w-full h-full bg-[#223645] p-5 flex items-center justify-center">
            <div className={`${errorP.color} text-white font-bold rounded-xl p-4 fixed top-0  mt-3 mr-3 transition-all ease-linear duration-500 ${error? "right-0":"-right-full"}`} >{errorP.message}</div>
            
            <div className="flex flex-col bg-white rounded-xl w-80 h-fit shadow-md shadow-black p-5 md:w-100" dir="rtl">
                <div className={"flex justify-between"}>
                <div className="text-2xl text-[#223645] font-semibold">پروفایل</div>
                <div className="text-2xl text-[#223645] font-semibold rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={"currentColor"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={"w-6 h-9 hover:opacity-60 cursor-pointer rounded-full "}
                        onClick={()=>{
                        setDis(!dis)
                        dis?
                            setFormData({...formData,
                                email: "",
                                passlen: "",
                                phone: "",
                            })
                            : window.location.reload()
                    }}>
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                </div>
                </div>
                <div className="w-full h-fit flex items-center justify-center pt-4">
                    <Image
                        src="/placeholder.png"
                        alt="pfp"
                        width={400}
                        height={400}
                        className="rounded-full w-25 h-25"
                        loading="eager"
                        priority
                    />
                </div>
                <form className="w-full h-fit mt-5 flex-col flex gap-7" onSubmit={handleSubmit}>
                    <div className={"flex flex-col  gap-3 "} >
                        <div className={"flex gap-2"}>
                        <label className={"text-[#223645]/80 font-bold "}>ایمیل</label>
                            <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-md hover:opacity-80 cursor-pointer" onMouseDown={()=>{
                                if (dis){
                                    SetError(true)
                                    SetErrorP({
                                        ...errorP,
                                        message:"برای ویرایش مداد را بزنید"
                                    })
                                }}}
                                 onMouseUp={() => {
                                     if (dis) {
                                         setTimeout(() => {
                                             SetError(false);
                                             SetErrorP({
                                                 ...errorP,
                                                 message:""
                                             })
                                         }, 1500);
                                     }
                                 }}>
                                !
                            </div>
                        </div>
                        <input type="email" placeholder={"index@e.g.com"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-left disabled:cursor-not-allowed disabled:bg-gray-300"} dir={"auto"} disabled={dis} ref={refA} onInput={(e: React.FormEvent<HTMLInputElement>)=>{
                            setFormData({
                                ...formData,
                                email: e.target.value
                            });
                        }} value={formData.email} />

                    </div>
                    <div className={"flex flex-col  gap-3"}>
                        <div className={"flex gap-2"}>
                            <label className={"text-[#223645]/80 font-bold "}>پسورد</label>
                            <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-md hover:opacity-80 cursor-pointer" onMouseDown={()=>{
                                if (dis){
                                    SetError(true)
                                    SetErrorP({
                                        ...errorP,
                                        message:"برای ویرایش مداد را بزنید"
                                    })
                                }}}
                                 onMouseUp={() => {
                                     if (dis) {
                                         setTimeout(() => {
                                             SetError(false);
                                             SetErrorP({
                                                 ...errorP,
                                                 message:""
                                             })
                                         }, 1500);
                                     }
                                 }}>
                                !
                            </div>
                        </div>
                        <input type="text" placeholder={"1234567890"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-left disabled:cursor-not-allowed disabled:bg-gray-300"} dir={"auto"} disabled={dis} onInput={(e: React.FormEvent<HTMLInputElement>)=>{
                            
                            setFormData({
                                ...formData,
                                password: e.target.value
                            });
                            
                        }} value={
                            dis? formData.passlen : formData.password}/>
                        

                    </div>
                    <div className={"flex flex-col  gap-3"} >
                        <div className={"flex gap-2"}>
                            <label className={"text-[#223645]/80 font-bold "}>شماره</label>
                            <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-md hover:opacity-80 cursor-pointer" onMouseDown={()=>{
                                if (dis){
                                    SetError(true)
                                    SetErrorP({
                                        ...errorP,
                                        message:"برای ویرایش مداد را بزنید"
                                    })
                                }}}
                                 onMouseUp={() => {
                                     if(dis) {
                                         setTimeout(() => {
                                             SetError(false);
                                             SetErrorP({
                                                 ...errorP,
                                                 message: ""
                                             })
                                         }, 1500);
                                     }
                                 }}>
                                !
                            </div>
                        </div>
                        <input type="tel" placeholder={"09123456789"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-left disabled:cursor-not-allowed disabled:bg-gray-300 "} dir={"auto"} disabled={dis} onInput={(e: React.FormEvent<HTMLInputElement>)=>{
                            setFormData({
                                ...formData,
                                phone: e.target.value
                            });
                        }} value={formData.phone} minLength={11} maxLength={11}/>

                    </div>
                    {!dis ?<input type={"submit"} className={"w-full h-15 bg-green-400 flex justify-center items-center text-amber-50 font-bold text-2xl rounded-2xl hover:opacity-80 cursor-pointer mt-5"} value={`${loadform?"در حال بررسی...":"تایید"}`}/>
                    :<div className={"hidden "}></div>   }</form>
            </div>
        </div>
    );
}
