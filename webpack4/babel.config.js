// 너무 많다...
// module.exports = {
//     plugins: [
//         "@babel/plugin-transform-block-scoping",
//         "@babel/plugin-transform-arrow-functions",
//         "@babel/plugin-transform-strict-mode"
//     ]
// }

// 그래서 preset 을 제공한다. (묶어놓은 패키지)
// module.exports = {
//     presets: [
//         './my-babel-preset.js' // custom preset
//     ]
// }

// @babel/preset-env 를 설치한다. (익스플로러를 위해서...)
module.exports = {
    presets: [
        // custom preset
        // https://caniuse.com/?search=const
        ['@babel/preset-env', {
            targets: {
                chrome: '79',
                ie: '11'
            },
            useBuiltIns: 'usage', // 'entry', false
            /**
             * @babel-polyfill 과 같은 개념의 코드 조각을 추가시켜준다.
             * 하지만 corejs는 코드 상단에 corejs 를 require하는 구문을 추가한다.
             * npm i -D core-js@2 로 추가한다.
             * 예를들어 new Promise() 라는건 익스플로러에선 지원하지않는다.
             * 그러므로..
             * "use strict";
             * require("core-js/modules/es6.object.to-string.js");
             * require("core-js/modules/es6.promise.js");
             * new Promise();
             */
            corejs: {
                version: 2
            }
        }]
    ]
}

// 아래 명령어는 너무 길어서...
// => npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-transform-strict-mode
// babel.config.js 설정 후에는
// => npx babel app.js