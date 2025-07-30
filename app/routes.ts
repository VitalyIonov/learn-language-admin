import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  ...prefix('admin', [
    layout('./dashboard.tsx', [
      index('routes/users.tsx', { id: 'index-users' }),
      route('users', 'routes/users.tsx'),
      route('categories', 'routes/categories/index.tsx'),
      route('levels', 'routes/levels/index.tsx'),
      route('meanings', 'routes/meanings/index.tsx'),
      route('definitions', 'routes/definitions/index.tsx'),
    ]),

    route('login', 'routes/login.tsx'),
  ]),
] satisfies RouteConfig;
