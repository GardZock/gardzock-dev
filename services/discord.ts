import React from "react";
import axios from "axios";

interface Data {
    name: string,
    company: string,
    email: string,
    message: string
}

function DiscordService() {
    const Send = async (data: Data) => {

        const body = {
            tts: false,
            embeds: [
              {
                title: data.name,
                color: 16711680,
                description: data.message,
                footer: { text: `${data.company} | ${data.email}` }
              },
            ],
        };

        try {
            const info = await axios.post(
                "https://discord.com/api/webhooks/1220108963551383735/B43v1FpFfnTyWxZ7TMVl0TYo7_lv223_qNz4XUXjbUq2XP-5HW2-Ds3xf84kNCCxEQJY",
                body
            );
            return {
                status: "success",
                content: "Your message has sent successfully."
            }
            
        }
        catch(error) {
            console.log(error);
            return {
                status: "error",
                content: `${error}`
            };
        }
    }

    return {
        Send,
    }
}

export default DiscordService