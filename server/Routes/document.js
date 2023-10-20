import express from "express";
const router = express.Router();
import { createDocument, getDocuments } from "../controllers/document.js";
router.post("/", createDocument);
router.get("/:caseNumberRecord", getDocuments);

export default router;
