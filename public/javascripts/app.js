(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, SessionController, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  routes = require('routes');

  SessionController = require('controllers/session_controller');

  HeaderController = require('controllers/header_controller');

  Layout = require('views/layout');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Naja';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher();
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      new SessionController();
      return new HeaderController();
    };

    Application.prototype.initMediator = function() {
      mediator.user = null;
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
}});

window.require.define({"config": function(exports, require, module) {
  var config, production;

  config = {
    api: {}
  };

  production = false;

  config.api.root = production ? 'http://api.naja.cc' : 'http://dev.naja.cc:3000';

  config.api.versionRoot = config.api.root + '/v1';

  module.exports = config;
  
}});

window.require.define({"controllers/base/controller": function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
}});

window.require.define({"controllers/header_controller": function(exports, require, module) {
  var Controller, Header, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      this.model = new Header();
      return this.view = new HeaderView({
        model: this.model
      });
    };

    return HeaderController;

  })(Controller);
  
}});

window.require.define({"controllers/home_controller": function(exports, require, module) {
  var Controller, HomeController, HomePageView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/home_page_view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.historyURL = 'home';

    HomeController.prototype.index = function() {
      return this.view = new HomePageView();
    };

    return HomeController;

  })(Controller);
  
}});

window.require.define({"controllers/session_controller": function(exports, require, module) {
  var Controller, Facebook, LoginView, Ostio, SessionController, Twitter, User, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Controller = require('controllers/base/controller');

  User = require('models/user');

  LoginView = require('views/login_view');

  Twitter = require('lib/services/twitter');

  Facebook = require('lib/services/facebook');

  Ostio = require('lib/services/ostio');

  module.exports = SessionController = (function(_super) {

    __extends(SessionController, _super);

    function SessionController() {
      this.logout = __bind(this.logout, this);

      this.serviceProviderSession = __bind(this.serviceProviderSession, this);

      this.triggerLogin = __bind(this.triggerLogin, this);
      return SessionController.__super__.constructor.apply(this, arguments);
    }

    SessionController.serviceProviders = {
      ostio: new Ostio()
    };

    SessionController.prototype.loginStatusDetermined = false;

    SessionController.prototype.loginView = null;

    SessionController.prototype.serviceProviderName = null;

    SessionController.prototype.initialize = function() {
      this.subscribeEvent('serviceProviderSession', this.serviceProviderSession);
      this.subscribeEvent('logout', this.logout);
      this.subscribeEvent('userData', this.userData);
      this.subscribeEvent('!showLogin', this.showLoginView);
      this.subscribeEvent('!login', this.triggerLogin);
      this.subscribeEvent('!logout', this.triggerLogout);
      return this.getSession();
    };

    SessionController.prototype.loadServiceProviders = function() {
      var name, serviceProvider, _ref, _results;
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.load());
      }
      return _results;
    };

    SessionController.prototype.createUser = function(userData) {
      return mediator.user = new User(userData);
    };

    SessionController.prototype.getSession = function() {
      var name, serviceProvider, _ref, _results;
      this.loadServiceProviders();
      _ref = SessionController.serviceProviders;
      _results = [];
      for (name in _ref) {
        serviceProvider = _ref[name];
        _results.push(serviceProvider.done(serviceProvider.getLoginStatus));
      }
      return _results;
    };

    SessionController.prototype.showLoginView = function() {
      if (this.loginView) {
        return;
      }
      this.loadServiceProviders();
      return this.loginView = new LoginView({
        serviceProviders: SessionController.serviceProviders
      });
    };

    SessionController.prototype.triggerLogin = function(serviceProviderName) {
      var serviceProvider;
      serviceProvider = SessionController.serviceProviders[serviceProviderName];
      if (!serviceProvider.isLoaded()) {
        this.publishEvent('serviceProviderMissing', serviceProviderName);
        return;
      }
      this.publishEvent('loginAttempt', serviceProviderName);
      return serviceProvider.triggerLogin();
    };

    SessionController.prototype.serviceProviderSession = function(session) {
      this.serviceProviderName = session.provider.name;
      this.disposeLoginView();
      session.id = session.userId;
      delete session.userId;
      this.createUser(session);
      return this.publishLogin();
    };

    SessionController.prototype.publishLogin = function() {
      this.loginStatusDetermined = true;
      this.publishEvent('login', mediator.user);
      return this.publishEvent('loginStatus', true);
    };

    SessionController.prototype.triggerLogout = function() {
      return this.publishEvent('logout');
    };

    SessionController.prototype.logout = function() {
      this.loginStatusDetermined = true;
      this.disposeUser();
      this.serviceProviderName = null;
      this.showLoginView();
      return this.publishEvent('loginStatus', false);
    };

    SessionController.prototype.userData = function(data) {
      return mediator.user.set(data);
    };

    SessionController.prototype.disposeLoginView = function() {
      if (!this.loginView) {
        return;
      }
      this.loginView.dispose();
      return this.loginView = null;
    };

    SessionController.prototype.disposeUser = function() {
      if (!mediator.user) {
        return;
      }
      mediator.user.dispose();
      return mediator.user = null;
    };

    return SessionController;

  })(Controller);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var Application;

  Application = require('application');

  $(document).on('ready', function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
}});

