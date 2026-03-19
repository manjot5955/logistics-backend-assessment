const express = require("express")
require("dotenv").config()
const sequelize = require("./config/database")

const app = express()

app.use(express.json())

// Routes will come later
app.get("/", (req, res) => {
  res.send("Backend Running")
})

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
  console.log("DB Connected")
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})