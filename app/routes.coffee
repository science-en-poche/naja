module.exports = (match) ->
  match '', 'welcome#index'
  match 'home', 'home#show'
  match 'settings', 'home#show'
