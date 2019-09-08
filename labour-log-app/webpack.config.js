var path = require('path')
module.exports = [

  {
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
      publicPath: './dist/',
      filename: 'build.js'
    },
    module: {
      loaders: [
        { test: /\.vue$/, loader: 'vue' }
      ]
    }
  }

]
