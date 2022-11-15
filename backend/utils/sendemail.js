const nodemailer=require("nodemailer");
const sendEmail=async(options)=>{

const transporter=nodemailer.createTransport({
    host:process.env.SMPT_HOST,
    port:465,
    service:process.env.SMPT_SERVICE,
    auth:{
        user:process.env.SMPT_EMAIL,
        pass:process.env.SMPT_PASS,
    }
})

const mailOptions={
    from:process.env.SMPT_PASS,
    to:options.email,
    subject:options.subject,
    text:options.message,
}

await transporter.sendMail(mailOptions)
}
module.exports=sendEmail;