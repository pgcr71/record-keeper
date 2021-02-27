import { OrderController } from "../controller/orders.controller";

export const OrderRoutes = [
  {
    method: "get",
    route: "/orders/:userId",
    controller: OrderController,
    action: "all"
  },
  {
    method: "get",
    route: "/orders/:id",
    controller: OrderController,
    action: "one"
  },
  {
    method: "get",
    route: "/orders/user/:userId",
    controller: OrderController,
    action: "getOrdersByUserId"
  },
  {
    method: "post",
    route: "/orders",
    controller: OrderController,
    action: "save"
  },
  {
    method: "post",
    route: "/orders/update",
    controller: OrderController,
    action: "update"
  },
  {
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    action: "remove"
  }
];
