import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import electron from "vite-plugin-electron/simple";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === "serve";
  const isBuild = command === "build";

  return {
    resolve: {
      alias: { "@": resolve(__dirname, "src") },
    },
    plugins: [
      react(),
      electron({
        main: {
          entry: "electron/main/index.ts",
          onstart(args) {
            args.startup();
          },
          vite: {
            build: {
              sourcemap: isServe,
              minify: isBuild,
              outDir: "dist-electron/main",
            },
          },
        },
        preload: {
          // `build.rollupOptions.input` 的快捷方式
          // 预加载脚本可能包含 Web 资源，因此请使用 build.rollupOptions.input 而不是 build.lib.entry
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: isServe ? "inline" : undefined,
              minify: isBuild,
              outDir: "dist-electron/preload",
            },
          },
        },
        // 为渲染进程填充 Electron 和 Node.js API
        // 如果要在渲染进程中使用 Node.js，则需要在主进程中启用 `nodeIntegration`
        // renderer: {},
      }),
    ],
  };
});
