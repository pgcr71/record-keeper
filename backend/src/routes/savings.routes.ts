import { SavingsController } from "../controller/savings.controller";

export const SavingsRoutes = [
  {
    method: "get",
    route: "/savings",
    controller: SavingsController,
    action: "all"
  },
  {
    method: "get",
    route: "/savings/:id",
    auth: true,
    controller: SavingsController,
    action: "one"
  },
  {
    method: "post",
    route: "/savings",
    controller: SavingsController,
    action: "save"
  },
  {
    method: "delete",
    auth: true,
    route: "/savings/:id",
    controller: SavingsController,
    action: "remove"
  },
  {
    method: "get",
    route: "/getUserSavingsDetails/:id",
    controller: SavingsController,
    action: "getUserSavingsDetails"
  }
]

