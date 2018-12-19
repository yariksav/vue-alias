// rollup.config.js
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify-es';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/vue-alias.js',
  output: {
    name: 'VueAlias',
    exports: 'named',
  },
  plugins: [
    buble({
      objectAssign: 'Object.assign'
    }),
  ],
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
