const express = require("express");
const router = express.Router();
const { registerProvider, loginProvider } = require("../controllers/providerController");
const {protect, restrictTo} = require("../middleware/authMiddleware")

// Route to register a new service provider
router.post("/register", registerProvider);
router.post("/login", loginProvider);

router.get("/dashboard", protect, restrictTo("provider"), (req, res) => {
  res.status(200).json({ message: "Welcome to Provider Dashboard", user: req.user });
});

module.exports = router;
