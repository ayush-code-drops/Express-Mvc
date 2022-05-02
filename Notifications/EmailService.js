const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e6cef529d200f9",
      pass: "345ef0d6dff7cf"
    }
});

module.exports = transport

  
