const { ContactSchema } = require("../models/contact.zod")
const { SendingContactMail, StoringCotactDetails } = require("../services/contact.services")
const verifyEmail = require("../middlewares/mailer.middlewares")

const sendContactMail = async (req, res, next) => {
    try {
        const data = req.body
        //todo checking if data is complete
        if (!data.name || !data.email || !data.message) {
            return res.status(404).json({
                message: "Please complete the Form"
            })
        }
        //! zod formate parssed
        const parsed = ContactSchema.safeParse(data)
        if (!parsed.success) {
            return res.status(500).json({ message: "Bad Input" })
        }

        //! Checking if the enter mail is valid or not
        const EmailExists = await verifyEmail(data.email)
        if(!EmailExists){
            return res.status(500).json({message : "Enter Email doesnot Exists."})
        }

        //! sending the mail and storing logic
        const mailed = await SendingContactMail(data)
        if(!mailed){
            return res.status(500).json({message : "Failed to Send Mail."})
        }

        //! Storing the Contact Details in DB
        const database = await StoringCotactDetails(data);
        if(!database){
            return res.status(500).json({message : "Failed to Store in Database"})
        }
        res.status(200).json("Successfully Mailed Send and Stored in DB.")

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while sending Email" })
    }
}

module.exports = { sendContactMail }