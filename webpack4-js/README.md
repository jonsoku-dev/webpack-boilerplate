# 프론트엔드의 개발환경과 실습

# blog

[https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)

# eslint

코드 품질, 포맷팅 개선

## 설치

```kotlin
npm i -D eslint 
```

## .eslintrc.js

```kotlin
npx eslint --init
```

```kotlin
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
				"node": true
    },
    "extends": [],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {}
};
```

## cli

```kotlin
npx eslint app.js --fix
```

`fix` 는 eslint가 고칠 수 있는 부분만 처리해주고, 나머지는 eslint가 에러를 알려준 것을 보고, 개발자가 직접 수정해야한다.

## eslint:recommended

eslint 의 preset 버전이다. 기본적으로 eslint에서 추천하는 검사 목록이다.

## .eslintignore

해당부분을 제외하고 eslint가 돌아간다.

```json
dist
node_modules
```

# prettier

코드 포맷팅 개선 (eslint의 포맷팅부분을 극대화시킨 라이브러리)

## 설치

```kotlin
npm i -D prettier
```

## cli

```kotlin
npx prettier app.js --write
```

`--write` arg는 prettier를 먹이고 덮어씌운다.

# eslint + prettier

eslint 를 돌리는 것만으로 prettier까지 한번에 하는법! (왜냐하면 두개를 계속 돌리는 것은 시간아깝기때문에..)

```kotlin
npm i -D eslint-config-prettier eslint-plugin-prettier 
```

`eslint-config-prettier` : eslint 와 prettier를 eslint에서 함께 돌릴때, 포맷팅부분의 중복되는 부분은 eslint에서 검사하지않고 prettier로 패싱한다. (즉, 포맷팅되지않음)

```kotlin
    "extends": [
        "eslint:recommended",
        "eslint-config-prettier" // 또는 "plugin:prettier/recommended"
    ],
```

`eslint-plugin-prettier` : 프리티어 규칙을 eslint 규칙으로 넣는다. 프리티어의 모든 규칙이 eslint로 들어오기 때문에 최종적으로 eslint만 실행하는 것으로 prettier 포맷팅을 함께 할 수 있게된다. 하지만 `extends`에 `plugin:prettier/recommended` 옵션을 넣어주면 동일한 효과가 나오기 때문에, 굳이 넣지않아도 될 것 같다.

```kotlin
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    }
```

## .eslintrc.js

```jsx
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true // require, proccess 등을 사용할때 (webpack.config.js, etc..)
    },
    "extends": [
        "eslint:recommended",
        "eslint-config-prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    }
};
```

## .eslintrc.js 더 쉽게 적용하기

```jsx
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    }
};
```

# git-hook을 이용한 husky

소스 트래킹 도구로 깃을 사용한다면 깃 훗을 사용하는 것이 좋다. 커밋 전, 푸시 전 등등

## 설치

```bash
npm i -D husky@4 # 5버전은 뭔가 안된다-_-;
```

## package.json 에 아래 문구를 삽입한다.

```json
...
"husky": {
    "hooks": {
      "pre-commit": "eslint app.js --fix"
    }
  }
```

# lint-staged

내가 작업한 내역들에 대해서만 린트를 돌리고싶을때 사용한다. (깃 커밋 최적화)

## 설치

```jsx
npm i -D lint-staged
```

## package.json 에 아래 문구를 삽입한다.

