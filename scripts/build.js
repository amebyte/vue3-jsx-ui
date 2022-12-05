/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

// 引入vite导出的build方法，用它来创建
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

const fsExtra = require('fs-extra')
const version = require('../package.json').version

// 基础配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJsx()]
  })

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')

// 输出目录
const outputDir = path.resolve(__dirname, '../build')

// rollup配置
const rollupOptions = {
    // 外置
    external: ['vue', 'vue-router'],
    output: {
      globals: {
        vue: 'Vue'
      }
    }
}

// 生成package.json
const createPackageJson = name => {
    // 预设
    const fileStr = `{
      "name": "${name ? name : 'sheep-ui'}",
      "version": "${version}",
      "main": "${name ? 'index.umd.js' : 'vue3-jsx-ui.umd.js'}",
      "module": "${name ? 'index.umd.js' : 'vue3-jsx-ui.es.js'}",
      "author": "Cobyte",
      "description": "",
      "repository": {
        "type": "git",
        "url": "git+https://github.com/amebyte/vue3-jsx-ui.git"
      },
      "keywords": ["vue3", "组件库", "tsx", "UI"],
      "license": "ISC",
      "bugs": {
        "url": "https://github.com/amebyte/vue3-jsx-ui/issues"
      }
    }`
  
    if (name) {
      // 单个组件，输出对应的package.json
      fsExtra.outputFile(
        path.resolve(outputDir, `${name}/package.json`),
        fileStr,
        'utf-8'
      )
    } else {
      // 全量
      fsExtra.outputFile(
        path.resolve(outputDir, 'package.json'),
        fileStr,
        'utf-8'
      )
    }
  }

// 执行创建
// 全量构建
const buildAll = async () => {
    await build(
      defineConfig({
        ...baseConfig,
        build: {
          rollupOptions,
          lib: {
            entry: entryFile,
            name: 'vue3-jsx-ui',
            fileName: 'vue3-jsx-ui',
            formats: ['es', 'umd']
          },
          outDir: outputDir
        }
      })
    )
  
    // 生成package.json
    // createPackageJson()
  }

  const buildLib = async () => {
    await buildAll();
  }

  buildLib();