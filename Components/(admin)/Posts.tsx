"use client"
import {useEffect, useState} from "react";
import {getSession} from "@/lib/auth";
import Image from "next/image";
import {readdirSync} from "node:fs";



const Posts = ({isAdmin}:{ isAdmin : boolean}) => {
    const [Method,Setmethod]= useState("")
    const [Search,SetSearch]= useState("")
    const [IsSearch,SetIsSearch]= useState(false)
    const [Sproducts,SetSproducts]= useState("")
    const [button,Setbutton]=useState("")
    const [Delete,SetDelete]=useState({
        id:"",
        isAdmin:isAdmin,
    })
    const [Form,setForm]=useState({
        name:"",
        description:"",
        image:"",
        category:"",
        creator:"",
        admin:isAdmin,
        id:"",
    })

    


    const [addpost,Setaddpost]=useState({
        name:"",
        description:"",
        image:"/placeholder.png",
        category:"",
        creator:"",
        admin:isAdmin,
    })
    
    const [products,Setproducts] = useState([Promise<object>])

    const handlefetch=async ()=>{
        const response = await fetch("/api/Products",{
            method:"GET",

        },
            )
        // console.log(addpost.admin)
        const data = await response.json()
        
        Setproducts(data.products)
        
    }
    const handleEdit=async ()=>{
        try {
            const response = await fetch("/api/AdminPanel/Edit",{
                method:"POST",
                body: JSON.stringify(Form)
            })
            const data =await response.json()
            if (response.ok){
                setTimeout(()=>{
                    window.location.reload()
                    
                }, 500)
                console.log("success")
            }
            console.log(data)

        }catch {

        }
    }
    const handlePost=async ()=>{
        try {
            const response = await fetch("/api/Products",{
                method:"POST",
                body: JSON.stringify(addpost)
            })
            if (response.ok){
                setTimeout(()=>{
                    window.location.reload()
                },300)
            }
            
        }catch {
            
        }
    }
    const handleclick= ()=> {
        try {
           
            
                const items = products.filter(a => {
                    const searchLower = Search.toLowerCase(); 

                    return (
                        a.name?.toLowerCase().includes(searchLower) || 
                        a.description?.toLowerCase().includes(searchLower) || 
                        a._id?.toString().includes(searchLower) 
                    );
                });                
                Setproducts(items)
                
            
        } catch {

        }
    }
    
    useEffect(() => {
        const handlesearch=()=>{
            if (Search.length>0){
                handleclick()
            }
            else{
                handlefetch()
            }
        }
        handlesearch()
    }, [Search]);
    const handleDelete=async ()=>{
        try {
            const response =await fetch("/api/AdminPanel",{
                method:"DELETE",
                body:JSON.stringify(Delete)
            })
            const data = await response.json()
            if (response.ok){
                // console.log(data)
                setTimeout(()=>{
                    window.location.reload()
                },400)
            }
            
            SetDelete("")
            
        }catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const handlesession=async ()=>{
            const session =await getSession()
            Setaddpost({
                ...addpost,
                creator:session,
            })


        }
        handlesession()
    }, []);
    useEffect(()=>{
        setForm({
            ...Form,
            id:button,
        })
    },[button])
    return (
        <div className={"p-2 flex flex-col w-full h-full "}>
            <div className={`${Delete.id? "fixed" : "hidden"} flex z-70  items-center justify-center  w-full h-full top-0 left-0`}>
            <div className={`   w-full h-full  bg-black/50 z-70  ${Delete.id ? "fixed" : "hidden"}`} onClick={()=>{
                SetDelete({
                    ...Delete,
                    id:""
                })
            }}>
            </div>
            <div className={`flex flex-col gap-5 bg-white w-fit md:w-120 md:h-fit h-60 rounded-2xl  z-80 p-3 py-5 md:p-15 ${Delete.id? "fixed" : "hidden"}`}>
                <div className={`w-full h-fit flex text-xl font-black text-red-500/80`}>
                    <div>اخطار</div>
                </div>
                <div className={"w-full h-fit text-black font-bold text-xl"} dir={"rtl"}>ایا میخواهید محصول
                    <br/>
                    <div dir={"ltr"}>
                    {Delete.id}
                    </div>
                    
                    را پاک کنید ؟</div>
                <div className={"w-full h-fit flex items-center justify-center gap-10  md:mt-15"}>
                    <div className={"px-6 bg-green-500 py-1 rounded-lg font-bold md:px-10 md:py-3 cursor-pointer hover:opacity-70 "} onClick={handleDelete}>بله </div>
                    <div className={"px-6 bg-red-500 py-1 rounded-lg font-bold md:px-10 md:py-3 cursor-pointer hover:opacity-70 "} onClick={()=>{
                        SetDelete({
                            ...Delete,
                            id:""
                        })
                    }}>خیر </div>
                </div>
            </div>
                
            </div>





                    <div className={"flex  p-2 justify-between w-full items-center"} dir={"rtl"}>
                        
                       
                        <div className={"text-2xl text-indigo-900 font-semibold"}>پست ها</div>
                        <div className={"flex gap-2 items-center justify-center"}>

                            <div className={"bg-indigo-900 text-white font-black font-sans px-5 py-[2px] rounded-xl hover:opacity-70 cursor-pointer"} onClick={()=>{
                                
                                if(Method !== "add"){
                                Setmethod("add")}
                               else if(Method === "add"){
                                    Setmethod("")}
                                
                            }}>+</div>
                            <div className={"bg-indigo-900 text-white font-black font-sans px-4 py-1 rounded-xl hover:opacity-70 cursor-pointer"} onClick={()=>{
                                if(Method !== "edit"){
                                    Setmethod("edit")
                                    handlefetch()
                                }
                                else if(Method === "edit"){
                                    Setmethod("")}

                            }}>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-5 group-hover:scale-110 transition-transform">
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                </svg>
                                
                            </div>
                            {Method ==="add"?
                            <div className={"bg-green-500 text-white font-black font-sans px-3 py-1 rounded-full hover:opacity-70 cursor-pointer"} onClick={handlePost}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>:(
                                Method==="edit"?
                                    <div className={"bg-green-500 text-white font-black font-sans px-3 py-1 rounded-full hover:opacity-70 cursor-pointer"} onClick={handleEdit}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    :""
                                )}
                        </div>
                    </div>
            <div className={"bg-indigo-900 w-full h-full rounded-2xl mt-3 p-3 text-white overflow-y-scroll overflow-x-hidden flex-col flex scroll-hidden"} dir={"rtl"}>
                {
                    Method? 
                    <div className={"w-full h-full"}>
                        {Method=="add"?
                        <div className={"w-full h-full flex "} >
                            <div className="flex flex-col w-full h-full" dir={"rtl"}>
                                <div className={"font-black text-xl"} >اضافه کردن پست</div>
                                <div className={"w-full flex gap-2 mt-10 items-center"}>
                                <label className={"text-white font-bold "}>نام:</label>
                                    <input type="text" className={"w-40 md:w-60 text-indigo-900 px-3 py-1 h-fit bg-white focus:outline-0 rounded-2xl"} onChange={(e)=>{
                                        Setaddpost({
                                            ...addpost,
                                            name:e.target.value
                                        })
                                    }}/>
                                </div>
                                <div className={"w-full flex gap-2 mt-10 items-center"}>
                                    <label className={"text-white font-bold "}>توضیحات:</label>
                                    <input type="text" className={"w-40 md:w-60 text-indigo-900 px-3 py-1 h-fit bg-white focus:outline-0 rounded-2xl"} onChange={(e)=>{
                                        Setaddpost({
                                            ...addpost,
                                            description:e.target.value
                                        })
                                    }}/>
                                </div>
                                <div className={"w-full flex gap-2 mt-10 items-center"}>
                                    <label className={"text-white font-bold "}>عکس:</label>
                                    <input type={"file"} className={"w-40 md:w-60 text-indigo-900 px-3 py-1 h-fit bg-white focus:outline-0 rounded-2xl"} disabled={true} title={"به دلیل نداشتن سرور ابری نمیتوانیم عکس برای فایل هاارايه دهیم"} onChange={(e)=>{
                                        Setaddpost({
                                            ...addpost,
                                            image:e.target.value
                                        })
                                    }}/>
                                </div>
                                <div className={"w-full flex gap-2 mt-10 items-center"}>
                                    <label className={"text-white font-bold "}> دسته بندی:</label>
                                    <select  className={"w-40 md:w-60 text-indigo-900 px-3 py-1 h-fit bg-white focus:outline-0 rounded-2xl hover:opacity-70 cursor-pointer"} value={addpost.category} required={true} onChange={(e)=>{
                                        Setaddpost({
                                            ...addpost,
                                            category: e.target.value
                                        })
                                    }}>
                                        <option value="" className={"hover:opacity-70 cursor-pointer"} disabled={true}>Select...</option>
                                        <option value="product" className={"hover:opacity-70 cursor-pointer"}>product</option>
                                        <option value="service" className={"hover:opacity-70 cursor-pointer"}>service</option>
                                        
                                    </select>
                                </div>
                                </div>
                            {/*<div className="flex flex-col items-center w-full h-full">*/}
                            {/*    */}
                            {/*</div>*/}
                        </div>
                            :
                        ""
                        }
                        {Method==="edit"?
                            <div>
                                <div className={`flex gap-2 items-center absolute rounded-2xl   ${IsSearch ? "bg-indigo-900  px-3 z-20":"z-10"}`}>
                                    <input type={"text"} className={` bg-white focus:outline-0 rounded-xl px-3 text-indigo-900 text-sm transition-all ease-linear delay-300 duration-200 py-1  ${IsSearch ? "w-50 visible":"w-0 invisible"}`} disabled={!IsSearch} value={Search} onChange={(e)=>{

                                        SetSearch(e.target.value)
                                        
                                       

                                    }}/>
                                    <div className={`text-xl font-bold ${IsSearch?"visible":"invisible"} hover:bg-green-500  rounded-2xl hover:px-4 px-1 py-1 cursor-pointer transition-all ease-linear`} onClick={()=>{
                                        handleclick()
                                        SetIsSearch(false)
                                    }}>
                                        search
                                    </div>
                                </div>

                                <div className={`absolute z-20 h-8 bg-white px-1 py-1 flex items-center justify-center text-indigo-900 rounded-full transition-all ease-linear delay-200 duration-200 ${IsSearch?"w-0 invisible":"w-8 visible"}`} onClick={()=>{
                                    SetIsSearch(true)
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            :""}
                            {Method==="edit"?
                            <div className={"w-full  h-full flex gap-3 flex-col md:flex-wrap md:flex-row overflow-y-scroll md:overflow-y-none items-center p-10 mt-5 scroll-hidden"}>
                                {
                                    products!.map((e,index:number)=>{
                                       const prodId = e._id
                                        return (
                                            <div

                                                key={index}
                                                className="shrink-0 w-full md:w-60 max-w-[244px] h-fit lg:w-60 relative z-0  bg-[#223645]/70 flex flex-col items-center rounded-lg p-3 pb-5 shadow-md shadow-black gap-2 overflow-hidden">
                                                {(button===e._id)?
                                                    <div className={"w-full h-35 p-3"}>
                                                        <input
                                                            type="file"
                                                            placeholder={e.image}
                                                            onChange={(e)=>{
                                                                setForm({
                                                                    ...Form,
                                                                    image: e.target.value
                                                                })
                                                            }}
                                                            disabled={true}
                                                            title={"Change name of product"}
                                                            className="bg-indigo-50/50 border border-indigo-200  px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-full   h-full rounded-lg hover:opacity-70 cursor-pointer"
                                                        />

                                                    </div>
                                                    :
                                                    <div className="w-full h-35">
                                                        <Image
                                                            width={200}
                                                            height={200}
                                                            alt=""
                                                            src={e.image? e.image : "/placeholder.png"}
                                                            className="w-full  h-full rounded-lg  "
                                                            loading="eager"/>
                                                    </div>}
                                                {(button===e._id)?
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={Form.name}
                                                            placeholder={e.name}
                                                            onChange={(e)=>{
                                                                setForm({
                                                                    ...Form,
                                                                    name: e.target.value
                                                                })
                                                            }}
                                                            title={"Change name of product"}
                                                            className="bg-indigo-50/50 border border-indigo-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-48"
                                                        />

                                                    </div>
                                                    :
                                                    <h1 className="w-full text-white/80 font-black pt-2" dir="rtl" >
                                                        {e.name}
                                                    </h1>


                                                }
                                                {(button===e._id)?
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={Form.description}
                                                            placeholder={e.description}
                                                            onChange={(e)=>{
                                                                setForm({
                                                                    ...Form,
                                                                    description: e.target.value
                                                                })
                                                            }}
                                                            title={"Change name of product"}
                                                            className="bg-indigo-50/50 border border-indigo-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-48"
                                                        />

                                                    </div>
                                                    :
                                                    <p className="w-full text-white/80 text-sm font-semibold h-fit flex-wrap" dir="rtl">
                                                        {e.description}
                                                    </p>}
                                                <div className="flex flex-row-reverse w-full items-center justify-between pt-8" dir="rtl">
                                                    <div className="bg-[#8fb569] px-4 py-2 rounded-full text-sm shadow-md  shadow-black text-white ">
                                                        {e?.creator?.name}
                                                    </div>

                                                    <div className={"w-fit flex gap-3 items-center "}>
                                                    <div className={"w-8 h-8 bg-white rounded-full text-indigo-900 flex justify-center items-center px-1 py-1 relative z-20 hover:animate-bounce cursor-pointer"} onClick={()=>{
                                                        console.log(prodId)
                                                        Setbutton(prodId)
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform">
                                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                                        </svg>
                                                    </div>
                                                        <div className={"w-8 h-8 bg-white rounded-full text-red-800 flex justify-center items-center px-1 py-1 relative z-20 hover:animate-bounce cursor-pointer"} onClick={()=>{
                                                            console.log(prodId)
                                                            SetDelete({
                                                                ...Delete,
                                                                id:prodId,
                                                            })
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                                <path d="M3 6h18"></path>
                                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                            })
                                }
                            </div> 
                            :""}
                    </div>
                        :
                        <div>لطفا متد را انتخاب کنید</div>
                }
            </div>
        </div>
    )
}
export default Posts
