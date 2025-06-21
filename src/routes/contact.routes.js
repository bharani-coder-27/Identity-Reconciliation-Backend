import { fetchAllContacts, identifyContact } from "../controllers/contact.controllers.js";

import express from "express";

const router = express.Router();

router.get("/identify", fetchAllContacts);
router.post("/identify", identifyContact);

export default router;