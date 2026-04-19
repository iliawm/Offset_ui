"use client"

import { useEffect, useState } from "react";

const Admins = ({isAdmin}:{isAdmin:boolean}) => {
    const [admins, setAdmins] = useState([]);
    const [openfield,setopenfield]= useState(false)


    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        id: "",
        role: "",
        isadmin:"",
    });
    const handlesubmit=async ()=>{
        try {

            const RES = await fetch("/api/AdminPanel/Users",{
                method:"POST" ,
                headers:{"Context-Type" : "application/json"},
                body: JSON.stringify(form),
            })
            const body = await RES.json()
            setForm( {...form ,
                name : body.user.name})
            if(RES.ok){
                window.location.reload()
            }

        }catch {

        }
    }
    const handleFetch = async () => {
        try {
            const res = await fetch("/api/AdminPanel/Users", {
                method: 'GET',
                cache: "no-cache"
            });
            if (!res.ok) return null;
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Error:", err);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await handleFetch();
            if (data && data.data) {
                setAdmins(data.data);
            }
        };


        fetchData();
    }, []);

    const handleEditToggle = (userId) => {

        if (editingId === userId) {
            setEditingId(null);
            return;
        }


        setEditingId(userId);

        const user = admins.find(a => a.id === userId);
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                id: user.id,
                role: user.role,
                isadmin: isAdmin,
            });

        }
    };


    const handleSave =async () => {
        console.log("ذخیره برای آی دی:", form.id);
        setEditingId(null);

        handlesubmit()
    };

    return (
        <div className="flex flex-col text-indigo-900 w-full h-full gap-5 p-4" dir="rtl">
            <div className="font-black w-full flex justify-between items-center">
                <div>لیست یوزر ها</div>
            </div>

            <div className="flex flex-col w-full h-full overflow-y-scroll  rounded-lg bg-gray-50 scroll-hidden">
                {admins!.map((e, index) => {

                    const isEditing = editingId === e.id;

                    return (
                        <div key={e.id} className="w-full mb-3 flex items-center justify-between gap-2 px-2 py-1">


                            <div className="w-fit h-full flex items-center">

                                <div className="w-fit h-full flex font-bold text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                                    {index + 1}
                                </div>

                            </div>


                            <div className="flex-1 h-fit py-3 px-4 flex items-center justify-between gap-4 border rounded-xl border-gray-200 bg-white shadow-sm">

                                <div className="w-full flex flex-col gap-2">
                                    {/* نام */}
                                    <div className="flex gap-2 items-center">
                                        <label className="text-sm font-semibold text-gray-700">نام:</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({...form, name: e.target.value,
                                                })}
                                                className="bg-indigo-50/50 border border-indigo-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-48"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-900">{e.name}</span>
                                        )}
                                    </div>

                                    {/* ایمیل */}
                                    <div className="flex gap-2 items-center">
                                        <label className="text-sm font-semibold text-gray-700">ایمیل:</label>
                                        {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) => setForm({...form, email: e.target.value,
                                                    })}
                                                    className="bg-indigo-50/50 border border-indigo-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-48"
                                                /> ) :
                                            <span className="text-sm text-gray-600">{e.email}</span> }
                                    </div>

                                    {/* ایدی */}
                                    <div className="flex gap-2 items-center">
                                        <label className="text-sm font-semibold text-gray-700">ایدی:</label>
                                        {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={form.id}
                                                    onChange={(e) => setForm({...form, id: e.target.value})}
                                                    disabled={true}
                                                    title={"Can Not edit Id"}
                                                    className="bg-red-600/50 border border-red-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm w-48 cursor-pointer"
                                                />) :
                                            <span className="text-xs font-mono text-gray-500 truncate max-w-[150px]"  title={e.id}>
                                            {e.id}
                                        </span> }
                                    </div>

                                    {/* سمت */}
                                    <div className="flex gap-2 items-center">
                                        <label className="text-sm font-semibold text-gray-700">سمت:</label>
                                        {isEditing ? (
                                                <select className="bg-indigo-50/50 border border-indigo-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-fit" value={form.role}  onChange={(e)=>{
                                                    setForm({
                                                        ...form,role:e.target.value,
                                                    })
                                                }}>
                                                    <option value={e.role} disabled={true}>{e.role}</option>
                                                    <option value={"admin"} >admin</option>
                                                    <option value={"user"} >user</option>
                                                </select>
                                            ):
                                            <span className="text-sm text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{e.role}</span>}
                                    </div>
                                </div>

                                {/* دکمه اقدام (ذخیره یا ویرایش) */}
                                <div className="w-fit h-full flex-shrink-0">
                                    {!isEditing ? (
                                        <button
                                            onClick={() => handleEditToggle(e.id)}
                                            className="p-2 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-colors group"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform">
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <div className={"flex flex-col gap-2 items-center justify-center"}>
                                            <button
                                                onClick={handleSave}
                                                className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </button>
                                            <button className={""} onClick={()=>{
                                                setEditingId(null)
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-5 h-5 text-red-600 hover:opacity-70 cursor-pointer transition-transform hover:scale-110"
                                                >
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Admins;
