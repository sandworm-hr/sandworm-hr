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
  });
  
  router.on('route:signup',function(){
    appView.signup();
  });

  router.on('route:signin',function(){
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
      }
    });
  });

  router.on('route:about',function(){
    appView.render();
  });

  router.on('route:signout',function(){
    $.ajax({
      url: '/signout',
      success: function() {
        appView.collection.reset();
        appView.render();
      }
    });
  });

  Backbone.history.start();
