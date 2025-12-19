const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    businessName: { type: String, required: true },
    phone: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    terms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);
