import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
interface FormFields {
    [key: string]: string;
}



export default function Contact() {

    const [fields, setFields] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sended, setSended] = useState('0')
    const [disabled, setDisabled] = useState(false)
    const [buterror, setButerror] = useState(false)


    const handleValidation = (): boolean => {
        const formFields: FormFields = { ...fields };
        const formErrors: FormFields = {};
        let formIsValid = true;

        const username = /^[a-zA-Z]+$/;
        const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        //Name
        if (!formFields["name"]) {
            formIsValid = false;
            formErrors["name"] = "Cannot be empty.";
        }

        if (typeof formFields["name"] !== "undefined") {
            if (!username.test(formFields["name"])) {
                formIsValid = false;
                formErrors["name"] = "It must be only letters.";
            }
        }

        //Company Name
        if (formFields["company_name"]) {
            if (!username.test(formFields["company_name"])) {
                formIsValid = false;
                formErrors["company_name"] = "It must be only letters."
            }
        }
        //Email
        if (!formFields["email"]) {
            formIsValid = false;
            formErrors["email"] = "Cannot be empty.";
        }

        if (typeof formFields["email"] !== "undefined") {
            if (!email.test(formFields["email"])) {
                formIsValid = false;
                formErrors["email"] = "It must be a valid email."
            }
        }

        //Message
        if (!formFields["message"]) {
            formIsValid = false;
            formErrors["message"] = "Cannot be empty.";
        }
        if (formFields["message"].length <= 10) {
            formIsValid = false;
            formErrors["message"] = "It needs minimum of 10 characters.";
        }

        setErrors(formErrors)
        return formIsValid;
    }

    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        });
    }

    const contactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('aaa')
        setButerror(false)
        if (handleValidation()) {
            const { status } = await fetch('/api/discord', { 
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(fields)
            })
            if (status === 200) {
                setSended('1');
                setDisabled(true);
                setButerror(true);
                setTimeout(() => {
                    setSended('0');
                    setDisabled(false);
                }, 5000)
            } else {
                setSended('2');
                setDisabled(true);
                setTimeout(() => {
                    setSended('0');
                    setDisabled(false);
                }, 5000)
            }
        } else {
            setSended('1');
            setDisabled(true);
            setTimeout(() => { setSended('0'); setDisabled(false); }, 5000);
        }
    }

    return (
        <>

            <main className="py-32">
                <div className="w-full flex justify-center">
                    <div className="p-10 mt-10 border-2 backdrop-blur-lg rounded-md shadow-md shadow-[#1f1f1f] m-2">
                        <div className="pb-10 text-center font-bold">
                            <h1 className="text-white text-6xl">Contact Me</h1>
                        </div>

                        <div className="flex md:w-96">
                            <form className="w-full" onSubmit={(e) => contactSubmit(e)}>
                                <label className="mb-5">
                                    <p className="text-white font-bold">Your Name:</p>
                                    <span className="text-[#ff0000] font-bold my-2">{errors["name"]}</span>
                                    <input className="w-full p-2 rounded-md shadow-md shadow-[#1f1f1f]" type="text" onChange={e => handleChange('name', e.target.value)} value={fields["name"]} />
                                </label>
                                <label>
                                    <p className="text-white font-bold mt-5">Company Name (optional):</p>
                                    <span className="text-[#ff0000] font-bold my-2">{errors["company_name"]}</span>
                                    <input className="w-full p-2 rounded-md shadow-md shadow-[#1f1f1f]" type="text" onChange={e => handleChange('company_name', e.target.value)} value={fields["company_name"]} />
                                </label>
                                <label>
                                    <p className="text-white font-bold mt-5">Email:</p>
                                    <span className="text-[#ff0000] font-bold my-2">{errors["email"]}</span>
                                    <input className="w-full p-2 rounded-md shadow-md shadow-[#1f1f1f]" type="email" onChange={e => handleChange('email', e.target.value)} value={fields["email"]} />
                                </label>
                                <label>
                                    <p className="text-white font-bold mt-5">Message Content:</p>
                                    <span className="text-[#ff0000] font-bold my-2">{errors["message"]}</span>
                                    <textarea className="w-full h-40 p-2 rounded-md shadow-md shadow-[#1f1f1f]" onChange={e => handleChange('message', e.target.value)} value={fields["message"]}></textarea>
                                </label>
                                <span className={`text-[#ff0000] font-bold my-2 ${buterror ? 'block' : 'hidden'}`}>An error occurred</span>
                                <button className={`text-center flex justify-center rounded-md h-10 p-2 w-full font-bold text-white mt-5 bg-blue-700 hover:bg-blue-800 ${disabled ? 'cursor-not-allowed bg-blue-800' : 'cursor-pointer bg-blue-700'}`} type="submit" value="Send" disabled={disabled}>
                                    {sended === "0" && (
                                        <>Send</>
                                    )}
                                    {sended === "1" && (
                                        <FaX color="#fff" size="25" />
                                    )}

                                    {sended === "2" && (
                                        <FaCheck color="#fff" size="25" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}