const router = require("express").Router();
const { getPatients } = require("../../../controllers/patientController");

router.get("/", getPatients);

module.exports = router;