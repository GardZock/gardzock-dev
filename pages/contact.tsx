import { useState } from "react"
import DiscordService from "../services/discord"
import Mes from "@/components/message"

export default function Contact() {

    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [retmes, setRetmes] = useState({ mes: "", type: "" })
    const [hidden, setHidden] = useState(true)

    const { Send } = DiscordService()

    const PostToDiscord = async () => {

        if (!name || !email || !message) {
            return console.log("Da não mano")
        }
        const { status, content } = await Send({ name, company, email, message })
        status === "error" ? setRetmes({ mes: "An error occurred. Try again later.", type: "error" }) : setRetmes({ mes: `${content}`, type: "success" })
        setHidden(false)
    };

    return (
        <>

            <main className="py-32">
                {!hidden && (
                    <Mes text={retmes.mes} type={retmes.type} />
                )}
                <div className="w-full flex justify-center">
                    <div className="p-10 mt-10 border-2 rounded-md bg-[#101010]">
                        <div className="pb-10 text-center font-bold">
                            <h1 className="text-white text-6xl">Contact Me</h1>
                        </div>

                        <div className="flex w-96">
                            <form className="w-full" onSubmit={(e) => { e.preventDefault(); PostToDiscord(); }}>
                                <label className="mb-5">
                                    <p className="text-white font-bold">Your Name:</p>
                                    <input className="w-full p-2 rounded-md shadow-md shadow-black" type="text" value={name} onChange={(e) => setName(`${e.target.value}`)} name="name" />
                                </label>
                                <label>
                                    <p className="text-white font-bold mt-5">Company Name (optional):</p>
                                    <input className="w-full p-2 rounded-md shadow-md shadow-black" type="text" value={company} onChange={(e) => setCompany(`${e.target.value}`)} name="company_name" />
                                </label>
                                <label>
                                    <p className="text-white font-bold mt-5">Email:</p>
                                    <input className="w-full p-2 rounded-md shadow-md shadow-black" type="email" value={email} onChange={(e) => setEmail(`${e.target.value}`)} name="email" />
                                </label>
                                <label>
                                    <p className="text-white font-bold mt-5">Messsage Content:</p>
                                    <textarea className="w-full h-40 p-2 rounded-md shadow-md shadow-black" name="message" value={message} onChange={(e) => setMessage(`${e.target.value}`)}></textarea>
                                </label>

                                <button className="text-center rounded-md p-2 w-full font-bold text-white mt-5 bg-blue-700 hover:bg-blue-800" type="submit" value="Send">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </main>
        </>
    )
}
