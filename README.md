# vue3-jsx-ui

yarn create vite

yarn add @vitejs/plugin-vue-jsx -D

在 vite.config.ts 中导入 @vitejs/plugin-vue-jsx

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

使用 npx eslint --init



yarn add -D prettier eslint-plugin-prettier eslint-config-prettier