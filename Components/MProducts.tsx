"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MProducts() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const scrollSpeed = 1.5;
    const [products,SetProducts]=useState([])
    const fetchproducts=async () => {
        const Response =await fetch("/api/Products", {
            method: `GET`,
            headers: {"Content-Type": "application/json"},
            // body: JSON.stringify("a"),
        });
        if (Response.ok){
        const data =await Response.json()
            SetProducts(data.products)
    }};
    useEffect(() => {
        const runfetch=async ()=>{
            await fetchproducts()
            
        }
        runfetch()

        
    }, []);
   
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let interval;

        // Only auto-scroll when not dragging
        interval = setInterval(() => {
            if (!isDragging && container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
                container.scrollLeft = 0;
            } else if (!isDragging) {
                container.scrollLeft += scrollSpeed;
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isDragging]);

    // Mouse drag handling
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const scrollContainer = scrollRef.current;
        let startX = e.pageX - scrollContainer.offsetLeft;
        let scrollLeft = scrollContainer.scrollLeft;

        const handleMouseMove = (e) => {
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Touch handling for mobile
    const handleTouchStart = (e) => {
        setIsDragging(true);
        const scrollContainer = scrollRef.current;
        scrollContainer.startX = e.touches[0].pageX - scrollContainer.offsetLeft;
        scrollContainer.startScrollLeft = scrollContainer.scrollLeft;
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const scrollContainer = scrollRef.current;
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - scrollContainer.startX) * 1.5;
        scrollContainer.scrollLeft = scrollContainer.startScrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="flex flex-col w-full h-fit lg:gap-5 ">
            <div className={"w-full flex flex-row-reverse items-center justify-between  p-7 lg:p-6 pb-0 "}>
            <h1 className="text-2xl  text-black" dir="rtl">
                محصولات ما
            </h1>
                <Link href={"/Products"} className={"text-[#e12454] font-bold"}>
                    بیشتر
                </Link>
            </div>
            <section
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="w-full h-fit overflow-x-auto flex gap-3 cursor-grab active:cursor-grabbing px-5 select-none py-4 "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {/* Product Cards */}
                {products.map((e, index) => (
                    <Link
                        href={`/Products/${e._id}`}
                        key={index}
                        className="shrink-0 w-48 h-fit lg:w-60  bg-[#223645]/70 flex flex-col items-center rounded-lg p-3 pb-5 shadow-md shadow-black gap-2 overflow-hidden"
                    >
                        <div className="w-full h-35">
                            <Image
                                width={200}
                                height={200}
                                alt=""
                                src={e.image? e.image : "/placeholder.png"}
                                className="w-full  h-full rounded-lg  "
                            loading="eager"/>
                        </div>
                        <h1 className="w-full text-white/80 font-black pt-2" dir="rtl">
                            {e.name}
                        </h1>
                        <p className="w-full text-white/80 text-sm font-semibold h-fit flex-wrap" dir="rtl">
                            {e.description}
                        </p>
                        <div className="flex w-full items-center justify-end pt-8" dir="rtl">
                            <div className="bg-[#8fb569] px-4 py-2 rounded-full text-sm shadow-md  shadow-black text-white a">
                                بیشتر بدانید
                            </div>
                        </div>
                    </Link>
                ))}
            </section>

            {/* Hide scrollbar */}
            <style jsx>{`
                section::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
