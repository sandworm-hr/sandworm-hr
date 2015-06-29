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
