

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/generated-reports",
  express.static("generated-reports")
);

app.use(
  "/api/report",
  reportRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On ${PORT}`
  );
});