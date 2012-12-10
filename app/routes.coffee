module.exports = (match) ->
  match '', 'welcome#index'
  match ':email', 'users#show'
