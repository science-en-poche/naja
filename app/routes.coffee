module.exports = (match) ->
  match '', 'welcome#index'
  match 'new', 'new_exp#show'
  match ':email', 'users#show'