window.require.define({"lib/services/facebook": function(exports, require, module) {
  var Facebook, ServiceProvider, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('lib/utils');

  ServiceProvider = require('lib/services/service_provider');

  Facebook = (function(_super) {
    var facebookAppId, scope;

    __extends(Facebook, _super);

    facebookAppId = '115149731946795';

    scope = 'user_likes';

    Facebook.prototype.name = 'facebook';

    Facebook.prototype.status = null;

    Facebook.prototype.accessToken = null;

    function Facebook() {
      this.processUserData = __bind(this.processUserData, this);

      this.facebookLogout = __bind(this.facebookLogout, this);

      this.loginStatusAfterAbort = __bind(this.loginStatusAfterAbort, this);

      this.loginHandler = __bind(this.loginHandler, this);

      this.triggerLogin = __bind(this.triggerLogin, this);

      this.loginStatusHandler = __bind(this.loginStatusHandler, this);

      this.getLoginStatus = __bind(this.getLoginStatus, this);

      this.saveAuthResponse = __bind(this.saveAuthResponse, this);

      this.loadHandler = __bind(this.loadHandler, this);
      Facebook.__super__.constructor.apply(this, arguments);
      utils.deferMethods({
        deferred: this,
        methods: ['parse', 'subscribe', 'postToGraph', 'getAccumulatedInfo', 'getInfo'],
        onDeferral: this.load
      });
      utils.wrapAccumulators(this, ['getAccumulatedInfo']);
      this.subscribeEvent('logout', this.logout);
    }

    Facebook.prototype.load = function() {
      if (this.state() === 'resolved' || this.loading) {
        return;
      }
      this.loading = true;
      window.fbAsyncInit = this.loadHandler;
      return utils.loadLib('http://connect.facebook.net/en_US/all.js', null, this.reject);
    };

    Facebook.prototype.loadHandler = function() {
      this.loading = false;
      try {
        delete window.fbAsyncInit;
      } catch (error) {
        window.fbAsyncInit = void 0;
      }
      FB.init({
        appId: facebookAppId,
        status: true,
        cookie: true,
        xfbml: false
      });
      this.registerHandlers();
      return this.resolve();
    };

    Facebook.prototype.registerHandlers = function() {
      this.subscribe('auth.logout', this.facebookLogout);
      this.subscribe('edge.create', this.processLike);
      return this.subscribe('comment.create', this.processComment);
    };

    Facebook.prototype.unregisterHandlers = function() {
      this.unsubscribe('auth.logout', this.facebookLogout);
      this.unsubscribe('edge.create', this.processLike);
      return this.unsubscribe('comment.create', this.processComment);
    };

    Facebook.prototype.isLoaded = function() {
      return Boolean(window.FB && FB.login);
    };

    Facebook.prototype.saveAuthResponse = function(response) {
      var authResponse;
      this.status = response.status;
      authResponse = response.authResponse;
      if (authResponse) {
        return this.accessToken = authResponse.accessToken;
      } else {
        return this.accessToken = null;
      }
    };

    Facebook.prototype.getLoginStatus = function(callback, force) {
      if (callback == null) {
        callback = this.loginStatusHandler;
      }
      if (force == null) {
        force = false;
      }
      return FB.getLoginStatus(callback, force);
    };

    Facebook.prototype.loginStatusHandler = function(response) {
      var authResponse;
      this.saveAuthResponse(response);
      authResponse = response.authResponse;
      if (authResponse) {
        this.publishSession(authResponse);
        return this.getUserData();
      } else {
        return this.publishEvent('logout');
      }
    };

    Facebook.prototype.triggerLogin = function(loginContext) {
      return FB.login(_(this.loginHandler).bind(this, loginContext), {
        scope: scope
      });
    };

    Facebook.prototype.loginHandler = function(loginContext, response) {
      var authResponse, eventPayload, loginStatusHandler;
      this.saveAuthResponse(response);
      authResponse = response.authResponse;
      eventPayload = {
        provider: this,
        loginContext: loginContext
      };
      if (authResponse) {
        this.publishEvent('loginSuccessful', eventPayload);
        this.publishSession(authResponse);
        return this.getUserData();
      } else {
        this.publishEvent('loginAbort', eventPayload);
        loginStatusHandler = _(this.loginStatusAfterAbort).bind(this, loginContext);
        return this.getLoginStatus(loginStatusHandler, true);
      }
    };

    Facebook.prototype.loginStatusAfterAbort = function(loginContext, response) {
      var authResponse, eventPayload;
      this.saveAuthResponse(response);
      authResponse = response.authResponse;
      eventPayload = {
        provider: this,
        loginContext: loginContext
      };
      if (authResponse) {
        this.publishEvent('loginSuccessful', eventPayload);
        return this.publishSession(authResponse);
      } else {
        return this.publishEvent('loginFail', eventPayload);
      }
    };

    Facebook.prototype.publishSession = function(authResponse) {
      return this.publishEvent('serviceProviderSession', {
        provider: this,
        userId: authResponse.userID,
        accessToken: authResponse.accessToken
      });
    };

    Facebook.prototype.facebookLogout = function(response) {
      return this.saveAuthResponse(response);
    };

    Facebook.prototype.logout = function() {
      return this.status = this.accessToken = null;
    };

    Facebook.prototype.processLike = function(url) {
      return this.publishEvent('facebook:like', url);
    };

    Facebook.prototype.processComment = function(comment) {
      return this.publishEvent('facebook:comment', comment.href);
    };

    Facebook.prototype.parse = function(el) {
      return FB.XFBML.parse(el);
    };

    Facebook.prototype.subscribe = function(eventType, handler) {
      return FB.Event.subscribe(eventType, handler);
    };

    Facebook.prototype.unsubscribe = function(eventType, handler) {
      return FB.Event.unsubscribe(eventType, handler);
    };

    Facebook.prototype.postToGraph = function(ogResource, data, callback) {
      return FB.api(ogResource, 'post', data, function(response) {
        if (callback) {
          return callback(response);
        }
      });
    };

    Facebook.prototype.getAccumulatedInfo = function(urls, callback) {
      if (typeof urls === 'string') {
        urls = [urls];
      }
      urls = _(urls).reduce(function(memo, url) {
        if (memo) {
          memo += ',';
        }
        return memo += encodeURIComponent(url);
      }, '');
      return FB.api("?ids=" + urls, callback);
    };

    Facebook.prototype.getInfo = function(id, callback) {
      return FB.api(id, callback);
    };

    Facebook.prototype.getUserData = function() {
      return this.getInfo('/me', this.processUserData);
    };

    Facebook.prototype.processUserData = function(response) {
      return this.publishEvent('userData', response);
    };

    Facebook.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.unregisterHandlers();
      delete this.status;
      delete this.accessToken;
      return Facebook.__super__.dispose.apply(this, arguments);
    };

    return Facebook;

  })(ServiceProvider);
  
}});

