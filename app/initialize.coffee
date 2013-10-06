# ===== Namespace =====
window.App = require 'app'

# ===== Config =====
require 'config'


# ===== Router =====
require 'router'


# ===== Routes =====
require 'routes/ApplicationRoute'
require 'routes/IndexRoute'
require 'routes/UserIndexRoute'
require 'routes/UserExpRoute'
require 'routes/UserExpResultsRoute'


# ===== Store =====
require 'store'


# ===== Models =====
require 'models/User'
require 'models/Exp'
require 'models/Device'
require 'models/Profile'
require 'models/Result'


# ===== Views =====


# ===== Controllers =====
require 'controllers/AuthenticationController'
require 'controllers/AuthenticatedMixin'
require 'controllers/AuthenticatedController'
require 'controllers/AuthenticatedObjectController'
require 'controllers/AuthenticatedArrayController'
require 'controllers/ApplicationController'
require 'controllers/HeaderController'
require 'controllers/UserExpController'


# ===== Template Helpers =====
require 'helpers/gravatar-img'
require 'helpers/exp-img'
require 'helpers/plural'
require 'helpers/result'
require 'helpers/profile'
require 'helpers/date'


# ===== Templates =====
require 'templates/application'
require 'templates/header'
require 'templates/index'
require 'templates/index/users'
require 'templates/index/exps'
require 'templates/about'
require 'templates/user'
require 'templates/user/index'
require 'templates/user/exp'
require 'templates/user/exp/index'
require 'templates/user/exp/results'
