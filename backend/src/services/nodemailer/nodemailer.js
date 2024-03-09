// // Використовуємо import замість require для імпортування nodemailer
// import nodemailer from 'nodemailer';

// const clientId =
//   '540269578685-68v7d2ei66n8gq457u9g9oqidh9bmjq0.apps.googleusercontent.com';
// const clientSecret = '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';
// // Оголошуємо асинхронну функцію для відправлення електронної пошти
// async function sendEmail() {
//   // Створюємо тестовий обліковий запис
//   let testEmailAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: 'peachmarketpalce@gmail.com',
//       clientId,
//       clientSecret,
//       accessToken:
//         'ya29.a0Ad52N3-VmVn73fIG_aP92RaddXwDD0evTjMSCuO1sqgmHuXhn4_tTZMVL-xji31NCdhkt0z0uZpueef4i1UShuO4mt-9AV-xgSfPp1dTTPdqx42kThRxG4KhWf-9bKMkfXpzLTVi6FeepfRhEKBCTPS2rDQMuw0JZyfKaCgYKAbsSARMSFQHGX2Mi6atGiiB0QvWA1UBtEb0Qqg0171',
//     },
//   });

//   // Відправляємо електронний лист
//   let result = await transporter.sendMail({
//     from: '"Node js" <nodejs@example.com>',
//     to: 'kamilka13me@gmail.com',
//     subject: 'Attachments',
//     text: 'This message with attachments.',
//     html: 'This <i>message</i> with <strong>attachments</strong>.',
//   });

//   console.log(result);
// }

// // Викликаємо асинхронну функцію
// sendEmail().catch(console.error);

// Імпортуємо необхідні модулі
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const CLIENT_ID =
  '540269578685-h94kptj4ukfqqdhdot6i0k6rfj3nu0as.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN =
  '1//04zxjxXGMY442CgYIARAAGAQSNwF-L9Ir14Eu6iVekMQy5H4DoiD2e5uaaZThGUIiWgwU5GdfUG1vcZzmYgVfnfwbq_trMaMggwo';

async function sendEmail() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID, // Клієнтський ID
    CLIENT_SECRET, // Клієнтський секрет
    'http://localhost', // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'peachmarketpalce@gmail.com',
      accessToken: accessToken.token,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: 'peachmarketpalce@gmail.com',
    to: 'kamilka13me@gmail.com',
    subject: 'Test email using Gmail API',
    text: 'Hello from Gmail API',
    html: '<h1>Hello from Gmail API</h1>',
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    console.log('Email sent:', result);
  } catch (error) {
    console.error(error);
  }
}

sendEmail().catch(console.error);
