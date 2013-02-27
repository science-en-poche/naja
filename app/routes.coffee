module.exports = (match) ->
  match '', 'welcome#index'
  match 'new', 'new_exp#show'
  match 'settings', 'settings#show'
  match 'settings/profile', 'settings#profile'
  match ':login', 'users#show'
  match ':login/:name', 'exps#show'
