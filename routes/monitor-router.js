const express = require("express");

const MonitorCtrl = require("../controllers/monitor-ctrl");

const router = express.Router();

router.post("/monitor", MonitorCtrl.create);
router.put("/monitor/:id", MonitorCtrl.update);
router.delete("/monitor/:id", MonitorCtrl.remove);
router.get("/monitor/:id", MonitorCtrl.find);
router.get("/monitors", MonitorCtrl.getAll);

router.get("/workstation/monitors/:id", MonitorCtrl.findByWorkstation);

module.exports = router;
