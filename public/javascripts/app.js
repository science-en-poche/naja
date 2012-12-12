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

  config.api.root = production ? 'http://naja.cc/api' : 'http://naja.cc/api';

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
  var Controller, Header, HeaderController, HeaderView, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  Header = require('models/header');

  HeaderView = require('views/header_view');

  mediator = require('mediator');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      this.triggerLogout = __bind(this.triggerLogout, this);

      this.triggerLogin = __bind(this.triggerLogin, this);

      this.logoutDone = __bind(this.logoutDone, this);

      this.login = __bind(this.login, this);
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      this.model = new Header();
      this.view = new HeaderView({
        model: this.model
      });
      this.subscribeEvent('login', this.login);
      this.subscribeEvent('logoutDone', this.logoutDone);
      this.subscribeEvent('loginClicked', this.triggerLogin);
      return this.subscribeEvent('logoutClicked', this.triggerLogout);
    };

    HeaderController.prototype.login = function(user) {
      if (!user.get('name')) {
        alert('will redirect to settings');
        this.redirectTo('/settings/profile');
      }
      if (this.loginFromTriggered) {
        this.loginFromTriggered = false;
        this.publishEvent('loginReload', user);
        return window.location.reload();
      }
    };

    HeaderController.prototype.logoutDone = function() {
      if (this.logoutFromTriggered) {
        this.logoutFromTriggered = false;
        return window.location.reload();
      }
    };

    HeaderController.prototype.triggerLogin = function() {
      this.loginFromTriggered = true;
      return this.publishEvent('!login', 'browserid');
    };

    HeaderController.prototype.triggerLogout = function() {
      this.logoutFromTriggered = true;
      return this.publishEvent('!logout');
    };

    return HeaderController;

  })(Controller);
  
}});

