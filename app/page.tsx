import Image from "next/image";
import { Hero } from "@/Components/Hero";
import {Nav} from "@/Components/Navar";

export default function Home() {
  return (
    <div className="w-full h-fit  overflow-x-hidden overflow-y-scroll snap-mandatory snap-y snap-center" >
        <Nav/>
        <Hero />


    </div>
  )
}
