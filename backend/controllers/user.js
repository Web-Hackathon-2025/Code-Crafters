const User = require("../model/userSchema");

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      location
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password and role are required"
      });
    }

    if (!["customer", "service_provider"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // 3️⃣ Create user (password hashing handled by schema)
    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      location: location
        ? {
            city: location.city,
            area: location.area,
          }
        : undefined
    });

    // 4️⃣ Response (NEVER return password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};
