import Image from "next/image"
import Anim from '@/components/anim';
import Link from "next/link"
import { IoShareSocialSharp } from "react-icons/io5";
import Card from "@/components/card";

export default function Home() {
  return (
    <>
      <main className="my-32">
        <div className="m-auto justify-center items-center h-[700px]">
          <Anim />
          <div className="justify-center items-center pointer-events-none flex py-10">
            <Image
              src="/developer.webp"
              width={250}
              height={250}
              alt="Developer" />
          </div>
          <div className="text-center text-white mb-10">
            <h1 className="md:text-4xl text-xl font-bold">Full Stack Developer, Student & Freelancer</h1>
            <h4 className="md:text-lg text-base text-[#8f8f8f]">I love to develop Back-End systems, and I study to create better things.</h4>
          </div>
          <div className="text-white w-full flex center text-center py-5">
            <div className="border-4 p-3 rounded-md mx-auto flex hover:text-[#c2c2c2] hover:border-[#c2c2c2] cursor-pointer">
              <IoShareSocialSharp size="30" color="#ffffff" /> <Link className="px-5 font-bold text-[18px]" href="/contact">My Socials</Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="text-white">
            <h2 className="text-center text-[40px] font-bold">About Me</h2>
            <div className="bg-[#2e2e2e] mx-auto w-[1000px] text-justify p-10 rounded-md mt-5" data-aos="fade-up">
              <p className="py-2">
                Hello, my name is Miguel, or GardZock, as you prefer to call me. I&apos;m a developer who started learning at the age of 12, with the dream of becoming a great developer.
                I&apos;ve recently learned a lot about this area and it soon became my passion to create and disassemble code in order to learn and evolve as a professional.
                I&apos;ve always believed that I could learn everything myself, without the help of a person or course, so I consider myself self-taught.
              </p>
              <p className="py-2">
                My first system was a Discord bot, it didn&apos;t do much, but I soon wanted to improve it, creating command by command. At first, I focused more on learning than success, and as a result I used a lot of &quot;ready-made&quot; code, but always with some changes so that it would integrate with my system.
              </p>
              <p className="py-2">
                Nowadays I focus more on Full-Stack, I want to start my career with this profession and evolve into a developer capable of creating systems such as AI&apos;s integrated with IoT&apos;s, and enter a more security/accessibility area.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full my-20">
          <div className="text-white">
            <h1 className="text-center font-bold text-[40px] p-5">My Main Projects</h1>
            <div className="flex justify-center"  data-aos="fade-up">
              <ul className="flex justify-center">
                <li className="mx-5">
                  <Card title="Red Dragon Bot" image="/reddragon.webp" desc="It was my first project, a Discord bot." tec="JAVASCRIPT" />
                </li>
                <li className="mx-5">
                <Card title="Flaming Eyes" image="/flamingeyes.webp" desc="It was my first 'public' project, a Discord bot shop." tec={["JAVASCRIPT", "TYPESCRIPT", "MONGODB"]} />
                </li>
                <li className="mx-5">
                <Card title="WarCord" image="/warcord.webp" desc="An NPM Library created to be an alternative option to the WarGaming API." tec="TYPESCRIPT" link="https://github.com/Warcord/WarCord-Lib" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
