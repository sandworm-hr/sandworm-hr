// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'#main',

  navDiv: '<nav class="navbar navbar-inverse navbar-static-top"> \
                             <div class="container-fluid"> \
                               <a href="/" class="navbar-brand">Portfol.io</a> \
                               <ul class="nav nav-pills navbar-nav navbar-right"> \
                                 <li><a href="#signup">Sign up</a></li> \
                                 <li><a href="#signin">Sign in</a></li> \
                                 <li><a href="#front">My Portfolios</a></li> \
                                 <li><a href="#front">New Portfolio</a></li> \
                                 <li><a href="#front">About Us</a></li> \
                               </ul> \
                             </div> \
                            </nav>',

  initialize: function(){
    this.formView = new FormView({collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection});
    this.signupView = new SignupView();
    this.signinView = new SigninView();
    this.render();
  },

  render: function(){
    return this.$el.html([
      $(this.navDiv),
      this.formView.$el,
      this.dashboardView.$el
    ]);
  },

  signup: function() {
    return this.$el.html([
      $(this.navDiv),
      this.signupView.$el,
      this.dashboardView.$el
    ]);
  },

  signin: function() {
    return this.$el.html([
      $(this.navDiv),
      this.signinView.$el,
      this.dashboardView.$el
    ]);
  }

});
