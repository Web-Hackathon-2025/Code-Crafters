// const Provider = require("../model/providerSchema");
// const bcrypt = require("bcryptjs");

// exports.registerProvider = async (req, res) => {
//   try {
//     const { name, businessName, phone, serviceCategory, address, email, password, terms } = req.body;

//     // Check if provider already exists
//     const existingProvider = await Provider.findOne({ email });
//     if (existingProvider) {
//       return res.status(400).json({ message: "Provider already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const provider = new Provider({
//       name,
//       businessName,
//       phone,
//       serviceCategory,
//       address,
//       email,
//       password: hashedPassword,
//       terms
//     });

//     await provider.save();
//     res.status(201).json({ message: "Provider registered successfully", provider });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// // Login provider
// exports.loginProvider = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const provider = await Provider.findOne({ email });
//     if (!provider) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, provider.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     // Optionally: generate a token (JWT) here if needed
//     res.status(200).json({ message: "Login successful", provider });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
const Provider = require("../model/providerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register provider
exports.registerProvider = async (req, res) => {
  try {
    const { name, businessName, phone, serviceCategory, address, email, password, terms } = req.body;

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: "Provider already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = new Provider({
      name,
      businessName,
      phone,
      serviceCategory,
      address,
      email,
      password: hashedPassword,
      terms
    });

    await provider.save();
    res.status(201).json({ message: "Provider registered successfully", provider });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login provider
exports.loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await Provider.findOne({ email });
    if (!provider) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT with type = 'provider'
    const token = jwt.sign(
      { id: provider._id, type: "provider", email: provider.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", provider, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
