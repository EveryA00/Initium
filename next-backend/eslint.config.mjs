import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = {
  extends: ["next/core-web-vitals"],  // Extend Next.js' core-web-vitals config
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
};

export default eslintConfig;