window.require.define({"lib/services/google": function(exports, require, module) {
  var Google, ServiceProvider, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('lib/utils');

  ServiceProvider = require('lib/services/service_provider');

  Google = (function(_super) {
    var clientId, scopes;

    __extends(Google, _super);

    function Google() {
      this.loadHandler = __bind(this.loadHandler, this);
      return Google.__super__.constructor.apply(this, arguments);
    }

    clientId = '365800635017.apps.googleusercontent.com';

    scopes = 'https://www.googleapis.com/auth/userinfo.profile';

    Google.prototype.name = 'google';

    Google.prototype.load = function() {
      if (this.state() === 'resolved' || this.loading) {
        return;
      }
      this.loading = true;
      window.googleClientLoaded = this.loadHandler;
      return utils.loadLib('https://apis.google.com/js/client.js?onload=googleClientLoaded', null, this.reject);
    };

    Google.prototype.loadHandler = function() {
      try {
        delete window.googleClientLoaded;
      } catch (error) {
        window.googleClientLoaded = void 0;
      }
      return gapi.auth.init(this.resolve);
    };

    Google.prototype.isLoaded = function() {
      return Boolean(window.gapi && gapi.auth && gapi.auth.authorize);
    };

    Google.prototype.triggerLogin = function(loginContext) {
      return gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
      }, _(this.loginHandler).bind(this, loginContext));
    };

    Google.prototype.loginHandler = function(loginContext, authResponse) {
      if (authResponse) {
        this.publishEvent('loginSuccessful', {
          provider: this,
          loginContext: loginContext
        });
        return this.publishEvent('serviceProviderSession', {
          provider: this,
          accessToken: authResponse.access_token
        });
      } else {
        return this.publishEvent('loginFail', {
          provider: this,
          loginContext: loginContext
        });
      }
    };

    Google.prototype.getLoginStatus = function(callback) {
      return gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
      }, callback);
    };

    Google.prototype.getUserInfo = function(callback) {
      var request;
      request = gapi.client.request({
        path: '/oauth2/v2/userinfo'
      });
      return request.execute(callback);
    };

    Google.prototype.parsePlusOneButton = function(el) {
      if (window.gapi && gapi.plusone && gapi.plusone.go) {
        return gapi.plusone.go(el);
      } else {
        window.___gcfg = {
          parsetags: 'explicit'
        };
        return utils.loadLib('https://apis.google.com/js/plusone.js', function() {
          try {
            delete window.___gcfg;
          } catch (error) {
            window.___gcfg = void 0;
          }
          return gapi.plusone.go(el);
        });
      }
    };

    return Google;

  })(ServiceProvider);
  
}});

