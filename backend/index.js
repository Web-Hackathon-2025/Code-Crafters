const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes"); 
const providerRoutes = require("./routes/providerRoutes")

dotenv.config();

const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you use cookies/auth
}));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api/auth", adminRoutes); 
app.use("/api/provider", providerRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
