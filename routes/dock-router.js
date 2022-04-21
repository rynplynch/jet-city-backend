const express = require("express");

const DockCtrl = require("../controllers/dock-ctrl");

const router = express.Router();

router.post("/dock", DockCtrl.create);
router.put("/dock/:id", DockCtrl.update);
router.delete("/dock/:id", DockCtrl.remove);
router.get("/dock/:id", DockCtrl.find);
router.get("/docks", DockCtrl.getAll);

router.get("/workstation/docks/:id", DockCtrl.findByWorkstation);

module.exports = router;
