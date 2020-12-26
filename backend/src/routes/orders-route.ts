import { OrderController } from "../controller/orders.controller";

export const OrderRoutes = [
  {
    method: "get",
    route: "/orders",
    controller: OrderController,
    auth: true,
    action: "all"
  },
  {
    method: "get",
    route: "/orders/:id",
    auth: true,
    controller: OrderController,
    action: "one"
  },
  {
    method: "post",
    route: "/orders",
    auth: true,
    controller: OrderController,
    action: "save"
  },
  {
    method: "delete",
    auth: true,
    route: "/orders/:id",
    controller: OrderController,
    action: "remove"
  }
];