```json
...
"lint-staged": {
    "*.js": "eslint app.js --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

# webpack-dev-server

## 설치

```bash
npm i -D webpack-dev-server # 현재 3.12 가 LTS버전인듯
```

## webpack.config.js

```jsx
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "dev.domain.com",
    overlay: true,
    port: 8081,
    stats: "errors-only",
    historyApiFallback: true,
  },
}
```

**contentBase**: 정적파일을 제공할 경로. 기본값은 웹팩 아웃풋이다. 따로 설정하지않아도 됨..

**publicPath**: 브라우져를 통해 접근하는 경로. 기본값은 '/' 이다.

**host**: 개발환경에서 도메인을 맞추어야 하는 상황에서 사용한다. 예를들어 쿠기 기반의 인증은 인증 서버와 동일한 도메인으로 개발환경을 맞추어야 한다. 운영체제의 호스트 파일에 해당 도메인과 127.0.0.1 연결한 추가한 뒤 host 속성에 도메인을 설정해서 사용한다.

**overlay**: 빌드시 에러나 경고를 브라우져 화면에 표시한다.

**port**: 개발 서버 포트 번호를 설정한다. 기본값은 8080.

**stats**: 메시지 수준을 정할수 있다. 'none', 'errors-only', 'minimal', 'normal', 'verbose' 로 메세지 수준을 조절한다.

**historyApiFallBack**: 히스토리 API를 사용하는 SPA 개발시 설정한다. 404가 발생하면 index.html로 리다이렉트한다.

[https://webpack.js.org/configuration/dev-server/](https://webpack.js.org/configuration/dev-server/)

## package.json

```json
...
"scripts": {
    ...
    "start": "webpack-dev-server --progress" 
  },
```

`--progress` : progress bar 를 보여준다.

## Mock Api 를 만들수 있다.

express 를 이용하는 것 같다.

```jsx
// webpack.config.js
devServer: {
    overlay: true,
    stats: "errors-only",
    before: (app) => {
      app.get("/api/users", (req, res) => {
        res.json([
          {
            id: 1,
            name: "Alice",
          },
          {
            id: 2,
            name: "Bek",
          },
          {
            id: 3,
            name: "Chris",
          },
        ]);
      });
    },
  },
```

### axios 설치

```jsx
npm i axios
```

### app.js

```jsx
import "./app.css";
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

console.log(process.env.NODE_ENV);devServer: {
    overlay: true,
    stats: "errors-only",
    before: (app) => {
      app.get("/api/users", (req, res) => {
        res.json([
          {
            id: 1,
            name: "Alice",
          },
          {
            id: 2,
            name: "Bek",
          },
          {
            id: 3,
            name: "Chris",
          },
        ]);
      });
    },
  },
```

### 결과

오우 쉣.. 신박한데 ?

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled.png)

## mock-up data가 많이 필요할 때

```jsx
npm i -D connect-api-mocker
```

### 파일구조

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%201.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%201.png)

`GET.json`

```json
[
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bek"
  },
  {
    "id": 3,
    "name": "Chris"
  }
]
```

### webpack.config.js

```json
const apiMocker = require("connect-api-mocker");

devServer: {
    overlay: true,
    stats: "errors-only",
    before: (app) => {
      app.use(apiMocker("/api", "mocks/api")); // api로 오는 요청은 여기서 처리한다.
    },
  },
