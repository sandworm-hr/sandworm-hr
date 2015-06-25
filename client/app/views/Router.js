var Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    '':       'index',
    'login': 'login',
    'signup': 'signup'
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  index: function(){
    cosole.log('index');
    // var links = new Shortly.Links();
    // var linksView = new Shortly.LinksView({ collection: links });
    // this.swapView(linksView);
  },

  login: function(){
    cosole.log('login');
    // this.swapView(new Shortly.createLinkView());
  },

  signup: function() {
    cosole.log('signup');
  }

});
