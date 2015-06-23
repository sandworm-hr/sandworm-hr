// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'#main',

  navDiv: '<nav class="navbar navbar-default navbar-static-top"> \
                             <div class="container-fluid"> \
                               <a href="/" class="navbar-brand">Portfol.io</a> \
                               <ul class="nav nav-pills navbar-nav navbar-right"> \
                                 <li><a href="/">My Portfolios</a></li> \
                                 <li><a href="/">New Portfolio</a></li> \
                                 <li><a href="/">About Us</a></li> \
                               </ul> \
                             </div> \
                            </nav>',

  initialize: function(){
    this.formView = new FormView({collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection})
    this.render();
  },

  render: function(){
    return this.$el.html([
      $(this.navDiv),
      this.formView.$el,
      this.dashboardView.$el
    ]);
  }

});
