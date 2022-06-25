export default {
  input: 'lib/index.js',
  output: {
    file: 'lib/index.umd.js',
    format: 'umd',
    name: 'KsComposable',
    globals: {
      vue: 'Vue',
      'vue-class-component': 'VueClassComponent',
    },
    exports: 'named',
  },
  external: ['vue', 'vue-class-component', 'reflect-metadata', '@vue/composition-api'],
  plugins: []
}
