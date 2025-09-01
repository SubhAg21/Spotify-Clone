import express from "express";
import {
  loginUser,
  logoutUser,
  myprofile,
  registerUser,
  saveToPlaylist,
} from "../controllers/userControllers.js";
import { isAuth } from "./../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/myprofile", isAuth, myprofile);
router.get("/logout", isAuth, logoutUser);
router.post("/song/:id", isAuth, saveToPlaylist)

export default router;
