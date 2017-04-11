module.exports = {
  // paths: {
  //   public: 'static',
  //   watched: [
  //     'app',
  //     'assets',
  //     'styles',
  //     'vendor',
  //   ]
  // },
  files: {
    javascripts: {
      joinTo: {
        'js/full.js': /^app(\/|\\)js/,
        'js/vendor.js': /^(vendor|bower_components)/,
        'test/js/test.js': /^test(\/|\\)(?!vendor)/,
        'test/js/test-vendor.js': /^test(\/|\\)(?=vendor)/
      }
    },
    stylesheets: {
      joinTo: {
        'css/cx.css': /^app/,
        'css/vendor.css': /^(vendor|bower_components)/
      }
    },
    templates: {joinTo: 'full.js'}
  },
  paths: {
    public: '../static'
  }
}
