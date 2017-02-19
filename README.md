npm i, node_modules\.bin\babel src -d lib, ezutan a lib mappaban ott vannak a compileolt fajlok, az index.html futtathato

browserify src/poker.js -o dist/bundle.js -t [ babelify --presets [ es2015 ] ]