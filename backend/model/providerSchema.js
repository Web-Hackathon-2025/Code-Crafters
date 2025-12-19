const providerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  servicesOffered: [{ type: String }], // e.g., "Plumber", "Carpenter"
  pricing: { type: Number },
  location: { type: String },
  approvalStatus: { type: String, enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"], default: "PENDING" },
  ratingsAverage: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceProvider", providerSchema);
