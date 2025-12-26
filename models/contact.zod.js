const zod = require('zod')

const ContactSchema = zod.object({
    name : zod.string().min(5),
    email :zod.email(),
    message : zod.string().min(5)
})

module.exports = {ContactSchema}