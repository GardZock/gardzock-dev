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
        console.log(data)
        if (!data || !data.name || !data.message || !data.email) return res.status(400).json({
            status: "ERROR",
            content: "The fields are empty."
        })
        console.log('Parou na 35')
        
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
        console.log('Parou na 47')
        try {
            const info = await axios.post(
                `${process.env.WEBHOOK}`,
                body
            );
            console.log('Parou na 53')
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
    console.log('Parou na 71')
}

export type { UserInfo }