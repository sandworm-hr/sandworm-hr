// Backbone view for the stock submission form
var SignupView = Backbone.View.extend({

  className: 'form container',

  divText: '\
      <div class="container"> \
        <div class="row"> \
          <div class="col-md-4 col-md-offset-4 well text-center" id="select-form">\
            <div>Sign Up</div>\
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

  clearError: function() {
    $('.error-message').html('');
  },

  handleSignupError: function() {
    var errorText = 'That user already exists. Please choose another username.';
    this.$('form')[0].reset();
    this.$('.error-message').html(errorText);
  },

  handleSubmit: function(e) {
    var context = this;
    e.preventDefault();

    //start spinner while credentials are created
    this.startSpinner();
    this.clearError();
    var userSignup = {
      username: this.$('#username').val(),
      password: this.$('#password').val(),
    };

    $.ajax({
      url: "/signup",
      type: "POST",
      data: userSignup,
      success: function (result) {
        window.location.hash = 'front';
        context.stopSpinner();
      },
      error: function(error) {
        context.handleSignupError();
        context.stopSpinner();
      }
    });

    this.$('#username').val('');
    this.$('#password').val('');

    //Sign up new user
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
