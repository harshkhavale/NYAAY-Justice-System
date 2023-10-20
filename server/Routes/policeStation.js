import express from "express";
const router = express.Router();
import { policeAuth,policeRegister } from "../controllers/policeStation.js";
router.post("/auth",policeAuth );
router.post("/register",policeRegister );

export default router;
