import axios from "axios";
import requestIp from 'request-ip';

interface UserInfo {
    name: string,
    company: string,
    email: string,
    message: string
}

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
    status: "OK" | "ERROR",
    content: string
}

export default async function DiscordService(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const bannedips = [""]
    const ip = requestIp.getClientIp(req)
    if (bannedips.includes(`${ip}`)) return res.status(401).json({
        status: "ERROR",
        content: "You're banned from the IP."
    });
    if (req.method === "POST") {
        const data = req.body
        if (!data || !data.name || !data.message || !data.email) return res.status(400).json({
            status: "ERROR",
            content: "The fields are empty."
        })
        
        const body = {
            tts: false,
            embeds: [
              {
                title: data.name,
                color: 16711680,
                description: data.message,
                footer: { text: `${data.company} | ${data.email} | ${ip}` }
              },
            ],
        };
        try {
            const info = await axios.post(
                `${process.env.WEBHOOK}`,
                body
            );
            return res.status(200).json({
                status: "OK",
                content: `Your message has sent successfully.`
            })
            
        }
        catch(error) {
            console.log(error);
            return res.status(200).json({
                status: "ERROR",
                content: `${error}`
            });
        }
    } else {
        res.status(404).json({
            status: "ERROR",
            content: "Wrong."
        })
    }
}

export type { UserInfo }