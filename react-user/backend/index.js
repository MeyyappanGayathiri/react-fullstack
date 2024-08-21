const express = require ('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const path = require('path');
require('./database/database');


const userRouter = require("./routes/user-routes");

const app = express();

app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
  
app.use(cookieParser());
app.use(express.json());
  
app.use("/api/user", userRouter);

dotenv.config({path:path.join(__dirname,'config','config.env')});

app.use("/api", (req, res) => {
    res.status(200).json({ message: "Hello Express" });
});

const port = parseInt(process.env.PORT);

app.listen(port,()=>{
    console.log('connection successfully : PORT :'+process.env.PORT+',environment:'+process.env.ENV);
})

