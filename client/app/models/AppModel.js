// Backbone model for the app
var AppModel = Backbone.Model.extend({

  initialize: function(){
    this.set('signedin', false);
    this.set('username', null);
  }
  
});
