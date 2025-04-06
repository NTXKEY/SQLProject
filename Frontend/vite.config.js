import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path"; // ✅ Use node:path for ESM
import { fileURLToPath } from "node:url"; // ✅ Convert import.meta.url to a file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // ✅ Define __dirname for ESM

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
