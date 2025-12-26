const transport = require("../config/mailer")
const pool = require("../config/db")
require("dotenv/config")


const SendingContactMail = async (data) => {
    try {
        await transport.sendMail({
            from: `"SolveAtlas" <${process.env.AGENCY_GMAIL_ID}>`,
            to: data.email,
            subject: "Thank You For Contacting Us! | SolveAtlas",
            html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #000; margin: 0; font-size: 28px;">Solve<span style="color: #2563eb;">Atlas</span></h1>
                    <p style="color: #666; font-size: 14px; margin-top: 5px;">Crafting Digital Experiences</p>
                </div>

                <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px;">
                    <h2 style="color: #111; margin-top: 0;">Hi ${data.name || 'there'},</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                        Thank you for reaching out to <strong>SolveAtlas</strong>! We've received your message and our team is already reviewing it.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                        We pride ourselves on being fast. You can expect a detailed response from one of our experts within <strong>24 hours</strong>.
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="font-size: 14px; color: #6b7280; margin-bottom: 5px;">Need immediate assistance?</p>
                        <a href="https://wa.me/982619796" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Chat with us on WhatsApp</a>
                    </div>
                </div>

                <div style="margin-top: 30px; text-align: center; color: #9ca3af; font-size: 12px;">
                    <p>© ${new Date().getFullYear()} SolveAtlas Agency. All rights reserved.</p>
                    <p>You received this email because you filled out a contact form on our website.</p>
                </div>
            </div>
            `
        });

        return true;
    } catch (error) {
        console.log("Failed to send Mail", error);
        return false;
    }
}
const StoringCotactDetails = async (data) => {
    try {
        const query = `INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)`;
        const datas = [data.name, data.email, data.message];
        const response = await pool.query(query, datas);

        if(response.rowCount === 0){
            return false
        }
        console.log("Data has been inserted into the database", response);
        return true

    } catch (error) {
        console.log("Failed to store in Database", error);
        return false
    }
}

module.exports = { SendingContactMail, StoringCotactDetails }