const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/admin");

// POST /api/admin-register
router.post("/admin-register", registerAdmin);

// POST /api/admin-login
router.post("/admin-login", loginAdmin);

module.exports = router;
