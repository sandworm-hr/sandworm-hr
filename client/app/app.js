  var app = new AppModel();
  var stocks = new Stocks();

  var appView = new AppView({model: app, collection: stocks});
  var router = new AppRouter();

  router.on('route:front',function(){
    appView.render();
  });
  
  router.on('route:signup',function(){
    appView.signup();
  });

  router.on('route:signin',function(){
    appView.signin();
  });

  router.on('route:portfolios',function(){
    appView.portfolios();
  });

  router.on('route:about',function(){
    appView.render();
  });

  Backbone.history.start();
