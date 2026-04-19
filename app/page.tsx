
import { Hero } from "@/Components/Hero";

import MainAbout from "@/Components/MainAbout";
import {Nav} from "@/Components/Navbar";
import MProducts from "@/Components/MProducts";
import Footer from "@/Components/footer";

export default function Home() {
  return (
      <main id={"main-scroll"} className="w-full h-screen overflow-y-scroll snap-mandatory snap-y snap-center "  >
          
          <section className="h-fit snap-center">
              <div className="w-full h-fit bg-[#223645] flex flex-col pt-0" >
                  <nav className=" bg-[#223645] w-full h-fit z-20">
                      <Nav scrollContainerId="main-scroll"/>
                  </nav>
              <Hero />
          </div>
          </section>

          <section className="h-fit snap-center max-h-222">
              <MainAbout/>
          </section>
          <section className="h-full flex flex-col relative top-0 snap-center gap-2 lg:gap-15 justify-between max-h-180">
              <MProducts/>
              <Footer/>
          </section>

      
          


      </main>
  )
}
