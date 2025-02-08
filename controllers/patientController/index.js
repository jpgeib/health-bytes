const db = require("../../config");
const { getAllPatients } = require("../../models/patients");

module.exports = {
    getPatients: (req, res) => {
        console.log("getting all patients");
        db.query(getAllPatients, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }
};