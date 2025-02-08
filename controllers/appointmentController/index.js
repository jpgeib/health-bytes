const db = require("../../config");
const { getAllAppointments } = require("../../models/appointments");

module.exports = {
    getAppointments: (req, res) => {
        console.log("getting all appointments");
        db.query(getAllAppointments, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }
};