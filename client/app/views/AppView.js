// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'.main',

  initialize: function(){
    this.formView = new FormView();
    this.graphView = new GraphView();
    this.infoView = new InfoView();
    this.render();
  },

  render: function(){
    return this.$el.html([
      this.formView.$el,
      this.graphView.$el,
      this.infoView.$el
    ]);
  }

});
