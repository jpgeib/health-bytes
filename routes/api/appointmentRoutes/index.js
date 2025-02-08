const router = require("express").Router();
const { getAllAppointments } = require("../../../controllers/appointmentController");

router.get("/", getAllAppointments);

module.exports = router;