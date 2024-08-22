import { Router } from "express";
import postController from "../controllers/auth/post.controller";

const router = Router();

router.post("/", postController.SignIn);
router.post("/register", postController.SignUp);

export default router;
