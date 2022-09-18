const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    },
});

transport
  .verify()
  .then(() => console.log('Connected to email server'))
  .catch((err) => console.log(`Unable to connect to email server. Make sure you have configured the SMTP options in .env\n${err}`));

const sendEmail = async (subject, template, to, data) => {
    transport.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: path.resolve('backend/views'),
          defaultLayout: false,
        },
        viewPath: path.resolve('backend/views'),
        extName: '.hbs',
      })
    );
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        template,
        context: data,
      };
    const response = await transport
      .sendMail(mailOptions)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    const status = response.response;
    if (status === '250 Message received') {
      return true;
    }
    console.log(response)
    return response;
}

  const sendResetPasswordEmail = async (to, name, OTP) => {
    const subject = 'Social Coin - Reset password';
    const template = 'resetPassword';
    const data = {
      OTP: `${OTP}`,
      name: `${name}`
    }
    const toEmail = `${to}`;
    await sendEmail(subject, template, toEmail, data);
  };

  const sendLikeNotifiation = async (to, name, user) => {
    const subject = "Social Coin - Someone liked your comment";
    const template = "likeOnAppreciation";
    const data = {
      name : `${name}`,
      user : `${user}`
    }
    const toEmail = `${to}`;
    await sendEmail(subject, template, toEmail, data);
  };

  const sendCommentNotifiation = async (to, name, user, appreciation, comment) => {
    const subject = "Social Coin - Someone Replied to your comment";
    const template = "commentOnAppreciation";
    const data = {
      name : `${name}`,
      user : `${user}`,
      appreciation: `${appreciation}`,
      comment: `${comment}`
    }
    const toEmail = `${to}`;
    await sendEmail(subject, template, toEmail, data);
  };

  const sendGeneralNotifiation = async (to, name, message) => {
    const subject = "Social Coin - We have an update for you";
    const template = "generalNotifications";
    const data = {
      name : `${name}`,
      message: `${message}`  
    }
    const toEmail = `${to}`;
    await sendEmail(subject, template, toEmail, data);
  };



  module.exports = {
    sendEmail,
    sendResetPasswordEmail,
    sendLikeNotifiation,
    sendCommentNotifiation,
    sendGeneralNotifiation,
  }