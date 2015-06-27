// Backbone view for the stock submission form
var SigninView = Backbone.View.extend({

  className: 'form container',

  divText: '\
      <div class="container"> \
        <div class="row"> \
          <div class="col-md-4 col-md-offset-4 well text-center" id="select-form">\
            <div>Sign In</div>\
            <form data-toggle="validator" role="form">\
              <div class="form-group"> \
                <label for="username">Username</label>\
                <input pattern="[a-zA-Z0-9]{5,15}" minlength="5" type="text" id="username" class="form-control" data-error="Invalid Username" required>\
                <div class="help-block with-errors">Username of 5-15 alphanumeric characters</div>\
              </div> \
              <div class="form-group"> \
                 <label for="password">Password</label>\
                 <input type="password" id="password" class="form-control" required>\
                 <div class="help-block with-errors"></div>\
              </div> \
              <button type="submit" class="btn btn-default submit-button">Submit</button>\
              <img id="spinner" src="assets/images/loader.gif">\
            </form>\
          </div> \
        </div> \
      </div>\
      <div class="text-center error-message container"></div>',

  initialize: function(){
    this.render();
    //stop loading spinner on page load
    this.stopSpinner(); 
    //stop spinner upon request completion
  },

  events: {
    //Form submission form
    'submit': 'handleSubmit'
  },

  handleSigninError: function() {
    var errorText = 'Your username or password is incorrect. Please try again.';
    this.$('form')[0].reset();
    this.$('.error-message').text(errorText);
  },

  clearError: function() {
    $('.error-message').text('');
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var context = this;

    //start spinner while credentials are checked
    this.startSpinner(); 
    this.clearError();
    var userSignin = {
      username: this.$('#username').val(),
      password: this.$('#password').val(),
    };

    $.ajax({
      url: "/signin",
      type: "POST",
      data: userSignin,
      success: function (result) {
        context.model.set('username', userSignin.username);
        context.model.set('signedin', true);
        window.location.hash = 'front';
        context.stopSpinner();
      },
      error: function(error) {
        context.handleSigninError();
        context.stopSpinner();
      }
    });

    this.$('#username').val('');
    this.$('#password').val('');
  },
  
  startSpinner: function(){
    this.$('.submit-button').hide();
    this.$('#spinner').show();
  },

  stopSpinner: function(){
    this.$('#spinner').hide();
    this.$('.submit-button').show();
  },


  render: function(){
    //Render main form
    return this.$el.html(this.divText);
  }

});
