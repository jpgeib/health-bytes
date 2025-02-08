const router = require("express").Router();
const { getAllPatients } = require("../../../controllers/patientController");

router.get("/", getAllPatients);

module.exports = router;