module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [
      'src/test/setupTests.js',
      'src/**/*.test.jsx',
      'src/**/*.test.js'
    ],
    preprocessors: {
      'src/test/setupTests.js': ['webpack'],
      'src/**/*.test.jsx': ['webpack'],
      'src/**/*.test.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '120' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                plugins: [
                  ['istanbul', { exclude: ['**/*.test.jsx', '**/*.test.js', '**/test/**'] }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    singleRun: true,
    concurrency: Infinity
  })
}
