import * as express from "express";
import config from "../config/config";
import userRouter from "../modules/user/user.router";
import withdrawRouter from "../modules/withdraw/withdraw.router";

const router = express.Router();

router.use(express.json({ limit: `${config.requestBodyMaxSize}mb` }));

router.use("/user", userRouter);
router.use("/withdraw", withdrawRouter);

export default router;
