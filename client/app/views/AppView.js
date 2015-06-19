// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'.main',

  initialize: function(){
    this.formView = new FormView({collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection})
    this.render();
  },

  render: function(){
    return this.$el.html([
      this.formView.$el,
      this.dashboardView.$el
    ]);
  }

});
