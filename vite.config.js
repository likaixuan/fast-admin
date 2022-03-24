import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    proxy: {
      // 字符串简写写法
      "/admin": "http://127.0.0.1:7001",
      // 选项写法
    },
  },
  plugins: [vue()],
});
