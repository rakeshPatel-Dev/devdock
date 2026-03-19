import "dotenv/config";

import app from "./app.js";
import connectDB from "../config/mongoose.config.js";

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

