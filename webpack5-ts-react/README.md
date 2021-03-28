# tsconfig.json <-> babel
`tsconfig.json` : ts/tsx 파일에 타이핑할때 타이핑을 검사해주는 놈

`babel` : 실제 webpack에서 변환할때 필요한 놈

alias 관련해서 두군데 다 설정해야하는 이유이다.

## Dev Install
```shell
npm i react react-dom typescript @types/react @types/react-dom
```

## Lint Install
```shell
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier
```

## 설정파일
### .eslintrc
prettier 가 추천해주는 데로...?
```json
{
  "extends": [
    "plugin:prettier/recommended"
  ]
}
```
### .prettierrc
```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
```
### tsconfig.json
```json
{
  "compilerOptions": {
    "esModuleInterop": true, // import * as React from 'react' -> import React from 'react'
    "sourceMap": true, // error 위치 찾기
    "lib": ["ES2020", "DOM"], // 최신문법
    "jsx": "react", // 리액트뿐만 아니라 다른곳에서 쓸 수 있기 때문에
    "module": "esnext", // 최신
    "moduleResolution": "Node",
    "target": "es5",
    "strict": true, // 엄격하게
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@hooks/*": ["hooks/*"],
      "@components/*": ["components/*"],
      "@layouts/*": ["layouts/*"],
      "@pages/*": ["pages/*"],
      "@utils/*": ["utils/*"],
      "@typings/*": ["typings/*"]
    }
  }
}
```

## 변환 과정
- [ ] ts -> js
- [x] ts -> babel -> js
   
babel 은 이미지, css, html 등 모두 다 javascript 로 변환할 수 있다.
이것을 위해 `ts -> babel -> js` 로 사용하는 것이 좋다.

## babel과 webpack 설정하기
```json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "typescript": "^4.2.3",
    "webpack": "^5.24.2",
    "webpack-cli": "^4.5.0",
    "cross-env": "^7.0.3",
    "css-loader": "^5.1.3",
    "style-loader": "^2.0.0",
    "ts-node": "^9.1.1",
    "prettier": "^2.2.1",
    "eslint": "^7.22.0",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-prettier": "^3.3.1",
    "babel-loader": "^8.2.2",
    "@types/react": "^17.0.3",
    "@types/react-dom": "^17.0.2",
    "@babel/core": "^7.13.10",
    "@babel/preset-env": "^7.13.12",
    "@babel/preset-react": "^7.12.13",
    "@babel/preset-typescript": "^7.13.0",
    "@types/node": "^14.14.35",
    "@types/webpack": "^4.41.26"
  }
}
```
### webpack.config.ts 를 위한 tsconfig
`tsconfig-for-webpack-config.json`
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "Node",
    "target": "ES5",
    "esModuleInterop": true
  }
}
```
`package.json`의 scripts

windows 사용자를 위한 `cross-env`
```json
{
 "scripts": {
    "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
  }
}
```

## webpack-dev-server
```shell
npm i webpack-dev-server @types/webpack-dev-server -D 
npm i @pmmmwh/react-refresh-webpack-plugin react-refresh -D
npm i fork-ts-checker-webpack-plugin -D # 타입스크립트 실행과 웹팩 실행이 동시에 동작하도록 해준다.
```

## 폴더 구조와 리액트 라우터
```shell
npm i react-router react-router-dom && npm i -D @types/react-router @types/react-router-dom
```

## 코드 스플리팅
```shell
npm i @loadable/component
npm i -D @types/loadable__component
```

## Style
```shell
npm i @emotion/react @emotion/styled @emotion/babel-plugin
```