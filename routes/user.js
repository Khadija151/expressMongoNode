const express = require("express");
const router = express.Router();
const { handleGetAllUers, handleGetUserById, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user");

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

router.route("/").get(handleGetAllUsers)
    .post(handleCreateUser);

module.export = router