// Backbone view for the dashboard
var DashboardView = Backbone.View.extend({

  className: 'dashboard',

  initialize: function(){
    this.graphView = new GraphView({collection: this.collection});
    this.infoView = new InfoView({collection: this.collection});
    this.render();
  },

  render: function(){
    return this.$el.html([
      this.graphView.$el,
      this.infoView.$el
    ]);
  }

});
