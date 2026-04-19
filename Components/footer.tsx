import React from 'react'
import Link from "next/link";

const Footer = () => {
    return (
        <div className={"bg-black/95 w-full relative bottom-0 flex gap-2 h-fit py-10 max-h-110"} dir={"rtl"}>
            <div className={"w-full flex-col p-8 pl-0 py-0 flex text-white/70 text-sm gap-2"} >
                <div className={"flex gap-1 flex-row"} >
                    ساخته شده توسط
                    <Link href={"/"} className={"text-[#8fb569]"}>
                        Iliawm
                    </Link>
                </div>
                <div className={"flex gap-1 flex-row"}>
                    مشاهده
                    <Link href={"/"} className={"text-[#8fb569]"}>
                        نمونه
                    </Link>
                    کارها
                </div>
                
            </div>
            <div className={"w-full flex-col p-8 pr-5 py-0 flex text-white/70  gap-8"} >
                <Link href={"/"} className={"text-[#8fb569]"}>
                    محصولات
                </Link>
                <Link href={"/"} className={"text-[#8fb569]"}>
                    پشتیبانی
                </Link>
                <Link href={"/"} className={"text-[#8fb569]"}>
                    منابع
                </Link>
                <Link href={"/"} className={"text-[#8fb569]"}>
                    شرکت
                </Link>
                


            </div>
            
        </div>
    )
}
export default Footer
