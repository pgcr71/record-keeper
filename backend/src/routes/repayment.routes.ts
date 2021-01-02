import { RepaymentController } from "../controller/repayments.controller";

export const RepaymentRoutes = [
  {
    method: "get",
    route: "/repayments",
    controller: RepaymentController,
    action: "all"
  },
  {
    method: "get",
    route: "/repayments/:id",
    auth: true,
    controller: RepaymentController,
    action: "one"
  },
  {
    method: "post",
    route: "/repayments",
    controller: RepaymentController,
    action: "save"
  },
  {
    method: "delete",
    auth: true,
    route: "/repayments/:id",
    controller: RepaymentController,
    action: "remove"
  },
  {
    method: "get",
    route: "/getUserRepaymentDetails/:id",
    controller: RepaymentController,
    action: "getUserRepaymentDetails"
  }
]

