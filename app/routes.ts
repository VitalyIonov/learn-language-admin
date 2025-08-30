import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  ...prefix("admin", [
    layout("./dashboard.tsx", [
      index("routes/users/index.tsx", { id: "index-users" }),
      route("users", "routes/users/index.tsx"),
      route("categories", "routes/categories/index.tsx"),
      route("levels", "routes/levels/index.tsx"),
      route("meanings", "routes/meanings/index.tsx"),
      route("definitions/text", "routes/text-definitions/index.tsx"),
      route("definitions/image", "routes/image-definitions/index.tsx"),
    ]),

    route("login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
