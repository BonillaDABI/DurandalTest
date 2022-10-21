const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const tokenHandlerMiddleware = require('../middleware/tokenHandler')

router.get("/listAll", userController.getAllUsers);
router.post("/update", userController.updateUser)
router.get("/create", tokenHandlerMiddleware(), userController.showCreate)
router.post("/create", tokenHandlerMiddleware(), userController.createUser)
router.get("/delete/:id", tokenHandlerMiddleware(), userController.deleteUser)

module.exports = router