```

## 실제 API 연동: devServer.proxy

이번에는 api 서버를 로컬환경에서 띄운 다음 목업이 아닌 이 서버에 직접 api 요청을 해보자. 로컬호스트 8081 포트에 아래와 같이 서버가 구성되었다고 가정하겠다.

```json
$ curl localhost:8081/api/keywords
[{"keyword":"이탈리아"},{"keyword":"세프의요리"},{"keyword":"제철"},{"keyword":"홈파티"}]
```

ajax 요청 부분의 코드를 변경한다.

```jsx
// src/model.js
const model = {
  async get() {
    // const result = await axios.get('/api/keywords');

    // 직접 api 서버로 요청한다.
    const { data } = await axios.get("http://localhost:8081/api/keywords")
    return data
  },
}
```

전설의 Cors에러

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%202.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%202.png)

localhost:8080에서 localhost:8081 로 ajax 호출을 하지 못하는데 이유는 CORS 정책 때문이라는 메세지다. 요청하는 리소스에 "Access-Control-Allow-Origin" 헤더가 없다는 말도 한다.

[CORS(Cross Origin Resource Shaing)](https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS%EC%9D%B4%EB%9E%80) 브라우져와 서버간의 보안상의 정책인데 브라우저가 최초로 접속한 서버에서만 ajax 요청을 할 수 있다는 내용이다. 방금같은 경우는 localhost로 같은 도메인이지만 포트번호가 ***8080, 8081로 달라서 다른 서버로 인식***하는 것이다.

해결하는 방법은 두 가지인데 먼저 서버측 솔루션 부터 보자. 해당 api 응답 헤더에 "Access-Control-Allow-Origiin: *" 헤더를 추가한 뒤 응답하면, 브라우져에서 응답 데이터를 받을 수 있다.

```jsx
// server/index.js
app.get("/api/keywords", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*") // 헤더를 추가한다
  res.json(keywords)
})
```

한편 프론트엔드 측 해결방법을 보자. 서버 응답 헤더를 추가할 필요없이 웹팩 개발 서버에서 api 서버로 프록싱하는 것이다. 웹팩 개발 서버는 proxy 속성으로 이를 지원한다.

```jsx
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:8081", // 프록시
    },
  },
}
```

개발서버에 들어온 모든 http 요청중 /api로 시작되는것은 http://localhost:8081로 요청하는 설정이다. api 호출코드를 다시 복구한 뒤,

```jsx
// src/model.js
const model = {
  async get() {
    // const { data } = await axios.get('http://localhost:8081/api/keywords');

    const { data } = await axios.get("/api/keywords")
    return data
  },
}
```

확인해보면 정상 동작하는 것을 확인할 수 있다.

## HotModuleReplacement

변경된 부분만 수정 (전체를 refresh하지않음)

style-loader가 대표적인 예이다. (css를 변경한 부분만 변경됨)

```jsx
devServer: {
    ...
    hot: true, // <--
```

# 최적화

```jsx
// package.json
...
{
  "scripts": {
    "start": "webpack-dev-server --progress",
    "build": "NODE_ENV=production webpack --progress"
  }
}
```

`NODE_ENV=production` 로 환경변수를 줄 수 있다.

start는 개발 서버를 구동하기 때문에 환경변수를 설정하지 않고 기본값 development를 사용할 것이다. 배포용으로 만들 build는 환경변수를 production으로 설정했고 웹팩 mode에 설정된다.

빌드한 뒤 결과물을 확인해 보자.

```jsx
// webpack.config.js

const mode = process.env.NODE_ENV || "development" // 기본값을 development로 설정

module.exports = {
  mode,
}
```

## optimize-css-assets-webpack-plugin

빌드 과정을 커스터마지징할 수 있는 여지를 제공하는데 그것이 바로 [optimazation](https://webpack.js.org/configuration/optimization/) 속성이다.

HtmlWebpackPlugin이 html 파일을 압축한것 처럼 css 파일도 빈칸을 없애는 압축을 하려면 어떻게 해야할까? [optimize-css-assets-webpack-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production)이 바로 그것이다.

플러그인을 다운로드 하고,

```jsx
npm i -D optimize-css-assets-webpack-plugin
```

```jsx
// webpack.config.js:
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  optimization: {
    minimizer: mode === "production" ? [new OptimizeCSSAssetsPlugin()] : [],
  },
}
```

[optimization.minimizer](https://webpack.js.org/configuration/optimization/#optimizationminimizer)는 웹팩이 ***결과물을 압축할때 사용할 플러그인을 넣는 배열***이다. 설치한 OptimizeCSSAssetsPlugin을 전달해서 빌드 결과물중 css 파일을 압축하도록 했다.

빌드하뒤 확인하면 css 파일도 압축되었다.

## terser-webpack-plugin

mode=production일 경우 사용되는 TerserWebpackPlugin은 자바스크립트 코드를 난독화하고 debugger 구문을 제거한다.
기본 설정 외에도 **콘솔 로그를 제거하는 옵션**도 있는데 배포 버전에는 로그를 감추는 것이 좋을 수도 있기 때문이다.

```jsx
npm i -D terser-webpack-plugin@4 
```

```jsx
// webpack.config.js:
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
  },
}
```

## splitChunks

중복된 코드를 제거한다.

```jsx
optimization: {
    minimizer:
      mode === "production"
        ? [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
    splitChunks: {
      chunks: "all",
    },
  },
```

vendor... 가 추가되는 것을 알 수 있다. 여기에 공통적인 부분이 들어간다.

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%203.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%203.png)

## dynamic import

splitchuks 도 좋은 대안이지만, 이것은 webpack.config.js에서 output을 일일히 적어줘야한다는 단점이 있다.

그러므로 코드 내에서 dynamic import 를 하면 된다.

```jsx
import "./app.css";
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
	**import(/* webpackChunkName: "result" */ "./result.js").then((m) => {
    console.log(m);
  });**

  const res = await axios.get("/api/users");
  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

if (module.hot) {
  console.log("핫 모듈 켜짐");
}
```

**`/* webpackChunkName: "result" */`  : result 는 chunk 로 만들어질 이름이다. 이게 없으면 그냥 숫자나 난독화로 생성 되는 듯하다.**

### 설정 안했을 때

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%204.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%204.png)

### 설정했을 때

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%205.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%205.png)

## externals

조금만 더 생각해 보면 최적화해 볼 수 있는 부분이 있다. 바로 axios같은 써드파티 라이브러리다. 패키지로 제공될때 이미 빌드 과정을 거쳤기 때문에 빌드 프로세스에서 제외하는 것이 좋다. 웹팩 설정중 externals가 바로 이러한 기능을 제공한다.

라이브러리들을 쓸 경우 이 라이브러리들은 이미 build 가 된것들이기때문에, 내쪽에서 또 안해줘도 된다. 그러므로 build할때 제외시키면 빌드속도가 향상되고 용량이적어진다.

externals에 추가하면 웹팩은 코드에서 axios를 사용하더라도 번들에 포함하지 않고 빌드한다. 대신 이를 전역 변수로 접근하도록하는데 키로 설정한 axios가 그 이름이다.

axios는 이미 node_modules에 위치해 있기 때문에 이를 웹팩 아웃풋 폴더에 옮기고 index.html에서 로딩해야한다. 파일을 복사하는 CopyWebpackPlugin을 설치한다. 이건 `copy-webpack-plugin` 과 같이 사용해야한다.

```jsx
npm i -D copy-webpack-plugin@6 // webpack 4 버전은 6버전대를 써야함
```

```jsx
// webpack.config.js

const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js", // 목적지 파일에 들어간다
        },
      ],
    }),
  ],
}
```

마지막으로 index.html에서는 axios를 로딩하는 코드를 추가한다.

```jsx
<!-- src/index.html -->
  <script type="text/javascript" src="axios.min.js"></script>
</body>
</html>
```

꽤 귀찮네...

axios는 이렇게 직접 추가했지만 번들링한 결과물은 `HtmlWebpackPlugin`이 주입해 주는 것을 잊지말자.

![%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%206.png](%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A6%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%AA%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%20703b06fd0b3145a8afe048411e32efc5/Untitled%206.png)

axios는 빌드하지 않고 복사만 한다. controller와 main이 분리되었다. 이전에는 공통의 코드인 axios가 vender~.js로 분리되었는데 지금은 파일조차 없다. 만약 써드파티 라이브러리 외에 공통의 코드가 있다면 이 파일로 분리되었을 것이다.

이렇게 써드파티 라이브러리를 externals로 분리하면 용량이 감소뿐만 아니라 빌드시간도 줄어들고 덩달아 개발 환경도 가벼워질 수 있다.