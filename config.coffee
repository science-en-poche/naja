fs      = require 'fs'

mode = process.env['MODE'] or 'dev'

exports.config =
  # See http://brunch.io/#documentation for documentation.
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/

      order:
        before: [
          'vendor/scripts/console-polyfill.js'
          'vendor/scripts/jquery-2.0.3.js'
          'vendor/scripts/handlebars-1.0.0.js'
          'vendor/scripts/ember-1.0.0.js'
          'vendor/scripts/ember-data-1.0.0-beta.3-60-geac9a74.js'
          'vendor/scripts/bootstrap-3.0.0.js'
          ]
        after: [
          'vendor/scripts/ember-bootstrap-0.0.3.js'
          'vendor/scripts/crypto-js-3.1.2/rollups/sha256.js'
          'vendor/scripts/crypto-js-3.1.2/components/enc-base64-min.js'
          'vendor/scripts/persona.js'
          'vendor/scripts/moment-with-langs-2.3.1.js'
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
      order:
        before: ['vendor/styles/normalize-2.1.3.css']

    templates:
      # for smaller builds, disable the pre-compilation of tempaltes
      precompile: true
      root: 'templates'
      joinTo: 'javascripts/app.js' : /^app/

      modules:
        addSourceURLs: true

  # CoffeeScript easy-debugging | don't forget to remove for production release
  sourceMaps: true

  # keyword-brunch plugin
  keyword:
    map:
      mode: mode
