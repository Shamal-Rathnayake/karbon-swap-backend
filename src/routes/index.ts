import * as express from "express";
import config from "../config/config";
import userRouter from "../modules/user/user.router";

const router = express.Router();

router.use(express.json({ limit: `${config.requestBodyMaxSize}mb` }));

router.use("/user", userRouter);

export default router;
