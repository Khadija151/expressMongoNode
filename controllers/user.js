const User = require("../models/user")

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.first_name,
        email: req.body.email
    });

    return res.json({ status: "used edited" });
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.first_name,
        email: req.body.email
    });

    return res.json({ status: "used edited" });
}

async function handleCreateUser(req, res) {
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
}

module.exports = { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser }