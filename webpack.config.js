import pkg from './package.json' with { type: 'json' }
import jsconfig from './jsconfig.json' with { type: 'json' }
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { EsbuildPlugin } from 'esbuild-loader'
import { resolve } from 'path'

/** @type {Record<string, 'none' | 'development' | 'production'>} */
const modes = {
  none: 'none',
  development: 'development',
  production: 'production',
}

const env = process.env.NODE_ENV || modes.production
const mode = env.toLowerCase() === modes.production ? modes.production : modes.development
const isProduction = mode === modes.production

const publicIndex = 'public/index.html'
const banner = `/**
 * ${pkg.name} v${pkg.version}
 * Copyright ©️ ${pkg.author}. All rights reserved.
 * Bundle built at ${new Date().toISOString()}
 */
`

/** @type {import('webpack').Configuration} */
export default {
  entry: [resolve('./src/index.jsx')],
  target: ['browserslist', 'web'],
  output: {
    path: resolve('./build'),
    pathinfo: isProduction,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    chunkFormat: 'array-push',
    chunkLoading: 'jsonp',
    chunkLoadingGlobal: `loadSiteChunk`,
    asyncChunks: true,
    charset: true,
    clean: true,
    assetModuleFilename: 'static/asset/[name].[hash:8][ext]',
  },
  mode,
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  bail: isProduction,
  plugins: [
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    new HtmlWebpackPlugin({
      inject: true,
      template: publicIndex,
      title: pkg.header.title,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: `${pkg.description} - ${pkg.header.headline}`,
        // image: pkg.,
        keywords: (pkg.keywords || []).join(', '),
        'og:title': pkg.header.title,
        'og:description': `${pkg.description} - ${pkg.header.headline}`,
        'og:type': 'website',
        'og:url': pkg.homepage,
        'twitter:card': 'summary',
        'twitter:creator': `@${pkg.socials.twitter}`,
        'twitter:title': pkg.header.title,
        'twitter:description': pkg.description,
        // 'twitter:image': pkg.
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          /** @type {(resourcePath: string) => Promise<boolean>} */
          filter: async (resourcePath) => !resourcePath.endsWith(publicIndex),
        },
      ],
    }),
    isProduction &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../reports/bundle.html',
        generateStatsFile: false,
        openAnalyzer: false,
      }),
  ].filter(Boolean),
  stats: isProduction ? 'normal' : 'minimal',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['src', 'node_modules'],
    fallback: {
      // assert: require.resolve('assert'),
      // buffer: require.resolve('buffer')
      // console: require.resolve('console-browserify'),
      // constants: require.resolve('constants-browserify'),
      // crypto: require.resolve('crypto-browserify'),
      // domain: require.resolve('domain-browser'),
      // events: require.resolve('events'),
      // http: require.resolve('stream-http'),
      // https: require.resolve('https-browserify'),
      // os: require.resolve('os-browserify/browser'),
      // path: require.resolve('path-browserify'),
      // punycode: require.resolve('punycode'),
      // process: require.resolve('process/browser'),
      // querystring: require.resolve('querystring-es3'),
      // stream: require.resolve('stream-browserify'),
      // string_decoder: require.resolve('string_decoder'),
      // sys: require.resolve('util'),
      // timers: require.resolve('timers-browserify'),
      // tty: require.resolve('tty-browserify'),
      // url: require.resolve('url'),
      // util: require.resolve('util'),
      // vm: require.resolve('vm-browserify'),
      // zlib: require.resolve('browserify-zlib'),
    },
    alias: {
      'site-config': resolve('./package.json'),
    },
  },
  module: {
    rules: [
      // Functionality
      {
        test: /\.jsx?$/i,
        loader: 'esbuild-loader',
        options: {
          target: jsconfig.compilerOptions.target,
          jsx: 'automatic',
        },
      },
      // Styling
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0,
              modules: {
                auto: true,
                localIdentName: isProduction ? '[hash:base64]' : '[path][name]__[local]',
                namedExport: false,
              },
            },
          },
        ],
      },
      // Data
      {
        test: /\.json5?$/i,
        loader: 'json5-loader',
        options: {
          esModule: false,
        },
        type: 'javascript/auto',
      },
      // Assets
      {
        // Inline if not production, otherwise treat as externalised resources
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: isProduction ? 'asset/resource' : 'asset/inline',
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    static: {
      directory: 'public',
    },
    port: 3000,
    compress: true,
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
      progress: true,
    },
    historyApiFallback: true,
    hot: !isProduction,
  },
  optimization: {
    usedExports: isProduction,
    minimize: isProduction,
    minimizer: [
      new EsbuildPlugin({
        target: jsconfig.compilerOptions.target,
        css: true,
        banner,
      }),
    ],
    removeAvailableModules: isProduction,
    removeEmptyChunks: isProduction,
    moduleIds: 'deterministic',

    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/].*[\\/]/,
      //     name: 'vendor',
      //     priority: -10,
      //     reuseExistingChunk: true,
      //   },
      //   default: {
      //     minChunks: 1,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
    runtimeChunk: true,
  },
}
