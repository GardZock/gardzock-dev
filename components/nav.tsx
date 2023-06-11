"use client"
import { NextComponentType } from 'next';
import Image from 'next/image';
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'


const Nav: NextComponentType = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className='py-2 px-10 flex items-center justify-between w-full shadow-xl bg-[#0e0d0d]'>
            {/* LOGO */}
            <Link href="/">
                <Image
                    src="/favicon.svg"
                    width={70}
                    height={70}
                    alt='Logo'
                    priority />
            </Link>

            {/* MENU PC */}
            <div className='hidden sm:flex'>
                <ul className='flex gap-5'>
                    <Link href="/about"><li className='text-white font-bold text-xl hover:text-gray-600'>ABOUT</li></Link>
                    <Link href="/projects"><li className='text-white font-bold text-xl hover:text-gray-600'>PROJECTS</li></Link>
                </ul>
            </div>

            {/* ICON */}
            <div onClick={handleNav} className='sm:hidden cursor-pointer'>
                <AiOutlineMenu size={35} color="white" />
            </div>

            {/* MENU MOBILE */}
            <div className={
                menuOpen ?
                    "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#000000] p-10 ease-in duration-500" :
                    "fixed left-[-100%] top-0 p-10 ease-in duration-500"
            }>
                <div className='flex w-full items-center justify-end'>
                    <div onClick={handleNav} className='cursor-pointer'>
                        <AiOutlineClose size={25} color="white" />
                    </div>
                </div>

                <ul className='flex-col'>
                    <Link href="/">
                        <li className='text-white font-bold text-2xl cursor-pointer justify-end py-5 items-center'
                            onClick={() => setMenuOpen(false)}>HOME</li>
                    </Link>
                    <Link href="/about">
                        <li className='text-white font-bold text-2xl cursor-pointer justify-end py-5 items-center'
                            onClick={() => setMenuOpen(false)}>ABOUT</li>
                    </Link>
                    <Link href="/projects">
                        <li className='text-white font-bold text-2xl cursor-pointer justify-end py-5 items-center'
                            onClick={() => setMenuOpen(false)}>PROJECTS</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;