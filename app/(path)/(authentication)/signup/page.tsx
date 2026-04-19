"use client"
import { useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";



export default function SignUp() {
    const [error, SetError] = useState(``);
    const [Loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name:"",
        phone: ""
    });

    const handlesubmit =async (e)=>{
        e.preventDefault();
        SetError(``)
        setLoading(true)
        try{
            const response = await fetch(`/api/Users/Signup`,{
                method:`Post`,
                headers:{
                    "Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });
            const data = await response.json()
            
            if (response.ok){
                console.log(data)
                await router.push("/Dashboard")

            }else{
                SetError(data.error)
            }

        }catch (e){
            SetError(`Something Went Wrong `)
        } finally {
            setLoading(false)
        }

    }



    return (
        <main className={"flex w-full h-full bg-[#223645] justify-center  items-center p-10"}>
            <div className={"signIn-menu w-full max-w-100 bg-white h-fit rounded-2xl p-5 flex flex-col pb-15"}>
                <div className={"text-3xl text-[#223645] font-bold  pb-5"}>SignUp</div>
                {error?  <div className={"w-full h-15 bg-red-500/90 rounded-lg text-white flex items-center justify-center font-bold p-2"}>{error}</div> : <></>}

                <form  className={"flex flex-col gap-10 pt-5"} onSubmit={handlesubmit}>
                    <div className={"flex flex-col  gap-3"}>
                        <label className={"text-[#223645]/80 font-bold "}>Username</label>
                        <input type="text" placeholder={"ایدی خود را وارد کنید"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-right"} dir={"auto"} value={formData.name } onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
                    </div>
                    <div className={"flex flex-col  gap-3"}>
                        <label className={"text-[#223645]/80 font-bold "}>Telephone</label>
                        <input type="password" placeholder={"شماره خود را وارد کنید"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-right"} dir={"auto"} value={formData.phone }  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}/>
                    </div>
                    <div className={"flex flex-col  gap-3"}>
                        <label className={"text-[#223645]/80 font-bold "}>Email</label>
                        <input type="text" placeholder={"ایمیل خود را وارد کنید"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-right"} dir={"auto"} value={formData.email }  onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                    </div>
                    <div className={"flex flex-col  gap-3"}>
                        <label className={"text-[#223645]/80 font-bold "}>Password</label>
                        <input type="password" placeholder={"پسورد خود را وارد کنید"} className={"pl-3 focus:outline-none shadow-sm text-[#223645] shadow-black/30 py-3 rounded-lg pr-2 placeholder:text-indigo-400 placeholder:text-right"} dir={"auto"} value={formData.password }  onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                    </div>

                    <div className={"flex flex-col  gap-3 "}>
                        <Link href={"/SignIn"} className={"text-indigo-400/90 font-bold text-sm pr-3"} dir={"rtl"}>اکانت دارید؟</Link>
                        {Loading?
                            <input type="submit" disabled={Loading} className={`p-3 focus:outline-none  shadow-black/30 py-2 rounded-lg w-5/10 md:w-4/10 m-auto mt-5 bg-indigo-400 text-white text-2xl hover:opacity-85 cursor-pointer shadow-xl `} value={"Loading..."}/>
                            :
                            <input type="submit" disabled={Loading} className={`p-3 focus:outline-none  shadow-black/30 py-2 rounded-lg w-5/10 md:w-4/10 m-auto mt-5 bg-indigo-400 text-white text-2xl hover:opacity-85 cursor-pointer shadow-xl `} value={"تایید"}/>
                        }
                    </div>

                </form>

            </div>
        </main>
    )
}