window.require.define({"controllers/session_controller": function(exports, require, module) {
  var BrowserID, Controller, LoginView, SessionController, User, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Controller = require('controllers/base/controller');

  User = require('models/user');

  LoginView = require('views/login_view');

  BrowserID = require('lib/services/browserid');

  module.exports = SessionController = (function(_super) {

    __extends(SessionController, _super);

    function SessionController() {
      this.logout = __bind(this.logout, this);

      this.triggerLogout = __bind(this.triggerLogout, this);

      this.serviceProviderSession = __bind(this.serviceProviderSession, this);

      this.triggerLogin = __bind(this.triggerLogin, this);
      return SessionController.__super__.constructor.apply(this, arguments);
    }

    SessionController.serviceProviders = {
      browserid: new BrowserID()
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
      this.publishEvent('loginTriggered');
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
      this.createUser(session);
      return this.publishLogin();
    };

    SessionController.prototype.publishLogin = function() {
      this.loginStatusDetermined = true;
      this.publishEvent('login', mediator.user);
      return this.publishEvent('loginStatus', true);
    };

    SessionController.prototype.triggerLogout = function() {
      this.publishEvent('logoutTriggered');
      return this.publishEvent('logout');
    };

    SessionController.prototype.logout = function() {
      var serviceProvider;
      if (!this.serviceProviderName) {
        return;
      }
      serviceProvider = SessionController.serviceProviders[this.serviceProviderName];
      serviceProvider.triggerLogout();
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

window.require.define({"controllers/users_controller": function(exports, require, module) {
  var Controller, User, UserPageView, UsersController, mediator, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  UserPageView = require('views/user/user_page_view');

  User = require('models/user');

  mediator = require('mediator');

  utils = require('lib/utils');

  module.exports = UsersController = (function(_super) {

    __extends(UsersController, _super);

    function UsersController() {
      this.show = __bind(this.show, this);
      return UsersController.__super__.constructor.apply(this, arguments);
    }

    UsersController.prototype.title = 'User';

    UsersController.prototype.historyURL = 'user';

    UsersController.prototype.show = function(params) {
      this.model = new User({
        email: params.email
      });
      this.view = new UserPageView({
        model: this.model
      });
      return this.model.fetch();
    };

    return UsersController;

  })(Controller);
  
}});

window.require.define({"controllers/welcome_controller": function(exports, require, module) {
  var Controller, WelcomeController, WelcomePageView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  WelcomePageView = require('views/welcome_page_view');

  module.exports = WelcomeController = (function(_super) {

    __extends(WelcomeController, _super);

    function WelcomeController() {
      this.loginReload = __bind(this.loginReload, this);
      return WelcomeController.__super__.constructor.apply(this, arguments);
    }

    WelcomeController.prototype.title = 'Welcome';

    WelcomeController.prototype.historyURL = 'welcome';

    WelcomeController.prototype.initialize = function() {
      WelcomeController.__super__.initialize.apply(this, arguments);
      return this.subscribeEvent('loginReload', this.loginReload);
    };

    WelcomeController.prototype.loginReload = function(user) {
      if (user.get('name')) {
        return this.redirectTo("/" + (user.get('email')));
      }
    };

    WelcomeController.prototype.index = function() {
      return this.view = new WelcomePageView();
    };

    return WelcomeController;

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

window.require.define({"lib/services/browserid": function(exports, require, module) {
  var BrowserID, ServiceProvider, User, config, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  config = require('config');

  mediator = require('mediator');

  ServiceProvider = require('lib/services/service_provider');

  User = require('models/user');

  module.exports = BrowserID = (function(_super) {

    __extends(BrowserID, _super);

    BrowserID.prototype.name = 'browserid';

    BrowserID.prototype.baseUrl = config.api.versionRoot;

    function BrowserID() {
      this.logoutHandler = __bind(this.logoutHandler, this);

      this.triggerLogout = __bind(this.triggerLogout, this);

      this.gotAssertion = __bind(this.gotAssertion, this);

      this.loginStatusHandler = __bind(this.loginStatusHandler, this);

      this.processUserData = __bind(this.processUserData, this);

      this.loginHandler = __bind(this.loginHandler, this);
      BrowserID.__super__.constructor.apply(this, arguments);
    }

    BrowserID.prototype.load = function() {
      this.resolve();
      return this;
    };

    BrowserID.prototype.isLoaded = function() {
      return true;
    };

    BrowserID.prototype.ajax = function(type, url, data) {
      url = this.baseUrl + url;
      return $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: 'json'
      });
    };

    BrowserID.prototype.triggerLogin = function(loginContext) {
      return navigator.id.get(this.gotAssertion);
    };

    BrowserID.prototype.loginHandler = function(response, status) {
      var eventPayload;
      eventPayload = {
        provider: this,
        response: response
      };
      if (status === 'error') {
        this.publishEvent('loginFail', eventPayload);
        return alert("login failure: " + status);
      } else {
        this.publishEvent('loginSuccessful', eventPayload);
        return this.getUserData().always([this.loginStatusHandler, this.processUserData]);
      }
    };

    BrowserID.prototype.getUserData = function() {
      return this.ajax('get', '/users/me');
    };

    BrowserID.prototype.processUserData = function(response, status) {
      if (!response || status === 'error') {
        return false;
      }
      return this.publishEvent('userData', response);
    };

    BrowserID.prototype.getLoginStatus = function(callback, force) {
      if (callback == null) {
        callback = this.loginStatusHandler;
      }
      if (force == null) {
        force = false;
      }
      return this.getUserData().always(callback);
    };

    BrowserID.prototype.loginStatusHandler = function(response, status) {
      if (!response || status === 'error') {
        return this.publishEvent('logout');
      } else {
        return this.publishEvent('serviceProviderSession', _.extend({
          provider: this
        }, response));
      }
    };

    BrowserID.prototype.gotAssertion = function(assertion) {
      if (assertion) {
        return this.ajax('post', '/auth/browserid/login', {
          assertion: assertion
        }).always(this.loginHandler);
      }
    };

    BrowserID.prototype.triggerLogout = function() {
      navigator.id.logout();
      this.ajax('post', '/auth/browserid/logout').always(this.logoutHandler);
      return false;
    };

    BrowserID.prototype.logoutHandler = function(response, status) {
      if (status !== 'error') {
        this.publishEvent('logoutSuccessful');
      } else {
        alert("logout failure: " + status);
      }
      return this.publishEvent('logoutDone');
    };

    return BrowserID;

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

  Handlebars.registerHelper('if_gt_one', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context) || context <= 1) {
      return options.inverse(this);
    } else {
      return options.fn(this);
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
    context = mediator.user.getAttributes();
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('gravatar', function(options) {
    return "https://secure.gravatar.com/avatar/" + (options.fn(this)) + "?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png";
  });

  Handlebars.registerHelper('gravatar_small', function(options) {
    return "https://secure.gravatar.com/avatar/" + (options.fn(this)) + "?s=48&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png";
  });
  
}});

window.require.define({"mediator": function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
}});

window.require.define({"models/base/collection": function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    Collection.prototype.initialize = function(models, options) {
      if ((options != null ? options.url : void 0) != null) {
        this.url = options.url;
      }
      return Collection.__super__.initialize.apply(this, arguments);
    };

    Collection.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      delete this.url;
      return Collection.__super__.dispose.apply(this, arguments);
    };

    return Collection;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/model": function(exports, require, module) {
  var Chaplin, Model, config, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  mediator = require('mediator');

  Chaplin = require('chaplin');

  config = require('config');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.apiRoot = config.api.versionRoot;

    Model.prototype.urlKey = 'id';

    Model.prototype.urlPath = function() {
      return '';
    };

    Model.prototype.urlParams = function() {
      return {};
    };

    Model.prototype.urlRoot = function() {
      var urlPath;
      urlPath = this.urlPath();
      if (urlPath) {
        return this.apiRoot + urlPath;
      } else if (this.collection) {
        return this.collection.url();
      } else {
        throw new Error('Model must redefine urlPath');
      }
    };

    Model.prototype.url = function(data) {
      var base, full, params, payload, sep, url;
      if (data == null) {
        data = '';
      }
      base = this.urlRoot();
      full = this.get(this.urlKey) != null ? base + encodeURIComponent(this.get(this.urlKey)) + data : base + data;
      sep = full.indexOf('?') >= 0 ? '&' : '?';
      params = this.urlParams();
      payload = _.keys(params).map(function(key) {
        return [key, params[key]];
      }).filter(function(pair) {
        return pair[1] != null;
      }).map(function(pair) {
        return pair.join('=');
      }).join('&');
      url = payload ? full + sep + payload : full;
      return url;
    };

    Model.prototype.fetch = function(options) {
      var _ref,
        _this = this;
      this.trigger('loadStart');
      if (options == null) {
        options = {};
      }
      options.success = _.wrap((_ref = options.success) != null ? _ref : function() {}, function() {
        var args, func;
        func = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        func.apply(null, args);
        return _this.trigger('load');
      });
      return Model.__super__.fetch.apply(this, arguments);
    };

    return Model;

  })(Chaplin.Model);
  
}});

window.require.define({"models/exp": function(exports, require, module) {
  var Exp, Model, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  User = require('models/user');

  module.exports = Exp = (function(_super) {

    __extends(Exp, _super);

    function Exp() {
      return Exp.__super__.constructor.apply(this, arguments);
    }

    Exp.prototype.urlKey = 'name';

    Exp.prototype.urlPath = function() {
      return "/users/" + (this.get('owner').get('email')) + "/exps/";
    };

    return Exp;

  })(Model);
  
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

    User.prototype.urlKey = 'email';

    User.prototype.urlPath = function() {
      return '/users/';
    };

    return User;

  })(Model);
  
}});

window.require.define({"routes": function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'welcome#index');
    return match(':email', 'users#show');
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

    CollectionView.prototype.useCssAnimation = true;

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

    PageView.prototype.dispose = function() {
      var attr, _i, _len, _ref;
      if (this.disposed) {
        return;
      }
      _ref = ['rendered', 'renderedSubviews'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        delete this[attr];
      }
      return PageView.__super__.dispose.apply(this, arguments);
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

window.require.define({"views/exp/exp_view": function(exports, require, module) {
  var ExpView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/exp');

  module.exports = ExpView = (function(_super) {

    __extends(ExpView, _super);

    function ExpView() {
      return ExpView.__super__.constructor.apply(this, arguments);
    }

    ExpView.prototype.className = 'media user-exp';

    ExpView.prototype.tagName = 'div';

    ExpView.prototype.template = template;

    return ExpView;

  })(View);
  
}});

window.require.define({"views/exp/exps_view": function(exports, require, module) {
  var CollectionView, Exp, ExpsView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/base/collection_view');

  Exp = require('views/exp/exp_view');

  module.exports = ExpsView = (function(_super) {

    __extends(ExpsView, _super);

    function ExpsView() {
      return ExpsView.__super__.constructor.apply(this, arguments);
    }

    ExpsView.prototype.className = 'user-exp-list';

    ExpsView.prototype.itemView = Exp;

    ExpsView.prototype.tagName = 'div';

    return ExpsView;

  })(CollectionView);
  
}});

window.require.define({"views/header_view": function(exports, require, module) {
  var HeaderView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      this.logoutClicked = __bind(this.logoutClicked, this);

      this.loginClicked = __bind(this.loginClicked, this);
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
      this.subscribeEvent('startupController', this.render);
      this.delegate('click', '.browserid-login', this.loginClicked);
      return this.delegate('click', '.browserid-logout', this.logoutClicked);
    };

    HeaderView.prototype.loginClicked = function() {
      return this.publishEvent('loginClicked');
    };

    HeaderView.prototype.logoutClicked = function() {
      return this.publishEvent('logoutClicked');
    };

    return HeaderView;

  })(View);
  
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

window.require.define({"views/templates/exp": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var stack1;
    foundHelper = helpers.email;
    stack1 = foundHelper || depth0.email;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "email", { hash: {} }); }
    return escapeExpression(stack1);}

  function program3(depth0,data) {
    
    var stack1;
    foundHelper = helpers.email;
    stack1 = foundHelper || depth0.email;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "email", { hash: {} }); }
    return escapeExpression(stack1);}

  function program5(depth0,data) {
    
    var buffer = "", stack1, stack2;
    foundHelper = helpers.n_results;
    stack1 = foundHelper || depth0.n_results;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "n_results", { hash: {} }); }
    buffer += escapeExpression(stack1) + " ";
    foundHelper = helpers.n_results;
    stack1 = foundHelper || depth0.n_results;
    foundHelper = helpers.if_gt_one;
    stack2 = foundHelper || depth0.if_gt_one;
    tmp1 = self.program(6, program6, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(8, program8, data);
    if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    return buffer;}
  function program6(depth0,data) {
    
    
    return "results";}

  function program8(depth0,data) {
    
    
    return "result";}

  function program10(depth0,data) {
    
    
    return "No results yet";}

  function program12(depth0,data) {
    
    var stack1;
    foundHelper = helpers.description;
    stack1 = foundHelper || depth0.description;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
    return escapeExpression(stack1);}

  function program14(depth0,data) {
    
    
    return "No description";}

    buffer += "<a class=\"pull-left\" href=\"/";
    foundHelper = helpers.owner;
    stack1 = foundHelper || depth0.owner;
    stack2 = helpers['with'];
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "/";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">\n  <p>some image here</p>\n</a>\n<div class=\"media-body\">\n  <h4 class=\"media-heading\"><a href=\"/";
    foundHelper = helpers.owner;
    stack1 = foundHelper || depth0.owner;
    stack2 = helpers['with'];
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "/";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a> <small class=\"pull-right\">";
    foundHelper = helpers.n_results;
    stack1 = foundHelper || depth0.n_results;
    stack2 = helpers['if'];
    tmp1 = self.program(5, program5, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(10, program10, data);
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</small></h4>\n  ";
    foundHelper = helpers.description;
    stack1 = foundHelper || depth0.description;
    stack2 = helpers['if'];
    tmp1 = self.program(12, program12, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(14, program14, data);
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>\n";
    return buffer;});
}});

