const exec = (command) => import('child_process').then(({ exec }) => {
  return new Promise((resolve, reject) => {
    const process = exec(command);

    let output = ''; // Save the command output

    process.stdout.on('data', (data) => {
      console.log(data.toString());
      output += data.toString(); // Add output to the variable
    });

    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      output += `stderr: ${data}`; // Add errors to the output
    });

    // Setting a timeout for automatic log output termination
    setTimeout(() => {
      process.kill(); // kill process 'pm2 logs'
      resolve(output); // return output
    }, 1000); 
  });
});


// Telegram bot
import TelegramBot from 'node-telegram-bot-api';

const token = '6601409867:AAHWm3sLkUpedjtlMWKbhGmn77Wl6gAwK5Q';
const chatId = '654071367';
const bot = new TelegramBot(token, { polling: false });

exec('pm2 logs --lines 30')
  .then((logs) => {
    // Sending logs to Telegram
    return bot.sendMessage(chatId, logs.substring(0, 4096)); // Telegram has a 4096 character limit per message
  })
  .then(() => {
    console.log('Logs sent successfully');
    process.exit(0); // Completing the script successfully
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1); // Ending a script with an error
  });
