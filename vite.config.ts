import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(), vue()],
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/simple-component.less";',
      },
    },
  },
});
