const express = require("express");

const LaptopCtrl = require("../controllers/laptop-ctrl");

const router = express.Router();

router.post("/laptop", LaptopCtrl.create);
router.put("/laptop/:id", LaptopCtrl.update);
router.delete("/laptop/:id", LaptopCtrl.remove);
router.get("/laptop/:id", LaptopCtrl.find);
router.get("/laptops", LaptopCtrl.getAll);

router.get("/workstation/laptops/:id", LaptopCtrl.findByWorkstation);

module.exports = router;
