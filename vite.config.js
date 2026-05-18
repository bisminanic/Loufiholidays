import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
 server: {
  proxy: {
    "/emailjs": {
      target: "https://api.emailjs.com",
      changeOrigin: true,
      secure: false,        // ← add this
      rewrite: (path) => path.replace(/^\/emailjs/, ""),
    },
  },
},
});