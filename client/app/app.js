  var app = new AppModel();
  var stocks = new Stocks();

  // var appView = new AppView({model: app, collection: stocks});

var app = Backbone.View.extend({

    events: {
      'click li a.index':  'renderIndexView',
      'click li a.create': 'renderCreateView'
      // 'click li a.logout': 'renderLogout'
    },

    initialize: function(){
      console.log('initializing');
      this.appView = new AppView({model: app, collection: stocks});
      this.router = new Router({ el: this.$el.find('#main') });
      this.router.on('route', this.updateNav, this);

      Backbone.history.start({ pushState: true });
    },

    render: function(){
      // this.$el.html( this.template() );
      // return this;
    },

    renderIndexView: function(e){
      e && e.preventDefault();
      this.router.navigate('/', { trigger: true });
    },

    renderCreateView: function(e){
      e && e.preventDefault();
      this.router.navigate('/create', { trigger: true });
    },

    // renderLogout: function(e){
    //   console.log('client side, logging out');
    //   e && e.preventDefault();
    //   this.router.navigate('/logout', { trigger: true });
    // },

    updateNav: function(routeName){
      console.log('nav');
      // this.$el.find('.navigation li a')
      //   .removeClass('selected')
      //   .filter('.' + routeName)
      //   .addClass('selected');
    }
  });
