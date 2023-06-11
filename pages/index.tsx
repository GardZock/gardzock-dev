import Image from "next/image"
import Link from "next/link"
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { CgMail } from 'react-icons/cg'

export default function Home() {

  return (
    <main className="m-auto justify-center items-center  py-16">
      <div className="justify-center items-center pointer-events-none flex py-10">
        <Image
          src="/developer.webp"
          width={250}
          height={250}
          alt="Developer" />
      </div>
      <div className="text-center text-white">
        <h1 className="md:text-4xl text-xl font-bold">Full Stack Developer, Student & Freelancer</h1>
        <h4 className="md:text-lg text-base text-[#8f8f8f]">I love to develop Back-End systems, and I study to create better things.</h4>
      </div>

      <div className="py-4">
        <ul className="flex justify-center items-center gap-14">
          <Link href="https://github.com/GardZock" target="_blank">
            <li className="flex items-center border-2 p-2 rounded-md text-white font-bold gap-2"><AiFillGithub color="white" size="40" /> GitHub</li>
          </Link>
          <Link href="https://www.linkedin.com/in/miguel-otavio-01591823a/" target="_blank">
            <li className="flex items-center border-2 p-2 rounded-md text-white font-bold gap-2"><AiFillLinkedin size="40" color="white" /> Linkedin</li>
          </Link>
        </ul>
        <div className="text-center flex justify-center items-center py-4">
          <Link href="mailto:gardzock.contato@gmail.com" className="flex items-center border-2 p-2 rounded-md text-white font-bold gap-2"><CgMail size="40" color="white" />E-Mail</Link>
        </div>
      </div>
    </main>
  )
}
