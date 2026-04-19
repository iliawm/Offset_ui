"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";

export default function MainAbout() {
    const [LabDisplayNumber, setLabDisplayNumber] = useState(0);
    const [SatisdisplayNumber, SetSatisDisplayNumber] = useState(0);

    const about = {
        AboutText: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز.",
        PhoneNumber: "9123456789+",
        LabExamine: 208,
        Satisfactions: {
            amount: 35,
            ratio: "میلیون"
        },
        SatisPercent: {
            amount: 99,
            ratio: "%"
        },
        Images:[
            "/placeholder.png",
            "/placeholder.png",
            "/placeholder.png",
                ]
    }

    // Animation for LabExamine (208)
    useEffect(() => {
        const target = about.LabExamine;
        let start = 0;
        const duration = 2000; // 5 seconds
        const intervalTime = duration / target;

        const timer = setInterval(() => {
            start += 1;
            if (start >= target) {
                setLabDisplayNumber(target);
                clearInterval(timer);
            } else {
                setLabDisplayNumber(start);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    // Animation for Satisfactions.amount (35)
    useEffect(() => {
        const target = about.Satisfactions.amount;
        let start = 0;
        const duration = 2000; // 5 seconds
        const intervalTime = duration / target;

        const timer = setInterval(() => {
            start += 1;
            if (start >= target) {
                SetSatisDisplayNumber(target);
                clearInterval(timer);
            } else {
                SetSatisDisplayNumber(start);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='w-full  flex flex-col lg:flex-row   '>
            <div className="w-full h-fit bg-white pt-3  gap-2 lg:gap-5 flex  flex-col p-5 lg:flex-row" dir="rtl">
                <div className={"flex justify-start items-start flex-col "}>
                <div className="flex flex-col lg:gap-5 w-full h-fit lg:h-fit p-5 py-2">
                    <div className="w-full flex">
                        <div className="text-[#e12454]">درباره ما</div>
                    </div>
                    <div className="flex flex-col p-2 gap-5">
                        <div className="text-black font-medium text-2xl lg:text-4xl">انبوهی از تجربه برای شفا و کمک به شما</div>
                        <div className="text-sm opacity-60 font-medium">
                            {about.AboutText}
                        </div>
                    </div>
                </div>

                <div className="w-full  flex h-fit  justify-around border-gray-300  py-1 ">
                    <div className="h-fit flex flex-col">
                        <div className={"lg:text-5xl text-4xl font-bold text-[#8fb569] w-fit"}>{LabDisplayNumber}+</div>
                        <div className={"text-black/50"}>دستگاه فروخته شده</div>
                    </div>
                    <div className="h-fit flex flex-col">
                        <div className={"lg:text-5xl text-3xl font-bold text-[#e12454]"}>{SatisdisplayNumber}{about.Satisfactions.ratio}</div>
                        <div className={"text-black/50 pr-3 w-fit"}>رضایت مشتریان</div>
                    </div>
                </div>
                <div className={"flex justify-around w-full items-center"}>
                    <Link href={"/AboutUs"} className="bg-[#e12454] rounded-3xl px-2 lg:px-3 lg:py-3 py-2 text-white cursor-pointer hover:opacity-50 w-fit ">درباره ما بدانید</Link>
                    <a href={`tel:+98${about.PhoneNumber}`} className="text-[#e12454] flex flex-row-reverse gap-3 hover:opacity-50 cursor-pointer" >
                        {about.PhoneNumber}
                        <Image src={`/Phone.png`} width={400} height={400} alt={"phone"} className={"w-5 h-5"} />
                    </a>
                </div>
                </div>
                <div className={"flex p-4 pt-0 w-full "}>
                    <div className={"w-full flex justify-start items-end flex-col lg:p-5 lg:pb-0"}>
                        <div className={"border-10 border-white rounded-xl"}>
                        <Image src={`${about.Images[0]}`} width={400} height={400} alt={"image of our team working"} className={"w-50 h-30 lg:w-90 lg:h-60  rounded-xl"}/>
                        </div>
                        <div className={"relative w-full h-full bottom-20  flex justify-end"}>
                            <Image src={`${about.Images[0]}`} width={400} height={400} alt={"image of our team working"} className={"w-40 h-40 lg:w-60 lg:h-50 absolute rounded-xl border-10 border-white left-3"}/>
                        </div>
                        <div className={"border-10 border-white rounded-xl"}>
                            <Image src={`${about.Images[0]}`} width={400} height={400} alt={"image of our team working"} className={"w-50 h-30 lg:w-90 lg:h-60  rounded-xl"}/>
                        </div>
                        </div>
                </div>
            </div>

        </div>
    )
}
