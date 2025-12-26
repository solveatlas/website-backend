const Routes = require("express")
const {sendContactMail} = require('../controller/contact.controller')
const router = Routes()
router.post('/contactmail', sendContactMail)

module.exports = router