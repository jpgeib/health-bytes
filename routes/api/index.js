const router = require("express").Router();
const appointmentRoutes = require("./appointmentRoutes");
const patientRoutes = require("./patientRoutes");
const providerRoutes = require("./providerRoutes");

router.use("/appointments", appointmentRoutes);
router.use("/patients", patientRoutes);
router.use("/providers", providerRoutes);

module.exports = router;