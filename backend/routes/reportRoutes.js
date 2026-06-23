

import express from "express";
import multer from "multer";

import {
  generateDDR
} from "../controllers/reportController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post(
  "/generate",
  upload.fields([
    {
      name: "inspection",
      maxCount: 1
    },
    {
      name: "thermal",
      maxCount: 1
    }
  ]),
  generateDDR
);

export default router;