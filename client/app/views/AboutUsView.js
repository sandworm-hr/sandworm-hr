// Backbone view for member profile form
var AboutUsView = Backbone.View.extend({

  className: 'about-us container',

  divText: '\
      <div class="row"> \
        <div class="col-md-10 col-md-offset-1 text-center" id="about-us-container">\
          <div class="row"><h2>About Us</h2></div>\
          <div class="member-profiles row text-left">\
            <div class="member-profile col-md-4" id="edwin-profile"> \
              <ul class="nav">\
                <li><img src="assets/images/Edwin.png" class="profile-image"></li> \
                <li><a href="https://github.com/edwinlin1987"><i class="glyphicon glyphicon-user icon-github"></i> Github</a></li>\
                <li><a href="https://www.linkedin.com/in/edwinlin1987"><i class="glyphicon glyphicon-link icon-linked-in"></i> LinkedIn</a></li>\
                <li><a href="#"><i class="social social-blogger glyphicon glyphicon-book"></i> Blog</a></li>\
              </ul>\
            </div> \
            <div class="member-profile col-md-4" id="paul-profile"> \
              <ul class="nav">\
                <li><img src="assets/images/Paul.png" class="profile-image"></li> \
                <li><a href="https://github.com/sokolikp"><i class="glyphicon glyphicon-user icon-github"></i> Github</a></li>\
                <li><a href="https://www.linkedin.com/in/paulsokolik"><i class="glyphicon glyphicon-link icon-linked-in"></i> LinkedIn</a></li>\
                <li><a href="http://paulsokolik.com/"><i class="glyphicon glyphicon-book icon-blogger"></i> Blog</a></li>\
              </nav>\
            </div> \
            <div class="member-profile col-md-4" id="tamara-profile"> \
              <ul class="nav">\
                <li><img src="assets/images/Tamara.jpeg" class="profile-image"></li>\
                <li><a href="https://github.com/tmwoodson"><i class="glyphicon glyphicon-user icon-github"></i> Github</a></li>\
                <li><a href="https://www.linkedin.com/pub/tamara-woodson/38/400/345"><i class="glyphicon glyphicon-link icon-linked-in"></i> LinkedIn</a></li>\
                <li><a href="#"><i class="glyphicon glyphicon-book icon-blogger"></i> Blog</a></li>\
              </ul>\
            </div> \
          </div>\
        </div> \
     </div>',

  initialize: function(){
    this.render();
  },

  render: function(){
    //Render profile form
    return this.$el.html(this.divText);
  }

});
