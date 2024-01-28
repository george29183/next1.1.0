import nodemailer from 'nodemailer'
import User from '@/models/usermodel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({email, emailType, userId})=>{
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
           console.log(hashedToken);
        //find user and update
        if(emailType === 'VERIFY'){
           await User.findByIdAndUpdate(userId,{
               verifyToken: hashedToken,
               verifyTokenExpiry: Date.now()+ 3600000
        })
       }else if(emailType === 'RESET') {
           await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now()+ 3600000
        })
       }
         
       //nodemailer transporter
       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2e606edd20aba9",
          pass: "2bcddb7b204795"
        }
      });
       const mailOptions = {
        from:'george29183@gmail.com',
        to:email,
        subject:emailType === 'VERIFY'?'VERIFY YOUR EMAIL':'RESET YOUR PASSWORD',
        html:`<p>hahaha yes yes Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY'?'VERIFY YOUR EMAIL':'RESET YOUR PASSWORD'}.Or click copy this and go => <br/> ${process.env.domain}/verifyemail?token=${hashedToken}</p>`
       }
       
       
        
       const mailResponse = await transport.sendMail(mailOptions)
       
  return mailResponse
    } catch (error) {
        throw new Error(error.message)
    }
}