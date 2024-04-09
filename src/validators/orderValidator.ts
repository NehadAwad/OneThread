import * as yup from "yup";

export const createOrderSchema = yup.object().shape({
    userId: yup.string().required("User ID is required"),
    productIds: yup.array().of(
        yup.string().required("Product ID is required")
    ),
    quantities: yup.number().required("Quantity is required").positive().integer("Quantity must be a positive integer"),
    paymentInfo: yup.object().shape({
        method: yup.string(),
        cardNumber: yup.string().required("Card number is required"),
        billingAddress: yup.string().required("Billing address is required"),
    }),
});