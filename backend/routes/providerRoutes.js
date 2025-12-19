const express = require("express");
const router = express.Router();
const { registerProvider, loginProvider } = require("../controllers/providerController");

// Route to register a new service provider
router.post("/register", registerProvider);
router.post("/login", loginProvider);

module.exports = router;
