  var app = new AppModel();
  var stocks = new Stocks();

  var appView = new AppView({model: app, collection: stocks});
  var router = new AppRouter();

  router.on('route:front',function(){
    appView.render();
  });

  router.on('route:new',function(){
    appView.collection.reset(null);
    appView.render();
    window.location.hash = 'front';
  });
  
  router.on('route:signup',function(){
    appView.signupView.$('.error-message').text('');
    appView.signup();
  });

  router.on('route:signin',function(){
    appView.signinView.$('.error-message').text('');
    appView.signin();
  });

  router.on('route:portfolios',function(){
    $.ajax({
      url: '/auth',
      success: function() {
        appView.portfolios();
      },
      error: function() {
        router.navigate('signin', true);
        appView.signinView.$('.error-message').text('Please sign in first!');
      }
    });
  });

  router.on('route:about',function(){
    appView.aboutus();
  });

  router.on('route:signout',function(){
    $.ajax({
      url: '/signout',
      success: function() {
        appView.collection.reset();
        app.set('signedin', false);
        // app.set('username', null);
        appView.setUsername(null);
        appView.render();
      }
    });
  });

  Backbone.history.start();
