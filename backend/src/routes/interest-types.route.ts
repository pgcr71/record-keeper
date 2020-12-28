import { InterestTypesController } from "../controller/interest_types.controller";

export const InterestTypesRoutes = [
  {
    method: "get",
    route: "/interestTypes",
    controller: InterestTypesController,
    action: "all"
  },
  {
    method: "get",
    route: "/interestTypes/:id",
    auth: true,
    controller: InterestTypesController,
    action: "one"
  },
  {
    method: "post",
    route: "/interestTypes",
    controller: InterestTypesController,
    action: "save"
  },
  {
    method: "delete",
    route: "/interestTypes/:id",
    controller: InterestTypesController,
    action: "remove"
  }
]

