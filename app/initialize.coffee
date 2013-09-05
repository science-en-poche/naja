# ===== Namespace =====
window.App = require 'app'

# ===== Config =====
require 'config'


# ===== Router =====
require 'router'


# ===== Routes =====
require 'routes/LoadingRoute'
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



# ===== Template Helpers =====
require 'helpers/gravatar-img'
require 'helpers/exp-img'
require 'helpers/plural'


# ===== Templates =====
require 'templates/application'
require 'templates/loading'
require 'templates/index'
require 'templates/users'
require 'templates/exps'
require 'templates/about'
require 'templates/user'
require 'templates/user/index'
require 'templates/user/exp'
