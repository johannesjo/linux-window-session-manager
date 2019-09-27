import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: './src/index.ts',
  plugins: [
    globals(),
    // builtins({crypto: false}),
    typescript(),
    // resolve(),
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ]
}
