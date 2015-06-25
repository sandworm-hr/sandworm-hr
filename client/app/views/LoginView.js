// Backbone view for account login
var LoginView = Backbone.View.extend({

  className: 'form container',

  divText: '\
      <div class="container text-center"> \
        <div id="login">Login</div> \
        <div class="row"> \
          <div class="col-md-4 col-md-offset-4 well text-center" id="select-form">\
            <form role="form">\
              <div class="form-group"> \
                <label for="username">Username</label>\
                <input type="text" id="username" class="form-control">\
              </div> \
              <div class="form-group"> \
                <label for="password">Password</label>\
                <input type="text" id="password" class="form-control">\
              </div> \
              <button type="submit" class="btn btn-default">Submit</button>\
            </form>\
          </div> \
        </div> \
        <div> \
          <a href="/signup">Create a new account</a> \
        </div> \
      </div>',

  initialize: function(){
    this.render();
  },

  events: {
    //Form submission form
    'submit': 'handleSubmit'
  },

  handleSubmit: function() {

  },

  render: function(){
    //Render main form
    return this.$el.html(this.divText);
  }

});
