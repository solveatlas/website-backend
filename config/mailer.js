const nodemailer = require("nodemailer")
require("dotenv/config")

const transport = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user : process.env.AGENCY_GMAIL_ID,
        pass : process.env.APP_PASSWORD
    }
})

module.exports = transport