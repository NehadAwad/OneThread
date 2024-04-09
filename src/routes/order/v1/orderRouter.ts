
import express from 'express';
import Order from "../../../database/models/order/order";
import { yupInputValidator } from "../../../middlewares/inputValidator";
import * as orderValidator from "../../../validators/orderValidator"

const router = express.Router();

// POST create an order
router.post('/', yupInputValidator(orderValidator.createOrderSchema),
    async (req, res) => {
        
        const order = new Order({
            userId: req.body.userId,
            productIds: req.body.productIds,
            quantities: req.body.quantities,
            paymentInfo: req.body.paymentInfo
        });

        try {
            const newOrder = await order.save();
            res.status(201).json(newOrder);
        } catch (err) {
            res.status(400).json({ message: err });
        }
    });

export default router;