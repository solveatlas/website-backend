const express = require("express")
const cors = require("cors")
const contactRoutes = require("./routes/contact.routes")
const app = express()


app.use(express.json())
app.use(cors())

app.use("/api/v1", contactRoutes)

module.exports = app