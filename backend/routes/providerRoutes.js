const express = require("express");
const router = express.Router();
const { registerProvider } = require("../controllers/providerController");

// Route to register a new service provider
router.post("/register", registerProvider);

module.exports = router;
