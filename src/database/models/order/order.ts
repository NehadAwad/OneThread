import mongoose, { Schema, HydratedDocument, Types } from "mongoose";
import { IPaymentInfoModel, paymentInfoSchema } from "../paymentInfo/paymentInfo"

export interface IOrderModel {
    userId: Types.ObjectId;
    productIds: Types.ObjectId[];
    quantities: number[];
    paymentInfo: IPaymentInfoModel;
}

const orderSchema = new Schema<IOrderModel>({
    userId: { type: Schema.Types.ObjectId, required: true },
    productIds: [{ type: Schema.Types.ObjectId, required: true }],
    quantities: { type: [Number], required: true },
    paymentInfo: { type: paymentInfoSchema, required: true }
})

export type IOrderDocument = HydratedDocument<IOrderModel>;

const Order = mongoose.model<IOrderModel>("orders", orderSchema);

export default Order;