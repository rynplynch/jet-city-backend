const express = require("express");

const SwitchCtrl = require("../controllers/switch-ctrl");

const router = express.Router();

router.post("/switch", SwitchCtrl.create);
router.put("/switch/:id", SwitchCtrl.update);
router.delete("/switch/:id", SwitchCtrl.remove);
router.get("/switch/:id", SwitchCtrl.find);
router.get("/switchs", SwitchCtrl.getAll);

router.get("/workstation/switchs/:id", SwitchCtrl.findByWorkstation);

module.exports = router;
