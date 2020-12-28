import { ProductController } from "../controller/products.controller";

export const ProductRoutes = [
  {
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all"
  },
  {
    method: "get",
    route: "/products/:id",
    auth: true,
    controller: ProductController,
    action: "one"
  },
  {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "save"
  },
  {
    method: "delete",
    auth: true,
    route: "/products/:id",
    controller: ProductController,
    action: "remove"
  }
]