window.require.define({"views/templates/header": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n\n        ";
    foundHelper = helpers.with_user;
    stack1 = foundHelper || depth0.with_user;
    tmp1 = self.program(2, program2, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n      ";
    return buffer;}
  function program2(depth0,data) {
    
    var buffer = "", stack1, stack2;
    buffer += "\n\n          <div class=\"pull-right\">\n            <ul class=\"nav\">\n              <li>\n                <a href=\"/";
    foundHelper = helpers.email;
    stack1 = foundHelper || depth0.email;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "email", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">\n                  <img class=\"img-rounded\" height=\"24\" width=\"24\" src=\"";
    foundHelper = helpers.gravatar_small;
    stack1 = foundHelper || depth0.gravatar_small;
    tmp1 = self.program(3, program3, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\"> ";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    stack2 = helpers['if'];
    tmp1 = self.program(5, program5, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(7, program7, data);
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                </a>\n              </li>\n              <li><a href=\"/new\"><i class=\"icon-plus-sign icon-white\"></i> new exp</a></li>\n              <li><a href=\"/settings\"><i class=\"icon-cog icon-white\"></i> settings</a></li>\n              <li><a href=\"#\" class=\"browserid-logout\"><i class=\"icon-off icon-white\"></i> logout</a></li>\n            </ul>\n          </div>\n\n        ";
    return buffer;}
  function program3(depth0,data) {
    
    var stack1;
    foundHelper = helpers.gravatar_id;
    stack1 = foundHelper || depth0.gravatar_id;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "gravatar_id", { hash: {} }); }
    return escapeExpression(stack1);}

  function program5(depth0,data) {
    
    var stack1;
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    return escapeExpression(stack1);}

  function program7(depth0,data) {
    
    var stack1;
    foundHelper = helpers.email;
    stack1 = foundHelper || depth0.email;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "email", { hash: {} }); }
    return escapeExpression(stack1);}

  function program9(depth0,data) {
    
    
    return "\n          <button class=\"btn btn-primary pull-right browserid-login\">Log in with BrowserID</button>\n      ";}

    buffer += "<div class=\"navbar navbar-inverse navbar-fixed-top\">\n  <div class=\"navbar-inner\">\n    <div class=\"container\">\n\n      <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </a>\n\n      <a class=\"brand\" href=\"/\">Naja</a>\n\n      ";
    foundHelper = helpers.if_logged_in;
    stack1 = foundHelper || depth0.if_logged_in;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(9, program9, data);
    if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n      <div class=\"nav-collapse collapse\">\n        <ul class=\"nav\">\n          <li><a href=\"#\">About</a></li>\n          <li><a href=\"#\">Contact</a></li>\n        </ul>\n      </div>\n\n    </div>\n  </div>\n</div>\n";
    return buffer;});
}});

