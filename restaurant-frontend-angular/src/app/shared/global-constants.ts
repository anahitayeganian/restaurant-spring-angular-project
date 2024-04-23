export class GlobalConstants {

    /* Messages */
    public static genericError: string = "Something went wrong";
    public static unauthorized: string = "Access detected without authorization";
    public static invalidForm: string = "Please fill out the form's fields";

}

export enum OrderStatus {
    NEW = 'New',
    PAYED = 'Payed',
    SHIPPED = 'Shipped',
    CANCELED = 'Canceled',
    REFUNDED = 'Refunded',
}