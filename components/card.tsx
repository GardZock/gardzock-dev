import Image from "next/image"
import Link from "next/link"
import { SiMongodb, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiGithub, SiCsharp, SiUnity } from "react-icons/si"

type Tecnologies = "JAVASCRIPT" | "MONGODB" | "TYPESCRIPT" | "CSHARP" | "REACTNATIVE" | "NEXTJS" | "UNITY"

/** 
 * @title {string} Title of the Card.
 * @image {string} Path of the Image.
 * @desc {string} The Description of the Card.
 * @tec {Tecnologies} The Tecnologies used.
 * @width {string} The width of card.
 * @height {string} The height of card.
*/

export default function Card({ title, image, desc, tec, link, width, height }: {
    title: string, image?: string, desc: string, tec: Tecnologies | Tecnologies[], link?: string, width: string, height: string
}) {

    const dynamicStyle = {
        width: `${width}px`,
        height: `${height}px`
    }

    const getTecs = () => {

        const obj: { name: Tecnologies, value: React.ReactNode }[] = [{
            name: "JAVASCRIPT", value: (<SiJavascript size={25} color="yellow" />)
        },
        {
            name: "MONGODB", value: (<SiMongodb size={25} color="green" />)
        },
        {
            name: "TYPESCRIPT", value: (<SiTypescript size={25} color="#3178C6" />)
        },
        {
            name: "REACTNATIVE", value: (<SiReact size={25} color="#ADD8E6" />)
        },
        {
            name: "NEXTJS", value: (<SiNextdotjs size={25} color="#ADD8E6" />)
        },
        {
            name: "CSHARP", value: (<SiCsharp size={25} color="green" />)
        },
        {
            name: "UNITY", value: (<SiUnity size={25} color="white" />)
        }]

        const tecs = obj.filter((a) => {
            if (tec.includes(a.name) || tec == a.name) return a.value;
        })

        return (
            <ul className="gap-2 flex">
                {
                    tecs.map((tec: { name: Tecnologies, value: React.ReactNode }) => (
                        <li className="p-2 border-2 rounded-lg shadow-2xl" key={tec.name}>{tec.value}</li>
                    ))
                }
            </ul>
        )
    }

    return (
        <div className="p-10 rounded-lg backdrop-blur-lg text-center border-2 shadow-[#1f1f1f] shadow-2xl flex flex-col" style={dynamicStyle}>
            <div className="justify-center flex">
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        width={100}
                        height={100}
                        className="rounded-md pointer-events-none"
                    />
                )}
            </div>
            <div>
                <h1 className="text-xl text-white font-bold py-4">{title}</h1>
                <p className="text-white text-center pb-2">{desc}</p>
            </div>
            <div className="mt-auto flex w-full">
                <div className="justify-between flex w-full">
                    <ul>
                        {getTecs()}
                    </ul>
                    {link && (
                        <ul>
                            <li className="p-2 border-2 rounded-lg shadow-2xl"><Link href={link} target="_blank"><SiGithub size={25} color="white" /></Link></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}