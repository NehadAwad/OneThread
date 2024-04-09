
import express from 'express';
import { yupInputValidator } from "../../../middlewares/inputValidator";
import * as orderValidator from "../../../validators/orderValidator";
import { createOrder, getOrders, getSingleOrder, updateOrder, updateSpecificOrderField, deleteOrder } from "../../../controllers/order/orderController";

const router = express.Router();

// POST create an order
router.post('/', yupInputValidator(orderValidator.createOrUpdateOrderSchema),
    async (req, res) => {
        const data = req.body;
        const orderDoc = await createOrder(data);

        if (!orderDoc) {
            res.status(400).json({ message: "Order create failed" });
        }

        res.status(201).json({ message: "Order successfully created" })
    });

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await getOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// GET one order
router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    const orderDoc = await getSingleOrder(orderId);
    if (!orderDoc) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(201).json(orderDoc);
});

// PUT update an order
router.put('/:id', yupInputValidator(orderValidator.createOrUpdateOrderSchema),
    async (req, res) => {
        try {
            const orderId = req.params.id;
            const updatedOrder = await updateOrder(orderId, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.json(updatedOrder);
        } catch (error) {
            console.error("Error updating order:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
});

// PATCH update specific fields of an order
router.patch('/:id', yupInputValidator(orderValidator.createOrUpdateOrderSchema),
    async (req, res) => {
        try {
            const orderId = req.params.id;
            const updatedOrder = await updateSpecificOrderField(orderId, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.json(updatedOrder);
        } catch (error) {
            console.error("Error updating order:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await deleteOrder(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;