import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;