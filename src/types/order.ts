

// declare module "order-types" {
    import {ObjectId} from "mongodb";

    export interface OrderType {
        _id: ObjectId;
        userId: ObjectId;
        orderList: {
            menuItem: ObjectId;
            totalOrder: number;
            takeNote: string;
        }[];
        // type: "withdrawal" | "refill";
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
    }
// }
