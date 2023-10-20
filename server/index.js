import express from "express";
import dotenv from "dotenv";
import caseRoutes from "./Routes/case.js";
import policeRoutes from "./Routes/policeStation.js";
import documentRoutes from "./Routes/document.js";

import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

app.get("/api/test", (req, res) => {
  console.log("test successfull!");
  res.status(200).json("success");
});

app.use("/api/case", caseRoutes);
app.use("/api/police", policeRoutes);
app.use("/api/document", documentRoutes);
