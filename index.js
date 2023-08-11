const express = require("express")
const cors = require("cors")
const multer = require("multer")

const upload = multer({ dest: "uploads/" })
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/public", express.static(process.cwd() + "/public"))

app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"))

app.get("/hello", (req, res) => res.send("Hello"))

app.post("/api/fileanalyse", upload.any(), (req, res) => {
  try {
    const [file] = req.files
    res
      .send({
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
      })
      .status(200)
  } catch (error) {
    console.log(error)
    res.send({ error }).status(400)
  }
})

app.listen(port, () => console.log("Your app is listening on port " + port))
