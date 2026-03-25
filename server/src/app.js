import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute)


app.get("/", (req, res) => {
  res.send("DevDock server is running");
});





export default app

