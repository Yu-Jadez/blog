// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**'],
  },
  ...eslintPluginAstro.configs['flat/recommended'],
  // typescript-eslint 的推荐配置需限定在 .ts 文件上，
  // 否则其 TS 解析器会覆盖 .astro 文件的解析器
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  })),
  {
    rules: {
      // 本项目前端大量使用 any 处理第三方地图/几何数据，先保持宽松
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
