const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
);

module.exports.send = (email, username) => {
  const mailOptions = {
    from: 'SneakerShop <any@pvt.com>',
    to: email,
    subject: `Email account activation`,
    text: 'For clients with plaintext support only',
    html: `<h3>Dear ${username},</h3>
    <br>
    <p>Your login email is:${email}</p> 
    <p>
    Welcome to SneakerShop. This is your activation email. Please click on the link below to go to your activation page. <a href="http://localhost:3000/verify/${username}">Click here to confirm</a></p>
    <br>
    <p>Thank you so much, best regards</p>
    `,
  };
  //   shop/download/${orderid}
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ' ${info.response}`);
    }
  });
};
