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
                              <li class="username-container">Signed in as <%= username %></li>\
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

  renderBody: function(isSignedin, $el) {
    this.$el.empty();
    this.formView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();

  },

  render: function(){
    var context = this;
    this.$el.empty();
    this.formView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    var navbar = $(this.navDiv);
    $.ajax({
      url:'/auth',
      success: function (response) {
        context.model.set('signedin', true);
        context.model.set('username', response);
        navbar = context.template(context.model.attributes);
        context.$el.append([
          navbar,
          context.formView.$el,
          context.dashboardView.$el
        ]);
       },
      error: function() {
        context.$el.append([
          navbar,
          context.formView.$el,
          context.dashboardView.$el
        ]);
      }
    });
  },

  signup: function() {
    this.$el.empty();
    this.signupView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    var navbar = $(this.navDiv);
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      navbar,
      this.signupView.$el,
      this.dashboardView.$el
    ]);
    // this.displaySignin();
  },

  signin: function() {
    this.$el.empty();
    this.signinView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    var navbar = $(this.navDiv);
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      navbar,
      this.signinView.$el,
      this.dashboardView.$el
    ]);
    // this.displaySignin();
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
      this.template(this.model.attributes),
      this.portfoliosView.$el
    ]);
    // this.displaySignin();
  },

  displaySignin: function() {
    if(this.model.get('signedin')) {
      this.$el.find('.username-verification').text('Signed In as ' + this.model.get('username'));
    } else {
      this.$el.find('.username-verification').text('Not Signed In');
    }
  }

});
