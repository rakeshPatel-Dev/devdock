import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

});

const Test = mongoose.models.Test || mongoose.model("Test", testSchema);

export default Test;