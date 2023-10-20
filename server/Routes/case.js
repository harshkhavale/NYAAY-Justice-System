import express from "express";
const router = express.Router();
import { createCase, getCase } from "../controllers/case.js";
router.post("/", createCase);
router.get("/:caseNumberRecord", getCase);

export default router;
