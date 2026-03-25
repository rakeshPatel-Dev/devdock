import {
  createTest,
  getTest
} from "../controllers/test.controller.js"
import upload from "../middlewares/multer.middleware.js"
import express from "express";

const router = express();

router.post("/", upload.single("image"), createTest);
router.get("/", getTest);

export default router;