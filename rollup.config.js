import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
// import includePaths from 'rollup-plugin-includepaths';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';

var includePathOptions = {
  paths: ['myES6', 'node_modules']
};

export default {
    entry: 'src/scripts/main.js',
    format: 'iife',
    moduleName: 'gossamer',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        string({
            // Required to be specified
            include: '**/*.shader',
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        })
    ],
    format: 'iife',
    dest: 'dist/main.min.js'
};
