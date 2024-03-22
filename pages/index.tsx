import Image from "next/image"
import Anim from '@/components/anim';
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main className="py-16">
        <div className="m-auto justify-center items-center">
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

          <div className=" w-full text-center py-5">
            <Link className="border-2 p-5 rounded-md text-white font-bold text-[18px]" href="/contact">My Socials</Link>
          </div>

        </div>
        <div className="w-full h-52 mt-[50px]">
          <div className="text-white">
            <h2 className="text-center text-[40px] font-bold">About Me</h2>
            <div className="bg-[#2e2e2e] mx-auto w-[900px] text-justify p-10 rounded-md mt-10">
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
      </main>
    </>
  )
}
