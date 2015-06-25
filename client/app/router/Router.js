var AppRouter = Backbone.Router.extend({

  routes: {
    'signup': 'signup',
    'signin': 'signin',
    'front' : 'front'
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