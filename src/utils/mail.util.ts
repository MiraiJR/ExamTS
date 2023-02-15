import { Injectable } from "@nestjs/common";
import * as Nodemailer from "nodemailer";

@Injectable()
export class MailService {
    async sendMail(email: string, title: string, content: string): Promise<Boolean> {
        let transporter = Nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.HOST_MAIL,
                clientId: process.env.GOOGLE_clientId,
                clientSecret: process.env.GOOGLE_clientSecret,
                refreshToken: process.env.GOOGLE_refreshToken,
            }
        });

        try {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"MyWebsite" <no-reply>', // sender address
                to: `${email}`, // list of receivers
                subject: `${title.toUpperCase()}`, // Subject line
                text: `${content}`,
                html: `${content}`, // html body
            });

            return true;
        } catch (error) {
            return false;            
        }
    }
}