//去除console.log
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      // 按需加载core-js的polyfill
      { useBuiltIns: 'usage', corejs: { version: '3', proposals: true } }
    ]
  ],
  // 发布产品时候的插件数组
  plugins: [
    '@babel/plugin-proposal-optional-chaining', // 可选链
    '@babel/plugin-proposal-nullish-coalescing-operator', //双问号
    ...prodPlugins
  ]
}
