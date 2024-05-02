export class GlobalConstants {

    /* Messages */
    public static genericError: string = "Something went wrong";
    public static unauthorized: string = "Access detected without authorization";
    public static invalidForm: string = "Please fill out the form's fields";
    public static orderSent: string = "Your order has been successfully placed";
    public static pdfError: string = "Failed to fetch PDF";

}

export enum OrderStatus {
    NEW = 'New',
    PAYED = 'Payed',
    SHIPPED = 'Shipped',
    CANCELED = 'Canceled',
    REFUNDED = 'Refunded',
}