window.require.define({"lib/services/ostio": function(exports, require, module) {
  var Ostio, ServiceProvider, User, config, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  config = require('config');

  mediator = require('mediator');

  ServiceProvider = require('lib/services/service_provider');

  User = require('models/user');

  module.exports = Ostio = (function(_super) {

    __extends(Ostio, _super);

    Ostio.prototype.baseUrl = config.api.root;

    function Ostio() {
      this.loginStatusHandler = __bind(this.loginStatusHandler, this);

      this.loginHandler = __bind(this.loginHandler, this);

      var authCallback;
      Ostio.__super__.constructor.apply(this, arguments);
      this.accessToken = localStorage.getItem('accessToken');
      authCallback = _(this.loginHandler).bind(this, this.loginHandler);
      mediator.subscribe('auth:callback:ostio', authCallback);
    }

    Ostio.prototype.load = function() {
      this.resolve();
      return this;
    };

    Ostio.prototype.isLoaded = function() {
      return true;
    };

    Ostio.prototype.ajax = function(type, url, data) {
      url = this.baseUrl + url;
      if (this.accessToken) {
        url += "?access_token=" + this.accessToken;
      }
      return $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: 'json'
      });
    };

    Ostio.prototype.triggerLogin = function(loginContext) {
      var callback;
      callback = _(this.loginHandler).bind(this, this.loginHandler);
      return window.location = URL;
    };

    Ostio.prototype.loginHandler = function(loginContext, response) {
      if (response) {
        this.publishEvent('loginSuccessful', {
          provider: this,
          loginContext: loginContext
        });
        this.accessToken = response.accessToken;
        localStorage.setItem('accessToken', this.accessToken);
        return this.getUserData().done(this.processUserData);
      } else {
        return this.publishEvent('loginFail', {
          provider: this,
          loginContext: loginContext
        });
      }
    };

    Ostio.prototype.getUserData = function() {
      return this.ajax('get', '/v1/users/me');
    };

    Ostio.prototype.processUserData = function(response) {
      return this.publishEvent('userData', response);
    };

    Ostio.prototype.getLoginStatus = function(callback, force) {
      if (callback == null) {
        callback = this.loginStatusHandler;
      }
      if (force == null) {
        force = false;
      }
      return this.getUserData().always(callback);
    };

    Ostio.prototype.loginStatusHandler = function(response, status) {
      var parsed;
      if (!response || status === 'error') {
        return this.publishEvent('logout');
      } else {
        parsed = User.prototype.parse.call(null, response);
        return this.publishEvent('serviceProviderSession', _.extend(parsed, {
          provider: this,
          userId: response.id,
          accessToken: this.accessToken
        }));
      }
    };

    return Ostio;

  })(ServiceProvider);
  
}});

