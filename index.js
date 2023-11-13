const express = require("express");
const { connectMongoDb } = require("./connection");
const userRouter = require('./routes/user');
// by default it check index file
const { logReqRes } = require('./middlewares');

const app = express();
const PORT = 8000;


//Connection
connectMongoDb("mongodb://127.0.0.1:27017/express-mongo-node-app");



// Middleware 
app.use(express.urlencoded({ extended: false })); //otherwise the data we'll get in as response body will be undefined

app.use(logReqRes('log.txt'));

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    next();
})

// Routes 
app.use("/api/users", userRouter); //incase any request comes on /user and then will pass the path to userRoute

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));