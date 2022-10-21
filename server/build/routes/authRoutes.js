const express = require('express');
const authController = require('../controllers/authController')
const cookieParser = require("cookie-parser");
const { validateToken } = require('../config/JWT');
const router = express.Router();
router.use(cookieParser());

router.post("/register", authController.register);


router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.patch("/update", authController.update)


router.get("/delete", authController.delete);


router.get("/listAll", authController.listAll);

module.exports = router;