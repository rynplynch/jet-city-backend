const express = require("express");

const ClientCtrl = require("../controllers/client-ctrl");

const router = express.Router();

router.post("/client", ClientCtrl.create);
router.put("/client/:id", ClientCtrl.update);
router.delete("/client", ClientCtrl.remove);
router.get("/client/:id", ClientCtrl.findById);
router.get("/client", ClientCtrl.findAll);

module.exports = router;
