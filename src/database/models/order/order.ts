import mongoose, { Schema, HydratedDocument } from "mongoose";
import { IPaymentInfoModel, paymentInfoSchema } from "../paymentInfo/paymentInfo"

export interface IOrderModel {
    userId: String;
    productIds: String;
    quantities: number;
    paymentInfo: IPaymentInfoModel;
}

const orderSchema = new Schema<IOrderModel>({
    userId: { type: String, required: true },
    productIds: [{ type: String, required: true }],
    quantities: { type: Number, required: true },
    paymentInfo: { type: paymentInfoSchema, required: true },
}, { timestamps: true })

export type IOrderDocument = HydratedDocument<IOrderModel>;

const Order = mongoose.model<IOrderModel>("orders", orderSchema);

export default Order;