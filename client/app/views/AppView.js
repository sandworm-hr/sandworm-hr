// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'#main',

  navDiv: '<nav class="navbar navbar-inverse navbar-static-top"> \
                             <div class="container-fluid"> \
                               <a href="/" class="navbar-brand">Portfol.io</a> \
                               <ul class="nav nav-pills navbar-nav navbar-right"> \
                                 <li><a href="#signup">Sign Up</a></li> \
                                 <li><a href="#signin">Sign In</a></li> \
                                 <li><a href="#signout">Sign Out</a></li>\
                                 <li><a href="#portfolios">My Portfolios</a></li> \
                                 <li><a href="#new">New Portfolio</a></li> \
                                 <li><a href="#about">About Us</a></li> \
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
    this.$el.empty();
    this.formView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.$el.append([
      $(this.navDiv),
      this.formView.$el,
      this.dashboardView.$el
    ]);
  },

  signup: function() {
    this.$el.empty();
    this.signupView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.$el.append([
      $(this.navDiv),
      this.signupView.$el,
      this.dashboardView.$el
    ]);
  },

  signin: function() {
    this.$el.empty();
    this.signinView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.$el.append([
      $(this.navDiv),
      this.signinView.$el,
      this.dashboardView.$el
    ]);
  },

  portfolios: function () {
    this.$el.empty();
    this.portfoliosView = new PortfoliosView({collection: this.collection});
    this.$el.append([
      $(this.navDiv),
      this.portfoliosView.$el
    ]);
  }

});
