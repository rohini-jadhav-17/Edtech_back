// var api_key = 'f941590fa6f35509b9bdd291f762f6b0-602cc1bf-cc4dad8a';
// var domain = 'sandbox7701c23b268342d78a33dfd698981996.mailgun.org';
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")

const mailgunAuth = {
  auth: {
    api_key: 'f941590fa6f35509b9bdd291f762f6b0-602cc1bf-cc4dad8a',
    domain: 'sandbox7701c23b268342d78a33dfd698981996.mailgun.org'
  }
}

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))

const template = handlebars.compile(emailTemplateSource)

const htmlToSend = template({message: "Hello!"})

const mailOptions = {
  from: "386jadhav@gmail.com",
  to: "rohinijadhav1791@gmail.com",
  subject: "EMAIL SUBJECT LINE",
  html: htmlToSend
}

smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error)
  } else {
    console.log("Successfully sent email.")
  }
})