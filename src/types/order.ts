

// declare module "order-types" {
    import {ObjectId} from "mongodb";

    export interface OrderType {
        _id: ObjectId;
        userId: ObjectId;
        orderList: {
            name: string;
            menuItem: ObjectId;
            totalOrder: number;
            takeNote: string;
        }[];
        // type: "withdrawal" | "refill";
        takeNote: string;
        location: string;
        orderVolume: number;
        promotions: number;
        status: "pending" | "approved" | "rejected";
        isHandled: boolean;
        handlerId: ObjectId;
        receive: number;
        createdAt: Date;
        updatedAt: Date;
    }
    export enum OrderStatus {
        'pending' = 'Chờ xử lý',
        'approved' = 'Đã xử lý',
        'rejected' = 'Từ chối'
    }
    export type OrderStatusType = keyof typeof OrderStatus;
    export interface BetResult {
        _id: ObjectId;
        userId: ObjectId;
        orderId: ObjectId;
        bet: number;
        win: number;
        createdAt: Date;
    }
    export type timeOrder = "morning" | "afternoon" | "evening"| "night";
    export type MenuItemType = {
        _id: ObjectId;
        name: string;
        price: number;
        // type: timeOrder;
        image: string;
        description: string;
        total_sold: number;
        address: string;
        discount: number;
        type: "morning-menu"| "afternoon-menu" | "evening-menu" | "other-menu";
    }
    export interface PurchaseOrderType {
        _id: ObjectId;
        amount: number;
        status: "pending" | "approved" | "rejected";
        paymentMethod: "cash" | "credit" | "paypal" | "zalo" | "momo" | "bank" | "other";
        userId: string;
        isPaid: boolean;
        confirmed: boolean;
        items: {id: string, quantity: number}[];
        createdAt: Date;
        updatedAt: Date;
    }
    export interface OrderWithDrawType {
        _id: ObjectId;
        userId: ObjectId;
        type: "withdrawal" | "refill";
        orderVolume: number;
        promotions: number;
        status: "pending" | "approved" | "rejected";
        isHandled: boolean;
        handlerId: ObjectId;
        receive: number;
        createdAt: Date;
        updatedAt: Date;
    }
    export enum TranslateMenuType {
        "morning-menu" = "Menu sáng",
        "afternoon-menu" = "Menu trưa",
        "evening-menu" = "Menu tối",
        "other-menu" = "Khác"
    }
// }
