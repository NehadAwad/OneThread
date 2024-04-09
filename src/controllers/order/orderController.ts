import { IOrderDocument } from "../../database/models/order/order";
import Order from "../../database/models/order/order";

export const createOrder = async (data: IOrderDocument): Promise<IOrderDocument | null> => {
    const order = new Order({
        userId: data.userId,
        productIds: data.productIds,
        quantities: data.quantities,
        paymentInfo: data.paymentInfo
    });

    const newOrder = await order.save();
    return newOrder;
}

export const getOrders = async (): Promise<IOrderDocument[]> => {
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export const getSingleOrder = async (orderId: string): Promise<IOrderDocument | null> => {
    try {
        const order = await Order.findById(orderId);
        return order;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return null;
    }
}

export const updateOrder = async (orderId: string, data: Partial<IOrderDocument>): Promise<IOrderDocument | null> => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return null;
        }
        Object.assign(order, data);

        const updatedOrder = await order.save();
        return updatedOrder;
    } catch (error) {
        console.error("Error updating order:", error);
        return null;
    }
}

export const updateSpecificOrderField = async (orderId: string, data: Partial<IOrderDocument>): Promise<IOrderDocument | null> => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return null;
        }

        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) {
                order[key] = data[key];
            }
        });

        const updatedOrder = await order.save();
        return updatedOrder;
    } catch (error) {
        console.error("Error updating order:", error);
        return null;
    }
}

export const deleteOrder = async (orderId: string): Promise<IOrderDocument | null> => {
    try {
        const order = await Order.findByIdAndDelete(orderId);
        return order; 
    } catch (error) {
        console.error("Error deleting order:", error);
        return null;
    }
}