// server.js

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./src/config/config');


// routes
const statusRoute = require('./src/components/routes/statusRoute');



const app = express();


// general Log Stream to logs.txt
const generalLogStream = fs.createWriteStream(path.join(__dirname,  'logs', 'logs.txt'), { flags: 'a' });

// detailed Log Stream to detailedLogs.txt
const detailedLogStream = fs.createWriteStream(path.join(__dirname,  'logs', 'detailedLogs.txt'), { flags: 'a' });

// login to  logs.txt
app.use(morgan(':date :method :url :status :referrer', { stream: generalLogStream }));

// login to detailedLogs.txt
app.use(morgan('combined', { stream: detailedLogStream }));





app.use('/api/status' , statusRoute )


const server = app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});


module.exports = server;
