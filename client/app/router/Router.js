var AppRouter = Backbone.Router.extend({

  routes: {
    'signup': 'signup',
    'signin': 'signin',
    'front' : 'front',
    'portfolios' : 'portfolios',
    'about' : 'about',
    'new' : 'new',
    'signout' : 'signout'
  }

});

// // Router
// var app_router = new AppRouter();
// app_router.on('route:signup',function(actions){
  
// });

// app_router.on('route:signin',function(title){
//   console.log('bird');

// });

// Backbone.history.start();