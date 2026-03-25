import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/app/api.generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-rtk-query",
      ],
      config: {
        importBaseApiFrom: "./baseApi",
        importBaseApiAlternateName: "baseApi",
        exportHooks: true,
      },
    },
  },
};

export default config;
