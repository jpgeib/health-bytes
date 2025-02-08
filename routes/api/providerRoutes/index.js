const router = require("express").Router();
const { getAllProviders } = require("../../../controllers/providerController");

router.get("/", getAllProviders);

module.exports = router;