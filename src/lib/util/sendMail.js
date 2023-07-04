import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyencao3997@gmail.com', // Địa chỉ email của bạn
        pass: 'guwwijfxalmtffkn' // Mật khẩu email của bạn
    }
});
export const sendEmail = async (toEmail,context)=> {
    // Cấu hình email
    const rootDir = path.dirname(__dirname);
    const logo1Path = path.join(rootDir,'../../src/public/image/16865336706170.jpg');
    const logo2Path = path.join(rootDir,'../../src/public/image/16865447182610.png');
    const mailOptions = {
        from: 'nguyencao3997@gmail.com', // Địa chỉ email của bạn
        to: toEmail, // Địa chỉ email nhận
        subject: 'Test Email', // Chủ đề email
        html: `
    <img src="cid:logo1" alt="Logo" style="width: 180px; height: auto; border: 0 solid #ccc; border-radius: 5px;">
    <p>${context}</p>
    <img src="cid:logo2" alt="Logo" style="width: 180px; height: auto; border: 0 solid #ccc; border-radius: 5px;">
  `,
        attachments: [
            {
                filename: '16865336706170.jpg',
                path: logo1Path,
                cid: 'logo1'
            },
            {
                filename: '16865447182610.png',
                path: logo2Path,
                cid: 'logo2'
            }
        ]
        
    };
    // Gửi email
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email failed to send!', error);
        } else {
            console.log('Email sent!', info.response);
        }
    });
}