const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service:"gmail",
    port:process.env.SMTP_PORT,
    secureConnection:false,
    auth:{
        type: "login",
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
    tls:{
        rejectUnauthorized:false
    }
})


const sendMail= async(email, subject, content)=>{
    try{
        var mailOptions={
            from: process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        }


        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error)
            }
            console.log('Mail sent ', info.messageId)
        })
    }catch(error){
        console.log(error.message)
    }
}


module.exports ={sendMail}