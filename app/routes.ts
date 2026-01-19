import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/home/_layout.tsx", [
    index("routes/home/index.tsx"),
    route("trading", "routes/home/trading.tsx"),
    route("category", "routes/home/category.tsx"),
    route("cart", "routes/home/cart.tsx"),
    route("profile", "routes/home/profile.tsx"),
  ]),
] satisfies RouteConfig;
