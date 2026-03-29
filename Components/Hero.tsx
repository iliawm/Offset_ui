import Image from "next/image";

export function Hero() {
    const HeroSec={
        HeadTitle:"همیشه بهترین خدمات پزشکی را ارائه داده ایم",
        Description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز.",
        BackGroundImage:"/",
        LeftSideImage:"/placeholder.png"
    }
    return (
        <section className="w-full h-fit bg-[#223645] flex flex-col " >
            <main className="flex flex-col lg:flex-row p-6 py-20  gap-25 lg:p-20 lg:justify-center items-center w-full" dir="rtl">
                    <div className={"flex-col flex gap-9 lg:gap-7 w-full"}>
                        <h1 className="text-5xl text-white font-semibold leading-13 lg:leading-20 lg:text-7xl lg:max-w-200 " >
                            {HeroSec.HeadTitle}
                        </h1>
                        <p className="text-white text-sm font-light mt-2 lg:max-w-w-150 lg:text-lg opacity-50">
                            {HeroSec.Description}
                        </p>
                    
                        <div className="buttons flex  gap-4 mt-4 mr-3 font-semibold">
                        <div className="rounded-3xl bg-[#e12454] px-8 py-3 text-sm font-medium cursor-pointer hover:opacity-70 text-white">بیشتر بدانید</div>
                        <div className="rounded-3xl bg-[#8fb569] px-8 py-3 text-sm font-medium cursor-pointer hover:opacity-70 text-white"  >تماس با ما</div>
                        <div></div>
                        </div>
                    </div>
                    <div className={"w-full h-fit max-w-[580px] lg:max-w-none p-6 "}>
                        <Image src={`${HeroSec?.LeftSideImage}`} width={400} height={400} alt="" className={"rounded-2xl w-full h-full lg:min-h-[380px]"} loading={"eager"}/>
                    </div>
            </main>
        </section>
    )
}
