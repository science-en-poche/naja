module.exports = Em.Handlebars.helper 'gravatar-img', (user, options) ->
  size = options.hash.size or 48
  new Handlebars.SafeString "<img class=\"#{options.hash.class}\"
                                  src=\"https://secure.gravatar.com/avatar/#{user.get('gravatarId')}?s=#{size}\">"
,
  'gravatarId'
