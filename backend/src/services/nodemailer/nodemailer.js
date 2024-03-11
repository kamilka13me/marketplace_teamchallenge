import nodemailer from 'nodemailer';

import config from '../../config/config.js';

const sendMail = async (mailTo, theme, token) => {
  const themesOfMail = {
    register: {
      from: 'peach market <13032004linx@gmail.com>',
      to: mailTo,
      subject: 'peach email confirm',
      text: 'to confirm the email, follow the link',
      html: `<a href="https://marketplace-teamchallenge.vercel.app/verify/${token}">Confirm Email</a>`,
    },
    recovery: {
      // other themes
    },
  };

  // transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailerUser,
      pass: config.mailerPass,
    },
  });

  // Check for a template for a given topic
  if (!themesOfMail[theme]) {
    throw new Error(`No template for theme ${theme}`);
  }

  // Set email parameters according to the selected subject line
  const mailOptions = themesOfMail[theme];

  try {
    // Send mail
    const result = await transporter.sendMail(mailOptions);

    console.log('Email sent:', result);
  } catch (error) {
    console.error(error);
  }
};

export default sendMail;
