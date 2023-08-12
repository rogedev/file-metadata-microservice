const express = require("express")
const cors = require("cors")
const multer = require("multer")

const upload = multer({ dest: "/tmp" })
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))

app.get("/hello", (req, res) => res.send("Hello"))

app.post("/api/fileanalyse", upload.any(), (req, res) => {
  try {
    const [file] = req.files
    const data = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    }
    res.send(data).status(200)
  } catch (error) {
    res.send({ error }).status(400)
  }
})

app.listen(port, () => console.log("Your app is listening on port " + port))
