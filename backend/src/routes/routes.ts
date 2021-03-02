import { InterestTypesRoutes } from "./interest-types.route";
import { OrderRoutes } from "./orders-route";
import { ProductRoutes } from "./product-route";
import { RepaymentRoutes } from "./repayment.routes";
import { UserRoutes } from "./user.route";

export const Routes = [
  ...OrderRoutes,
  ...ProductRoutes,
  ...InterestTypesRoutes,
  ...UserRoutes,
  ...RepaymentRoutes,
]
