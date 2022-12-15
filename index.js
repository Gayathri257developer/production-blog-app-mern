//---- step : 1.1
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")

//---- ste
const multer = require("multer")
const path = require("path")
//---- step : 2.1
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const authCat = require("./routes/categories")
const PORT = process.env.PORT || 5000

//---- step : 
dotenv.config()
//---- step : 2.2
app.use(express.json())
//---- step : 2.3 last ma file crate garne time
app.use("/images", express.static(path.join(__dirname, "/images")))

//---- step : 1.3
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

//---- step : 3
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images")
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name)
  },
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})

//static file
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

//---- step : 2
app.use("http://localhost:5000/auth", authRoute)
app.use("http://localhost:5000/users", authUser)
app.use("http://localhost:5000/posts", authPost)
app.use("http://localhost:5000/category", authCat)

//---- step : 1.2
app.listen(PORT, () => {
  console.log("backend running...")
})
