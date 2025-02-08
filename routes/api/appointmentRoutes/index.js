const router = require("express").Router();
const { getAppointments } = require("../../../controllers/appointmentController");

router.get("/", getAppointments);

module.exports = router;