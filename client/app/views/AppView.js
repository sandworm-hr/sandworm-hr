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
          </nav> \
          <div class="username-verification text-right"></div>',

  initialize: function(){
    this.formView = new FormView({collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection});

    this.signupView = new SignupView({model: this.model});
    this.signinView = new SigninView({model: this.model});
    this.render();
  },

  render: function(){
    this.$el.empty();
    this.formView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    this.$el.append([
      $(this.navDiv),
      this.formView.$el,
      this.dashboardView.$el
    ]);
    this.displaySignin();
  },

  signup: function() {
    this.$el.empty();
    this.signupView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    this.$el.append([
      $(this.navDiv),
      this.signupView.$el,
      this.dashboardView.$el
    ]);
    this.displaySignin();
  },

  signin: function() {
    this.$el.empty();
    this.signinView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    this.$el.append([
      $(this.navDiv),
      this.signinView.$el,
      this.dashboardView.$el
    ]);
    this.displaySignin();
  },

  portfolios: function () {
    this.$el.empty();
    this.portfoliosView = new PortfoliosView({collection: this.collection});
    this.$el.append([
      $(this.navDiv),
      this.portfoliosView.$el
    ]);
    this.displaySignin();
  },

  displaySignin: function() {
    if(this.model.get('signedin')) {
      this.$el.find('.username-verification').text('Signed In as ' + this.model.get('username'));
    } else {
      this.$el.find('.username-verification').text('Not Signed In');
    }
  }

});
