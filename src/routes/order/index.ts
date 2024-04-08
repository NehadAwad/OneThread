import express from "express";
import orderRouter from "./v1/orderRouter";
const router = express.Router();

router.use("/v1/order", orderRouter);

export default router;