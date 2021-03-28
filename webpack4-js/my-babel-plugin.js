module.exports = function myBabelPlugin() {
    return {
        visitor: {
            Identifier(path) {
                const name = path.node.name;

                console.log('Identifier() name: ', name)
            }
        }
    }
}

// npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-transform-strict-mode