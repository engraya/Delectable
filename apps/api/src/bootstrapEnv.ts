import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Directory containing this file: apps/api/src */
const srcDir = path.dirname(fileURLToPath(import.meta.url));
const apiPackageEnv = path.join(srcDir, "../.env");
const repoRootEnv = path.join(srcDir, "../../../.env");

config({ path: repoRootEnv });
config({ path: apiPackageEnv, override: true });

/** CRA-era name still used in some setups */
if (!process.env.SPOONACULAR_API_KEY && process.env.REACT_APP_API_KEY) {
  process.env.SPOONACULAR_API_KEY = process.env.REACT_APP_API_KEY;
}

/** Google samples sometimes use these names for the same Studio key */
if (!process.env.GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GOOGLE_API_KEY;
}
