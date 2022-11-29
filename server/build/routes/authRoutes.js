const express = require('express');
const authController = require('../controllers/authController')
const cookieParser = require("cookie-parser");
const { validateToken } = require('../config/JWT');
const router = express.Router();
router.use(cookieParser());

router.post("/register", authController.register);


// router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.patch("/update", authController.update)


router.delete("/delete/:id", authController.delete);

router.delete("/deleteClient/:id", authController.deleteClient);

router.delete("/deleteCont/:id", authController.deleteCont);

router.delete("/deleteTech/:id", authController.deleteTech);

router.post("/addPerms", authController.rudPermissions)

router.get("/roles", authController.getAllRoles)

router.post("/createRoles", authController.createRoles)

router.patch("/updateRoles", authController.updateRoles)

router.post("/forgotPassword", authController.forgotPassword)

router.patch("/resetPassword/:resetToken", authController.resetPassword)

router.get("/permissions", authController.permissions)

router.get("/permissions/:id", authController.modulesANDfunctions)


router.get("/autofillClients", authController.sendUserIDsClients)

router.post("/createClient", authController.protect, authController.createClient)

router.post("/extraContact/:id", authController.protect, authController.extraContact)

router.get("/listTechs", authController.listTechnicals)

router.get("/listClients", authController.listClients)

router.get("/listContacts", authController.listContacts)

router.get("/listAll", authController.listAll);

router.get("/listClientsContacts/:id", authController.listClientAndContacts);

router.get("/autofillRoles", authController.sendRoles);

// router.get("/autofillParentsID", authController.sendParentID);

router.post("/createTech", authController.protect, authController.createTechnical);

router.get("/autofillTechs", authController.sendTechs);

router.patch("/updateClient", authController.updateClient)

module.exports = router;