import nodemailer from 'nodemailer';

async function sendEmail(mailTo, theme) {
  const token="token_id";
  const themesOfMail = {
    register: {
      from: 'peach market <13032004linx@gmail.com>',
      to: mailTo,
      subject: 'peach email confirm',
      text: 'to confirm the email, follow the link',
      html: `<a href="https://localhost:3001/confirm/${token}">Confirm Email</a>`,
    },
    recovery: {
      // other themes
    },
  };

  // transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '13032004linx@gmail.com',
      pass: 'cxnq pibd cbgs tvgk',
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
}

export default sendEmail();

