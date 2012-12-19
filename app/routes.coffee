module.exports = (match) ->
  match '', 'welcome#index'
  match 'new', 'new_exp#show'
  match ':login', 'users#show'
  match ':login/:name', 'exps#show'
