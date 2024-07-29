/**
 * "off"或者0     //关闭检测规则
 * "warn"或者1    //打开并把打开的检测规则作为警告
 * "error"或者2   //打开并把检测规则作为一个错误
 */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-undef": "off",
  },
};
