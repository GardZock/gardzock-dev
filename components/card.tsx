import Image from "next/image"
import Link from "next/link"
import { SiMongodb, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiGithub, SiCsharp, SiUnity } from "react-icons/si"

type Tecnologies = "JAVASCRIPT" | "MONGODB" | "TYPESCRIPT" | "CSHARP" | "REACTNATIVE" | "NEXTJS" | "UNITY"

export default function Card({ title, image, desc, tec, link }: {
    title: string, image?: string, desc: string, tec: Tecnologies | Tecnologies[], link?: string
}) {

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
                        <li className="p-2 bg-[#000] rounded-lg shadow-2xl" key="">{tec.value}</li>
                    ))
                }
            </ul>
        )
    }

    return (
        <div className="p-10 rounded-lg justify-center text-center bg-[#050505] shadow-2xl">
            <div className="justify-center flex">
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        width={100}
                        height={100}
                        className="rounded-md"
                    />
                )}
            </div>

            <h1 className="text-xl text-white font-bold py-4">{title}</h1>
            <p className="text-white pb-2">{desc}</p>
            <div className="justify-between flex pt-4">
                <ul className="">
                    {getTecs()}
                </ul>
                {link && (
                    <ul>
                        <li className="p-2 bg-[#000] rounded-lg shadow-2xl"><Link href={link} target="_blank"><SiGithub size={25} color="white" /></Link></li>
                    </ul>
                )}
            </div>
        </div>
    )
}