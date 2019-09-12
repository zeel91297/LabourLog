var path = require('path')
module.exports = [

  {
    devServer: {
      historyApiFallback: true, // is it enabled ?
      inline: true
    },
    entry: {
      'clients': './src/components/Clients.vue',
      'sources': './src/components/Sources.vue',
      'workforces': './src/components/Workforces.vue',
      'invoiceDateSelect': './src/components/ClientInvoiceDateSelect.vue',
      'ClientInvoice': './src/components/ClientInvoice.vue'
    },
    output: {
      /* filename: './app/bundle/[name].js' */
      path: path.resolve(__dirname, './dist'),
      // path: path.resolve(__dirname, './src/dist'),
      // publicPath: './dist/',
      publicPath: '/',
      filename: 'build.js'
    },
    module: {
      loaders: [
        { test: /\.vue$/, loader: 'vue' }
      ]
    }
  }

]
