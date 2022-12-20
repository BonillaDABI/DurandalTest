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

router.delete("/deleteSite/:id", authController.deleteSite);

router.post("/addPerms", authController.rudPermissions)

router.get("/roles", authController.getAllRoles)

router.post("/createRoles", authController.createRoles)

router.patch("/updateRoles", authController.updateRoles)

router.post("/forgotPassword", authController.forgotPassword)

router.patch("/resetPassword/:resetToken", authController.resetPassword)

router.get("/permissions", authController.permissions)

router.get("/permissions/:id", authController.modulesANDfunctions)


router.get("/autofillClients", authController.sendUserIDsClients)

router.get("/autofillContacts", authController.sendContactTypes)

router.get("/autofillCountryDetails", authController.sendCountryDetails)

router.post("/createClient", authController.protect, authController.createClient)

router.post("/extraContact/:id", authController.protect, authController.extraContact)

router.get("/listTechs", authController.listTechnicals)

router.get("/listTech/:id", authController.listTechnicalByID)

router.get("/listSiteLogs/:id", authController.listSitesLogsByID)

router.get("/listClients", authController.listClients)

router.get("/listSites", authController.listSites)

router.get("/listClientSites/:id", authController.listSitesByClientID)

router.get("/listSitesByID/:id", authController.listSitesByID)

router.get("/listClient/:id", authController.listClientByID)

router.get("/listContacts", authController.listContacts)

router.get("/listAll", authController.listAll);

router.get("/listClientsContacts/:id", authController.listClientAndContacts);

router.get("/autofillRoles", authController.sendRoles);

// router.get("/autofillParentsID", authController.sendParentID);

router.post("/createTech", authController.protect, authController.createTechnical);

router.post("/createSite/:id", authController.protect, authController.createSite);

router.get("/autofillTechs", authController.sendTechs);

router.patch("/updateClient/:id", authController.updateClient)

router.patch("/updateSite/:id", authController.updateSite)

router.patch("/updateTech/:id", authController.updateTechnical)

router.patch("/updateContact/:id", authController.updateContact)

//Equipments

router.get("/listEquipments", authController.listEquipments)

router.get("/autofillBrands", authController.sendBrands)

router.post("/createEquip", authController.protect, authController.createEquipment)

router.post("/createEqAttr", authController.protect, authController.createEquipmentAttr)

//Items

router.get("/listItems", authController.listItems)

router.get("/autofillCurrenciesAndUnits", authController.sendCurrenciesAndUnits)

router.post("/createItem", authController.protect, authController.createItem)

router.post("/createItemAttr", authController.protect, authController.createItemAttr)

//Assets

router.get("/listAssets", authController.listAssets)

router.get("/autofillAssets", authController.sendSitesAndEquips)

router.post("/createAsset", authController.protect, authController.createAsset)

router.patch("/updateAsset/:id", authController.protect, authController.updateAsset)

router.get("/listAssetLogs/:id", authController.listAssetsLogs)

//Visits

router.get("/listVisits", authController.listVisits)

router.get("/autofillVisits", authController.sendVisitInfo)

router.post("/createVisit", authController.protect, authController.createVisit)

router.patch("/updateVisit/:id", authController.protect, authController.updateVisit)

router.get("/listVisitLogs/:id", authController.listVisitsLogs)


module.exports = router;