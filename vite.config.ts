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
    css: {
      modules: {
        localsConvention: "camelCaseOnly", // 将生成的类名转换为驼峰命名
        // 如果不想用 .module.less 文件扩展名，你可以通过配置来自动处理 .less 文件
      },
      // 预处理器选项的配置对象
      preprocessorOptions: {
        less: {
          // // 支持 Less 中的 JavaScript 代码
          javascriptEnabled: true,
        },
      },
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
        renderer: {},
      }),
    ],
  };
});
