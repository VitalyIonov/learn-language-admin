export default {
  api: {
    input: {
      target: 'http://localhost:8000/api/v1/admin_openapi.json',
      // validation: true,
    },
    output: {
      target: 'app/types/api-generated.ts',
      schemas: 'app/types/api',
      client: 'axios',
      exportSchemas: true,
    },
  },
};
