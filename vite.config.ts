import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          emotion: ["@emotion/react", "@emotion/styled"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
  },
});
