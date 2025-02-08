const router = require("express").Router();
const { getProviders } = require("../../../controllers/providerController");

router.get("/", getProviders);

module.exports = router;