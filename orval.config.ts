import { defineConfig } from "orval";

export default defineConfig({
  adminApi: {
    input: {
      target: "http://localhost:8000/api/v1/admin/openapi.json",
    },
    output: {
      target: "app/types/api-generated.ts",
      schemas: "app/types/api",
      client: "axios",
      clean: true,
    },
  },
  authApi: {
    input: {
      target: "http://localhost:8000/api/v1/auth/openapi.json",
    },
    output: {
      target: "app/types/auth-api.ts",
      schemas: "app/types/auth-schemas",
      client: "axios",
    },
  },
});
