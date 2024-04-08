import mongoose, { Schema, HydratedDocument } from "mongoose";

interface BillingAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface IPaymentInfoModel {
    method: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: BillingAddress;
}

const paymentInfoSchema = new Schema<IPaymentInfoModel>({
    method: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    billingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    }
}, { timestamps: true });

export type IPaymentInfoDocument = HydratedDocument<IPaymentInfoModel>;

const PaymentInfo = mongoose.model<IPaymentInfoModel>("paymentInfos", paymentInfoSchema);

export default PaymentInfo;