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


# ===== Store =====
require 'store'


# ===== Models =====
require 'models/User'
require 'models/Exp'


# ===== Views =====


# ===== Controllers =====
require 'controllers/AuthenticationController'
require 'controllers/AuthenticatedController'
require 'controllers/ApplicationController'
require 'controllers/HeaderController'


# ===== Template Helpers =====
require 'helpers/gravatar-img'
require 'helpers/exp-img'
require 'helpers/plural'


# ===== Templates =====
require 'templates/application'
require 'templates/header'
require 'templates/index'
require 'templates/users'
require 'templates/exps'
require 'templates/about'
require 'templates/user'
require 'templates/user/index'
require 'templates/user/exp'
