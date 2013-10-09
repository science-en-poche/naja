module.exports = App.FromNowView = Ember.View.extend
  tagName: 'time'
  templateName: 'fromNow'

  output: (->
    moment(@get('value')).fromNow()
  ).property('value')
