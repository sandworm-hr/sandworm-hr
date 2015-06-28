// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'#main',

  navDiv: '<nav class="navbar navbar-inverse navbar-static-top"> \
             <div class="container-fluid"> \
               <a href="/" class="navbar-brand">Portfol.io</a> \
               <ul class="nav nav-pills navbar-nav navbar-right"> \
                 <li><a href="#signup">Sign Up</a></li> \
                 <li><a href="#signin">Sign In</a></li> \
               </ul> \
             </div> \
          </nav> \
          <div class="username-verification text-right"></div>',

  template: _.template('<nav class="navbar navbar-inverse navbar-static-top"> \
                          <div class="container-fluid"> \
                            <a href="/" class="navbar-brand">Portfol.io</a> \
                            <ul class="nav nav-pills navbar-nav navbar-right"> \
                              <li class="username-container">Signed in as <strong class="username"><%= username %></strong></li>\
                              <li><a href="#signout">Sign Out</a></li>\
                              <li><a href="#portfolios">My Portfolios</a></li> \
                              <li><a href="#new">New Portfolio</a></li> \
                            </ul> \
                         </div> \
                       </nav> \
                      <div class="username-verification text-right"></div>'),

  initialize: function(){
    this.formView = new FormView({collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection});

    this.signupView = new SignupView({model: this.model});
    this.signinView = new SigninView({model: this.model});
    this.render();
  },

  setUsername: function(name) {
    this.model.set('username', name);
    this.dashboardView.setUsername(name);
  },

  renderBody: function($el) {
    this.$el.empty();
    this.formView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    var navbar = $(this.navDiv);
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      navbar,
      $el,
      this.dashboardView.$el
    ]);
  },

  render: function(){
    var context = this;
    $.ajax({
      url:'/auth',
      success: function (response) {
        context.model.set('signedin', true);
        // context.model.set('username', response);
        // context.dashboardView.setUsername(response);
        context.setUsername(response);
        context.renderBody(context.formView.$el);
       },
      error: function() {
        context.renderBody(context.formView.$el);
      }
    });
  },

  signup: function() {
    this.renderBody(this.signupView.$el);
  },

  signin: function() {
    this.renderBody(this.signinView.$el);
  },

  portfolios: function () {
    this.$el.empty();
    this.portfoliosView = new PortfoliosView({collection: this.collection});
    var navbar = $(this.navDiv);
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      navbar,
      this.portfoliosView.$el
    ]);
  }

});
