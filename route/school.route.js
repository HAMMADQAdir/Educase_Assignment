import { addSchool, listSchools } from "../controller/school.controller.js";
import express from "express";
const router = express.Router();

router.post("/addSchool",addSchool);
router.get("/listSchools",listSchools);

export default router;