// Backbone view for the dashboard
var DashboardView = Backbone.View.extend({

  className: 'dashboard container-fluid',

  initialize: function(){
    this.graphView = new GraphView({collection: this.collection});
    this.infoView = new InfoView({collection: this.collection});
    this.collection.on('add reset', function() {
      this.render();
    }, this);
  },

  setUsername: function(name) {
    this.infoView.setUsername(name);
  },

  render: function(){
    return this.$el.html([
      this.graphView.$el,
      this.infoView.$el
    ]);
  }

});
