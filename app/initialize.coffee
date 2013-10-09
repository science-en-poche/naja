# ===== Namespace =====
window.App = require 'app'

# ===== Config =====
require 'config'


# ===== Router =====
require 'router'


# ===== Routes =====
require 'routes/AuthenticatedRouteMixin'
require 'routes/ApplicationRoute'
require 'routes/IndexRoute'
require 'routes/UserIndexRoute'
require 'routes/ExpRoute'
require 'routes/ExpIndexRoute'


# ===== Store =====
require 'store'


# ===== Models =====
require 'models/User'
require 'models/Exp'
require 'models/Device'
require 'models/Profile'
require 'models/Result'


# ===== Views =====
require 'views/FromNowView'


# ===== Controllers =====
require 'controllers/AuthenticationController'
require 'controllers/AuthenticatedControllerMixin'
require 'controllers/HeaderController'
require 'controllers/IndexUsersController'
require 'controllers/IndexExpsController'
require 'controllers/UserIndexController'
require 'controllers/ExpController'
require 'controllers/ExpIndexController'


# ===== Template Helpers =====
require 'helpers/gravatar-img'
require 'helpers/exp-img'
require 'helpers/plural'
require 'helpers/result'
require 'helpers/profile'
require 'helpers/fromNow'


# ===== Templates =====
require 'templates/application'
require 'templates/header'
require 'templates/index'
require 'templates/index/users'
require 'templates/index/exps'
require 'templates/about'
require 'templates/user'
require 'templates/user/index'
require 'templates/exp'
require 'templates/exp/index'
require 'templates/fromNow'