window.require.define({"views/templates/login": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", foundHelper, self=this;


    return buffer;});
}});

window.require.define({"views/templates/user": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var stack1;
    foundHelper = helpers.gravatar_id;
    stack1 = foundHelper || depth0.gravatar_id;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "gravatar_id", { hash: {} }); }
    return escapeExpression(stack1);}

    buffer += "<a href=\"http://gravatar.com/emails/\">\n  <img class=\"img-polaroid\" height=\"210\" width=\"210\" src=\"";
    foundHelper = helpers.gravatar;
    stack1 = foundHelper || depth0.gravatar;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
    else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\">\n</a>\n<h3>";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</h3>\n";
    return buffer;});
}});

window.require.define({"views/templates/user_page": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<div class=\"row-fluid\">\n  <div class=\"span3 user-container\"></div>\n  <div class=\"span6 user-exp-list-container\">\n    <div class=\"page-header\">\n      <h2>";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "'s experiments</h2>\n    </div>\n  </div>\n</div>\n";
    return buffer;});
}});

window.require.define({"views/templates/welcome_page": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"hero-unit\">\n  <h1>Cognitive Science. Through Smartphones.</h1>\n  <p>Ever thought you cognitive science experiments had a strong selection bias? Ever wanted to increase <em>N</em> above 50 or 100? Ever thought those experiments could be better fun? Dreamed about <em>in vivo</em> instead of <em>in vitro</em>?</p>\n  <p><a rel=\"tooltip\" title=\"bla\" href=\"#\">Brainydroid</a> and <a href=\"#\">Naja</a> let you program awesome experiments for Android and collect humongous amounts of <em>in vivo</em> data.</p>\n  <p><a class=\"btn btn-primary btn-large\">Learn more &raquo;</a></p>\n</div>\n\n<div class=\"row\">\n  <div class=\"span4\">\n    <h2>In vivo</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div>\n\n  <div class=\"span4\">\n    <h2>Huge user base</h2>\n    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div>\n\n  <div class=\"span4\">\n    <h2>Clinical use</h2>\n    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n    <p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n  </div>\n</div>\n";});
}});

window.require.define({"views/user/user_page_view": function(exports, require, module) {
  var Collection, Exp, ExpsView, PageView, UserPageView, UserView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/user_page');

  PageView = require('views/base/page_view');

  Collection = require('models/base/collection');

  Exp = require('models/exp');

  ExpsView = require('views/exp/exps_view');

  UserView = require('views/user/user_view');

  module.exports = UserPageView = (function(_super) {

    __extends(UserPageView, _super);

    function UserPageView() {
      return UserPageView.__super__.constructor.apply(this, arguments);
    }

    UserPageView.prototype.template = template;

    UserPageView.prototype.className = 'user-page';

    UserPageView.prototype.renderSubviews = function() {
      this.subview('user', new UserView({
        model: this.model,
        container: this.$('.user-container')
      }));
      this.exps = new Collection(null, {
        model: Exp
      });
      this.exps.url = this.model.url('/exps/');
      this.subview('exps', new ExpsView({
        collection: this.exps,
        container: this.$('.user-exp-list-container')
      }));
      return this.exps.fetch();
    };

    UserPageView.prototype.dispose = function() {
      var _this = this;
      if (this.disposed) {
        return;
      }
      ['exps'].forEach(function(attr) {
        _this[attr].dispose();
        return delete _this[attr];
      });
      return UserPageView.__super__.dispose.apply(this, arguments);
    };

    return UserPageView;

  })(PageView);
  
}});

window.require.define({"views/user/user_view": function(exports, require, module) {
  var UserView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/user');

  View = require('views/base/view');

  module.exports = UserView = (function(_super) {

    __extends(UserView, _super);

    function UserView() {
      return UserView.__super__.constructor.apply(this, arguments);
    }

    UserView.prototype.className = 'user';

    UserView.prototype.tagName = 'div';

    UserView.prototype.template = template;

    UserView.prototype.autoRender = true;

    return UserView;

  })(View);
  
}});

window.require.define({"views/welcome_page_view": function(exports, require, module) {
  var PageView, WelcomePageView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/welcome_page');

  PageView = require('views/base/page_view');

  module.exports = WelcomePageView = (function(_super) {

    __extends(WelcomePageView, _super);

    function WelcomePageView() {
      return WelcomePageView.__super__.constructor.apply(this, arguments);
    }

    WelcomePageView.prototype.template = template;

    WelcomePageView.prototype.className = 'welcome-page';

    WelcomePageView.prototype.autoRender = true;

    return WelcomePageView;

  })(PageView);
  
}});

