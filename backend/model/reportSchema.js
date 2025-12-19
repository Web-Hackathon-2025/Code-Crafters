const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reportedProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider" },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  issueType: { type: String, enum: ["SERVICE_ISSUE", "PAYMENT_DISPUTE", "MISBEHAVIOR", "OTHER"], required: true },
  description: { type: String },
  status: { type: String, enum: ["PENDING", "RESOLVED", "DISMISSED"], default: "PENDING" },
  adminAction: { type: String }, // e.g., "Warned", "Suspended"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
