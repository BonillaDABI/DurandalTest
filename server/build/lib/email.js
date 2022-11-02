const nodemailer = require('nodemailer')

const sendEmail = async options => {
    //Create transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 25,
        auth: {
            user: 'ffc87ad793f9a2',
            pass: 'f24691b7db2601',
        }
        //Activate in gmail less secure app
    })
    //Define email options
    const mailOptions = {
        from: 'Ivan Bonilla <bonillaivan0@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    //Send mail
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail