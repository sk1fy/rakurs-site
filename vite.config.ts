import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    {
      name: "activity-control-landing",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (/^\/kontrol-aktivnosti\/?(?:\?|$)/.test(req.url || "")) {
            req.url = req.url!.replace(
              /^\/kontrol-aktivnosti\/?/,
              "/activity-control.html",
            );
          }
          next();
        });
      },
    },
  ],
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          input: {
            main: "index.html",
            activity: "activity-control.html",
          },
          output: {
            manualChunks(id) {
              if (id.includes("node_modules")) return "vendor";
            },
          },
        },
      },
}));
