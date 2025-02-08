const db = require("../../config");
const { getAllProviders } = require("../../models/providers");

module.exports = {
    getProviders: (req, res) => {
        console.log("getting all providers");
        db.query(getAllProviders, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }
};