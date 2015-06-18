// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'.main',

  initialize: function(stockCollection){
    this.formView = new FormView({collection: new Stocks()});
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
