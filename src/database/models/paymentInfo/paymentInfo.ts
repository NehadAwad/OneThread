import mongoose, { Schema, HydratedDocument } from "mongoose";

export interface IPaymentInfoModel {
    method: string;
    cardNumber: string;
  
    billingAddress: string;
}

export const paymentInfoSchema = new Schema<IPaymentInfoModel>({
    method: { type: String },
    cardNumber: { type: String },
    billingAddress: { type: String },
}, { timestamps: true });

export type IPaymentInfoDocument = HydratedDocument<IPaymentInfoModel>;

const PaymentInfo = mongoose.model<IPaymentInfoModel>("paymentInfos", paymentInfoSchema);

export default PaymentInfo;