import { NextComponentType } from 'next';
import Image from 'next/image';
import Link from 'next/link'
import { FaGithubSquare, FaLinkedin, FaInstagram, FaHome, FaUser } from 'react-icons/fa';


const Footer: NextComponentType = () => {

    return (
        <footer className="w-full bg-[#171717] flex p-5 items-center mt-auto">
            <div className=' flex justify-center'>
                <h2 className='text-[#7e7e7e] font-bold'>GardZock @ 2024</h2>
            </div>
            <div className='text-[#7e7e7e] ml-auto flex'>
                <div>
                    <h3 className='font font-bold'>My Socials</h3>
                    <ul>
                        <li className="font-bold my-3">
                            <Link href="https://github.com/GardZock" className='flex items-center' target="_blank">
                                <FaGithubSquare color="#7e7e7e" size="30" className='mr-2' /> GitHub
                            </Link>
                        </li>
                        <li className="font-bold my-3">
                            <Link href="https://www.linkedin.com/in/gardzock/" className='flex items-center' target="_blank">
                                <FaLinkedin color="#7e7e7e" size="30" className='mr-2' /> Linkedin
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='mx-10'>
                    <h3 className='font font-bold'>Pages</h3>
                    <ul>
                        <li className="font-bold my-3">
                            <Link href="/" className='flex items-center' target="_blank">
                                <FaHome color="#7e7e7e" size="30" className='mr-2' /> Home
                            </Link>
                        </li>
                        <li className="font-bold my-3">
                            <Link href="/contacts" className='flex items-center' target="_blank">
                                <FaUser color="#7e7e7e" size="30" className='mr-2' /> Contacts
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </footer>
    );
};

export default Footer;