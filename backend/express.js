const express = require("express");
const path = require("path");
const app = express();
const data = require("./data");
const router = require("./routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.port || 1001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enables CORS
const corsOptions = {
  origin: true,
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
/*
app.use(function (req, res, next) {    //CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', false);
    next();
});
*/
app.use("/data", router);
// app.use((req, res, next) => {

//     console.log(`${req.protocol}://${req.hostname}:${port}${req.url}`);
//     next()
// })

// app.get('/member/data', (req, res) => {

//     // res.sendFile(path.join(__dirname, 'index.html'))

//     res.json(data)
// })

// app.get('/member/data/:id', (req, res) => {

//     const found = data.some(member => member.id == req.params.id)

//     if (found) {
//         const members = data.filter(member => member.id == req.params.id)
//         res.json(members)

//     }

//     else {
//         res.status(400).json({ msg: "Not Found" })
//     }

// })

// app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log("server running"));
