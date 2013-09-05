# ===== Namespace =====
window.App = require 'app'

# ===== Config =====
require 'config'


# ===== Router =====
require 'router'


# ===== Routes =====
require 'routes/IndexRoute'
require 'routes/UserIndexRoute'
require 'routes/UserExpIndexRoute'


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
require 'templates/index'
require 'templates/index/users'
require 'templates/index/exps'
require 'templates/about'
require 'templates/user'
require 'templates/exp'
