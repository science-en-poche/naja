module.exports = App.FromNowView = Ember.View.extend
  tagName: 'time'
  templateName: 'fromNow'

  tick: ->
    nextTick = Ember.run.later this, ->
      console.log 'tick'
      @notifyPropertyChange 'value'
      @tick()
    , 1000
    @set 'nextTick', nextTick

  didInsertElement: ->
    @tick()

  willDestroyElement: ->
    nextTick = @get('nextTick')
    Ember.run.cancel nextTick

  output: (->
    moment(@get('value')).fromNow()
  ).property('value')
