const {validate} = require('deep-email-validator')

const verifyEmail = async (email) => {
    const result = await validate({
        email: email,
        validateSMTP: false, // You can set this to false to see if SMTP is the culprit
    });
    
    // console.log(result); // Check the "validators" object here
    return result.valid;
}

module.exports = verifyEmail