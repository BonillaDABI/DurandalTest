const express = require('express')
const router = express.Router()
const controller = require('../controllers/index.controllers')

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/update", controller.update);

module.exports = router