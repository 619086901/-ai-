const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 打包目录
  publicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
  // 构建项目生成的目录 生产环境 和开发环境
  // 配置js、css静态资源二级目录的位置
  assetsDir: process.env.NODE_ENV === 'production' ? 'assets' : '',
  // 指定生成的 index.html 的输出路径
  // indexPath:
  //   process.env.NODE_ENV === 'production' ? 'page/index.html' : 'index.html',
  // 关闭语法编译警告
  lintOnSave: false,
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  devServer: {
    hot: true,
    open: true
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .exclude.add(resolve('src/assets/icons')) // 排除icons目录，这些图标已用 svg-sprite-loader 处理，打包成 svg-sprite 了
      .end()
      .use('url-loader')
      .tap((options) => ({
        limit: 10240, // 稍微改大了点
        fallback: {
          loader: require.resolve('file-loader'),
          options: {
            // 在这里修改file-loader的配置
            // 直接把outputPath的目录加上，虽然语义没分开清晰但比较简洁
            name: 'static/img/[name].[hash:8].[ext]',
            esModule: false //低版本默认为false，高版本默认为true 这里为6.2.0为高本版本所以要手动设置为false
          }
        }
      }))
      .end()
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 50 }, // 压缩JPEG图像
        optipng: { enabled: true }, // 压缩PNG图像
        pngquant: { quality: [0.5, 0.65], speed: 4 }, // 压缩PNG图像
        gifsicle: { interlaced: false } // 压缩GIF图像
      })
      .end()
      .enforce('post') // 表示先执行配置在下面那个loader，即image-webpack-loader
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production' ? 'index.html' : 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '首页'
    },
    answer: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production' ? 'answer.html' : 'answer.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '视频互动'
    },
    answerpro: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production'
          ? 'answerpro.html'
          : 'answerpro.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '基础练习'
    },
    answerall: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production'
          ? 'answerall.html'
          : 'answerall.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '进阶练习'
    },
    column: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production' ? 'column.html' : 'column.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '列表'
    },
    item: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production' ? 'item.html' : 'item.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '专题'
    },
    success: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production' ? 'success.html' : 'success.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '视频互动结算页'
    },
    successpro: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production'
          ? 'successpro.html'
          : 'successpro.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '进阶练习结算页'
    },
    order: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'production' ? 'order.html' : 'order.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '收银台订购页'
    }
  }
}