window.require.define({"lib/services/service_provider": function(exports, require, module) {
  var Chaplin, ServiceProvider, utils;

  utils = require('lib/utils');

  Chaplin = require('chaplin');

  module.exports = ServiceProvider = (function() {

    _(ServiceProvider.prototype).extend(Chaplin.EventBroker);

    ServiceProvider.prototype.loading = false;

    function ServiceProvider() {
      _(this).extend($.Deferred());
      utils.deferMethods({
        deferred: this,
        methods: ['triggerLogin', 'getLoginStatus'],
        onDeferral: this.load
      });
    }

    ServiceProvider.prototype.disposed = false;

    ServiceProvider.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.unsubscribeAllEvents();
      this.disposed = true;
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    return ServiceProvider;

  })();

  /*

    Standard methods and their signatures:

    load: ->
      # Load a script like this:
      utils.loadLib 'http://example.org/foo.js', @loadHandler, @reject

    loadHandler: =>
      # Init the library, then resolve
      ServiceProviderLibrary.init(foo: 'bar')
      @resolve()

    isLoaded: ->
      # Return a Boolean
      Boolean window.ServiceProviderLibrary and ServiceProviderLibrary.login

    # Trigger login popup
    triggerLogin: (loginContext) ->
      callback = _(@loginHandler).bind(this, loginContext)
      ServiceProviderLibrary.login callback

    # Callback for the login popup
    loginHandler: (loginContext, response) =>

      eventPayload = {provider: this, loginContext}
      if response
        # Publish successful login
        @publishEvent 'loginSuccessful', eventPayload

        # Publish the session
        @publishEvent 'serviceProviderSession',
          provider: this
          userId: response.userId
          accessToken: response.accessToken
          # etc.

      else
        @publishEvent 'loginFail', eventPayload

    getLoginStatus: (callback = @loginStatusHandler, force = false) ->
      ServiceProviderLibrary.getLoginStatus callback, force

    loginStatusHandler: (response) =>
      return unless response
      @publishEvent 'serviceProviderSession',
        provider: this
        userId: response.userId
        accessToken: response.accessToken
        # etc.
  */

  
}});

window.require.define({"lib/services/twitter": function(exports, require, module) {
  var ServiceProvider, Twitter, mediator, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  utils = require('lib/utils');

  ServiceProvider = require('lib/services/service_provider');

  Twitter = (function(_super) {
    var consumerKey;

    __extends(Twitter, _super);

    consumerKey = 'w0uohox91TgpKETJmscYIQ';

    Twitter.prototype.name = 'twitter';

    function Twitter() {
      this.loginStatusHandler = __bind(this.loginStatusHandler, this);

      this.loginHandler = __bind(this.loginHandler, this);

      this.sdkLoadHandler = __bind(this.sdkLoadHandler, this);
      Twitter.__super__.constructor.apply(this, arguments);
      this.subscribeEvent('!logout', this.logout);
    }

    Twitter.prototype.loadSDK = function() {
      if (this.state() === 'resolved' || this.loading) {
        return;
      }
      this.loading = true;
      return utils.loadLib("http://platform.twitter.com/anywhere.js?id=" + consumerKey + "&v=1", this.sdkLoadHandler, this.reject);
    };

    Twitter.prototype.sdkLoadHandler = function() {
      var _this = this;
      this.loading = false;
      return twttr.anywhere(function(T) {
        _this.publishEvent('sdkLoaded');
        _this.T = T;
        return _this.resolve();
      });
    };

    Twitter.prototype.isLoaded = function() {
      return Boolean(window.twttr);
    };

    Twitter.prototype.publish = function(event, callback) {
      return this.T.trigger(event, callback);
    };

    Twitter.prototype.subscribe = function(event, callback) {
      return this.T.bind(event, callback);
    };

    Twitter.prototype.unsubscribe = function(event) {
      return this.T.unbind(event);
    };

    Twitter.prototype.triggerLogin = function(loginContext) {
      var callback;
      callback = _(this.loginHandler).bind(this, loginContext);
      this.T.signIn();
      this.subscribe('authComplete', function(event, currentUser, accessToken) {
        return callback({
          currentUser: currentUser,
          accessToken: accessToken
        });
      });
      return this.subscribe('signOut', function() {
        return callback();
      });
    };

    Twitter.prototype.publishSession = function(response) {
      var user;
      user = response.currentUser;
      this.publishEvent('serviceProviderSession', {
        provider: this,
        userId: user.id,
        accessToken: response.accessToken || twttr.anywhere.token
      });
      return this.publishEvent('userData', user.attributes);
    };

    Twitter.prototype.loginHandler = function(loginContext, response) {
      if (response) {
        this.publishEvent('loginSuccessful', {
          provider: this,
          loginContext: loginContext
        });
        return this.publishSession(response);
      } else {
        return this.publishEvent('loginFail', {
          provider: this,
          loginContext: loginContext
        });
      }
    };

    Twitter.prototype.getLoginStatus = function(callback, force) {
      if (callback == null) {
        callback = this.loginStatusHandler;
      }
      if (force == null) {
        force = false;
      }
      return callback(this.T);
    };

    Twitter.prototype.loginStatusHandler = function(response) {
      if (response.currentUser) {
        return this.publishSession(response);
      } else {
        return this.publishEvent('logout');
      }
    };

    Twitter.prototype.logout = function() {
      var _ref;
      return typeof twttr !== "undefined" && twttr !== null ? (_ref = twttr.anywhere) != null ? typeof _ref.signOut === "function" ? _ref.signOut() : void 0 : void 0 : void 0;
    };

    return Twitter;

  })(ServiceProvider);
  
}});

