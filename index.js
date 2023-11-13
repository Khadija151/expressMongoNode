const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;


//Connection
mongoose.connect("mongodb://127.0.0.1:27017/express-mongo-node-app")
    .then(() => { console.log("Mongo connected!") })
    .catch((err) => { console.log("Mongo Err ", err) });

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
    },
    email: {
        type: String,
        reqire: true,
        unique: true
    },
    gender: {
        type: String,

    },
    jobTile: {
        type: String,
    }
}, { timestamp: true } // it will add created_at and updated_at upen every creation
);

//Model
const User = mongoose.model("user", userSchema)


// Middleware 
app.use(express.urlencoded({ extended: false })); //otherwise the data we'll get in as response body will be undefined

app.use((req, res, next) => {
    fs.appendFile('./requestLogs', `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`, (err, res) => {
        next(); //otherwise request will stuck
    })
});

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    next();
})

// Routes 

//with out /api it i.e./users it will render htmlDoc
// with /api/users it'll send json, perfect for hybrid server (mob+web)

//Grouped
app.route("/api/users/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        return res.json(user);
    })
    .patch(async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, {
            firstName: req.body.first_name,
            email: req.body.email
        });

        return res.json({ status: "used edited" });

    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "User Deleted " })
    });

app.get("/api/users", (req, res) => {
    res.setHeader("X-MyName", "Khadija Ishaq");
    const allUsers = User.find({});
    return res.json(allUsers);
})

app.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    const html = `
    <ul> ${allUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`)} </ul>
    `;
    res.send(html);
})

app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "The infromation is missing" })
    }
    const result = await User.create({
        firstName: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });
    console.log("result", result);
    return res.status(200).json({ msg: "User created" });

})

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));