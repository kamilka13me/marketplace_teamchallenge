import nodemailer from 'nodemailer';

import config from '../../config/config.js';

const sendMail = async (mailTo, theme, token, data) => {
  const themesOfMail = {
    register: {
      from: 'peach market <13032004linx@gmail.com>',
      to: mailTo,
      subject: 'peach email confirm',
      text: 'to confirm the email, follow the link',
      html: `<a href="https://marketplace-teamchallenge.vercel.app/verify/${token}">Confirm Email</a>`,
    },
    recovery: {
      from: 'peach market <peachSupport>',
      to: mailTo,
      subject: 'peach account password recovery',
      text: 'to recovery password, follow the link',
      html: `<a href="https://marketplace-teamchallenge.vercel.app/recovery/${token}">Recover Password</a>`,
    },
    subscribe: {
      from: 'peach market <peachSupport>',
      to: mailTo,
      subject: 'peach seller change status',
      text: `
      user ${data.username}
      email ${data.email}
      id ${data._id}
      
       wanna change subscribe to ${data.subscribe}`,
    },
    else: {
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default sendMail;