window.require.define({"lib/support": function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
}});

window.require.define({"lib/utils": function(exports, require, module) {
  var Chaplin, utils,
    __hasProp = {}.hasOwnProperty;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  _(utils).extend({
    loadLib: function(url, success, error, timeout) {
      var head, onload, script, timeoutHandle;
      if (timeout == null) {
        timeout = 7500;
      }
      head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      script = document.createElement('script');
      script.async = 'async';
      script.src = url;
      onload = function(_, aborted) {
        if (aborted == null) {
          aborted = false;
        }
        if (!(aborted || !script.readyState || script.readyState === 'complete')) {
          return;
        }
        clearTimeout(timeoutHandle);
        script.onload = script.onreadystatechange = script.onerror = null;
        if (head && script.parentNode) {
          head.removeChild(script);
        }
        script = void 0;
        if (success && !aborted) {
          return success();
        }
      };
      script.onload = script.onreadystatechange = onload;
      script.onerror = function() {
        onload(null, true);
        if (error) {
          return error();
        }
      };
      timeoutHandle = setTimeout(script.onerror, timeout);
      return head.insertBefore(script, head.firstChild);
    },
    /*
      Wrap methods so they can be called before a deferred is resolved.
      The actual methods are called once the deferred is resolved.
    
      Parameters:
    
      Expects an options hash with the following properties:
    
      deferred
        The Deferred object to wait for.
    
      methods
        Either:
        - A string with a method name e.g. 'method'
        - An array of strings e.g. ['method1', 'method2']
        - An object with methods e.g. {method: -> alert('resolved!')}
    
      host (optional)
        If you pass an array of strings in the `methods` parameter the methods
        are fetched from this object. Defaults to `deferred`.
    
      target (optional)
        The target object the new wrapper methods are created at.
        Defaults to host if host is given, otherwise it defaults to deferred.
    
      onDeferral (optional)
        An additional callback function which is invoked when the method is called
        and the Deferred isn't resolved yet.
        After the method is registered as a done handler on the Deferred,
        this callback is invoked. This can be used to trigger the resolving
        of the Deferred.
    
      Examples:
    
      deferMethods(deferred: def, methods: 'foo')
        Wrap the method named foo of the given deferred def and
        postpone all calls until the deferred is resolved.
    
      deferMethods(deferred: def, methods: def.specialMethods)
        Read all methods from the hash def.specialMethods and
        create wrapped methods with the same names at def.
    
      deferMethods(
        deferred: def, methods: def.specialMethods, target: def.specialMethods
      )
        Read all methods from the object def.specialMethods and
        create wrapped methods at def.specialMethods,
        overwriting the existing ones.
    
      deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
        Wrap the methods obj.foo and obj.bar so all calls to them are postponed
        until def is resolved. obj.foo and obj.bar are overwritten
        with their wrappers.
    */

    deferMethods: function(options) {
      var deferred, func, host, methods, methodsHash, name, onDeferral, target, _i, _len, _results;
      deferred = options.deferred;
      methods = options.methods;
      host = options.host || deferred;
      target = options.target || host;
      onDeferral = options.onDeferral;
      methodsHash = {};
      if (typeof methods === 'string') {
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        for (_i = 0, _len = methods.length; _i < _len; _i++) {
          name = methods[_i];
          func = host[name];
          if (typeof func !== 'function') {
            throw new TypeError("utils.deferMethods: method " + name + " notfound on host " + host);
          }
          methodsHash[name] = func;
        }
      } else {
        methodsHash = methods;
      }
      _results = [];
      for (name in methodsHash) {
        if (!__hasProp.call(methodsHash, name)) continue;
        func = methodsHash[name];
        if (typeof func !== 'function') {
          continue;
        }
        _results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
      }
      return _results;
    },
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (context == null) {
        context = deferred;
      }
      return function() {
        var args;
        args = arguments;
        if (deferred.state() === 'resolved') {
          return func.apply(context, args);
        } else {
          deferred.done(function() {
            return func.apply(context, args);
          });
          if (typeof onDeferral === 'function') {
            return onDeferral.apply(context);
          }
        }
      };
    }
  });

  module.exports = utils;
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  var config, mediator, utils;

  config = require('config');

  mediator = require('mediator');

  utils = require('chaplin/lib/utils');

  Handlebars.registerHelper('if_logged_in', function(options) {
    if (mediator.user) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('with_config', function(options) {
    var context;
    context = config;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('with_user', function(options) {
    var context;
    context = mediator.user || {};
    return Handlebars.helpers["with"].call(this, context, options);
  });
  
}});

window.require.define({"mediator": function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
}});

window.require.define({"models/base/collection": function(exports, require, module) {
  var Chaplin, Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/model": function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
}});

window.require.define({"models/header": function(exports, require, module) {
  var Header, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Header = (function(_super) {

    __extends(Header, _super);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    return Header;

  })(Model);
  
}});

window.require.define({"models/user": function(exports, require, module) {
  var Model, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    return User;

  })(Model);
  
}});

