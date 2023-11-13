const fs = require("fs");

function logReqRes(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName, `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`, (err, res) => {
            next(); //otherwise request will stuck
        })
    }
}

module.exports = {
    logReqRes
}