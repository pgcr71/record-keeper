import { UserController } from "../controller/users.controller";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
  },
  {
    method: "get",
    route: "/searchUser/:searchTerm",
    controller: UserController,
    action: "getMatchedUsers"
  },
  {
    method: "get",
    route: "/getUserOrdersAndRepayments/:id/:start_date/:end_date/:allOrders",
    controller: UserController,
    action: "getUserOrdersAndRepayments"
  },
  {
    method: "delete",
    route: "/users/:id",
    auth: true,
    controller: UserController,
    action: "remove"
  }
];