window.require.define({"routes": function(exports, require, module) {
  
  module.exports = function(match) {
    return match('', 'home#index');
  };
  
}});

window.require.define({"views/base/collection_view": function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/base/page_view": function(exports, require, module) {
  var PageView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  module.exports = PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.container = '#page-container';

    PageView.prototype.autoRender = true;

    PageView.prototype.renderedSubviews = false;

    PageView.prototype.initialize = function() {
      var rendered,
        _this = this;
      PageView.__super__.initialize.apply(this, arguments);
      if (this.model || this.collection) {
        rendered = false;
        return this.modelBind('change', function() {
          if (!rendered) {
            _this.render();
          }
          return rendered = true;
        });
      }
    };

    PageView.prototype.renderSubviews = function() {};

    PageView.prototype.render = function() {
      PageView.__super__.render.apply(this, arguments);
      if (!this.renderedSubviews) {
        this.renderSubviews();
        return this.renderedSubviews = true;
      }
    };

    return PageView;

  })(View);
  
}});

window.require.define({"views/base/view": function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
}});

window.require.define({"views/header_view": function(exports, require, module) {
  var HeaderView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.template = template;

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.initialize = function() {
      HeaderView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('loginStatus', this.render);
      return this.subscribeEvent('startupController', this.render);
    };

    return HeaderView;

  })(View);
  
}});

window.require.define({"views/home_page_view": function(exports, require, module) {
  var HomePageView, PageView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home_page');

  PageView = require('views/base/page_view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.template = template;

    HomePageView.prototype.className = 'home-page';

    return HomePageView;

  })(PageView);
  
}});

window.require.define({"views/layout": function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.initialize = function() {
      return Layout.__super__.initialize.apply(this, arguments);
    };

    return Layout;

  })(Chaplin.Layout);
  
}});

