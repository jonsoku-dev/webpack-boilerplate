<h1 align="center">Welcome to webpack5-ts-react 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

- **Webpack5** - New version!
- **ESLint** — Pluggable JavaScript linter
- **Prettier** - Opinionated Code Formatter
- **Husky** — Use git hooks with ease
- **lint-staged** - Run linters against staged git files
- **Absolute import** - Import folders and files using the `@` prefix
- **Storybook** - UI component explorer for frontend developers (with Webpack5)
- **Emotion** Emotion is a library designed for writing css styles with JavaScript (styled, inline)

> boilerplate

## Install

```sh
npm install
```

## Usage
```shell
npm run dev # for dev
npm run build # for prod
npm run storybook # for storybook
```

## Libraries
### webpack & loader
```shell
npm i -D webpack webpack-cli webpack-dev-server core-js@2 babel-loader @babel/register @babel/preset-typescript @babel/cli @babel/core @babel/preset-env @babel/preset-env style-loader css-loader file-loader url-loader webpack-merge
npm i -D @types/webpack @types/webpack-dev-server
```

### webpack plugin
```shell
npm i -D html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin connect-api-mocker optimize-css-assets-webpack-plugin terser-webpack-plugin copy-webpack-plugin fork-ts-checker-webpack-plugin
npm i -D @types/html-webpack-plugin @types/clean-webpack-plugin @types/mini-css-extract-plugin @types/optimize-css-assets-webpack-plugin @types/terser-webpack-plugin @types/copy-webpack-plugin @types/fork-ts-checker-webpack-plugin
```

### git-hook
```shell
npm i -D husky@4 lint-staged
```

### React
```shell
npm i react react-dom react-router-dom
npm i -D @types/react @types/react-dom @types/react-router-dom @babel/preset-react @babel/preset-typescript @pmmmwh/react-refresh-webpack-plugin react-refresh
```


### React lint
```shell
npm i -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### Emotion
```shell
npm i -D @emotion/babel-plugin @emotion/babel-preset-css-prop
npm i @emotion/styled @emotion/react
```

### Etc
```shell
npm i -D ts-node cross-env typescript @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest prettier@latest eslint-config-prettier eslint-plugin-prettier eslint-plugin-simple-import-sort
npm i -D @types/node
```

## Author

👤 **jongseok-lee**
