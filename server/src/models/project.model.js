import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  github: {
    type: String,
    required: true,
    trim: true,
  },
  live: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;