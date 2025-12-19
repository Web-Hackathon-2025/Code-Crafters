const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../controllers/admin");

// POST /api/admin-register
router.post("/admin-register", registerAdmin);

module.exports = router;