window.require.define({"views/login_view": function(exports, require, module) {
  var LoginView, View, template, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = require('lib/utils');

  View = require('views/base/view');

  template = require('views/templates/login');

  module.exports = LoginView = (function(_super) {

    __extends(LoginView, _super);

    function LoginView() {
      return LoginView.__super__.constructor.apply(this, arguments);
    }

    LoginView.prototype.template = template;

    LoginView.prototype.autoRender = true;

    LoginView.prototype.container = '#page-container';

    LoginView.prototype.id = 'login';

    LoginView.prototype.initialize = function(options) {
      LoginView.__super__.initialize.apply(this, arguments);
      return this.initButtons(options.serviceProviders);
    };

    LoginView.prototype.initButtons = function(serviceProviders) {
      var _this = this;
      return _.each(serviceProviders, function(serviceProvider, serviceProviderName) {
        var bind, buttonSelector;
        bind = function(fn) {
          return _(fn).bind(_this, serviceProviderName, serviceProvider);
        };
        buttonSelector = "." + serviceProviderName;
        _this.$(buttonSelector).addClass('service-loading');
        _this.delegate('click', buttonSelector, bind(_this.loginWith));
        serviceProvider.done(bind(_this.serviceProviderLoaded));
        return serviceProvider.fail(bind(_this.serviceProviderFailed));
      });
    };

    LoginView.prototype.loginWith = function(serviceProviderName, serviceProvider, event) {
      event.preventDefault();
      if (!serviceProvider.isLoaded()) {
        return;
      }
      this.publishEvent('login:pickService', serviceProviderName);
      return this.publishEvent('!login', serviceProviderName);
    };

    LoginView.prototype.serviceProviderLoaded = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading');
    };

    LoginView.prototype.serviceProviderFailed = function(serviceProviderName) {
      return this.$("." + serviceProviderName).removeClass('service-loading').addClass('service-unavailable').attr('disabled', true).attr('title', "Error connecting. Please check whether you areblocking " + (utils.upcase(serviceProviderName)) + ".");
    };

    return LoginView;

  })(View);
  
}});

window.require.define({"views/templates/header": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n\n          <div class=\"btn-group pull-right\">\n            <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n              <i class=\"icon-user\"></i> ";
    foundHelper = helpers.login;
    stack1 = foundHelper || depth0.login;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "login", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\n              <span class=\"caret\"></span>\n            </a>\n            <ul class=\"dropdown-menu\">\n              <li><a href=\"#\">Settings</a></li>\n              <li class=\"divider\"></li>\n              <li><a href=\"#\">Sign Out</a></li>\n            </ul>\n          </div>\n          <a class=\"btn pull-right\" href=\"#\"><i class=\"icon-home\"></i> Home</a>\n\n      ";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n        ";
    foundHelper = helpers.with_config;
    stack1 = foundHelper || depth0.with_config;
    tmp1 = self.program(4, program4, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n      ";
    return buffer;}
  function program4(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n\n          <button class=\"btn btn-primary pull-right go-to\" data-href=\"";
    foundHelper = helpers.api;
    stack1 = foundHelper || depth0.api;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.root);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "api.root", { hash: {} }); }
    buffer += escapeExpression(stack1) + "/auth/browserid\">Log in with BrowserID</button>\n\n        ";
    return buffer;}

    buffer += "<div class=\"navbar navbar-inverse navbar-fixed-top\">\n  <div class=\"navbar-inner\">\n    <div class=\"container\">\n\n      <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </a>\n\n      <a class=\"brand\" href=\"#\">Naja</a>\n\n      ";
    foundHelper = helpers.if_logged_in;
    stack1 = foundHelper || depth0.if_logged_in;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(3, program3, data);
    if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n      <div class=\"nav-collapse collapse\">\n        <ul class=\"nav\">\n          <li class=\"active\"><a href=\"#\">Home</a></li>\n          <li><a href=\"#\">About</a></li>\n          <li><a href=\"#\">Contact</a></li>\n        </ul>\n      </div>\n\n    </div>\n  </div>\n</div>\n";
    return buffer;});
}});

window.require.define({"views/templates/home_page": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"hero-unit\">\n  <h1>Cognitive Science. Through Smartphones.</h1>\n  <p>Ever thought you cognitive science experiments had a strong selection bias? Ever wanted to increase <em>N</em> above 50 or 100? Ever thought those experiments could be better fun? Dreamed about <em>in vivo</em> instead of <em>in vitro</em>?</p>\n  <p><a href=\"#\">Brainydroid</a> and <a href=\"#\">Naja</a> let you program awesome experiments for Android and collect humongous amounts of <em>in vivo</em> data.</p>\n  <p><a class=\"btn btn-primary btn-large\">Learn more &raquo;</a></p>\n</div>\n\n<div class=\"row\">\n  <div class=\"span4\">\n    <h2>In vivo</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div>\n\n  <div class=\"span4\">\n    <h2>Huge user base</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div>\n\n  <div class=\"span4\">\n    <h2>Clinical use</h2>\n    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div>\n</div>\n";});
}});

window.require.define({"views/templates/login": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", foundHelper, self=this;


    return buffer;});
}});

