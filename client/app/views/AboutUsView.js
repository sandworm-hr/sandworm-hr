// Backbone view for member profile form
var AboutUsView = Backbone.View.extend({

  className: 'about-us container',

  divText: '\
    <div class="container"> \
      <div class="row"> \
        <div class="col-md-10 col-md-offset-1 text-center" id="about-us-container">\
          <h2>About Us</h2>\
          <div class="member-profiles">\
            <div class="member-profile col-md-3" id="edwin-profile"> \
              <img src="assets/images/Edwin.png" height="273" width="273"> \
              <a href="https://github.com/edwinlin1987"><i class="glyphicon glyphicon-github icon-github"></i></a>\
              <a href="https://www.linkedin.com/in/edwinlin1987"><i class="glyphicon glyphicon-linkedin icon-linked-in"></i></a>\
              <a href="#"><i class="social social-blogger"></i></a>\
            </div> \
            <div class="member-profile col-md-3 col-md-offset-1" id="paul-profile"> \
              <img src="assets/images/Paul.png" height="273" width="273"> \
              <a href="https://github.com/sokolikp"><i class="glyphicon glyphicon-github icon-github"></i></a>\
              <a href="https://www.linkedin.com/in/paulsokolik"><i class="glyphicon glyphicon-linkedin icon-linked-in"></i></a>\
              <a href="http://paulsokolik.com/"><i class="glyphicon glyphicon-blog icon-blogger"></i></a>\
            </div> \
            <div class="member-profile col-md-3 col-md-offset-1" id="tamara-profile"> \
              <img src="assets/images/Tamara.jpeg" height="273" width="273"> \
              <a href="https://github.com/tmwoodson"><i class="glyphicon glyphicon-github icon-github"></i></a>\
              <a href="https://www.linkedin.com/pub/tamara-woodson/38/400/345"><i class="glyphicon glyphicon-linkedin icon-linked-in"></i></a>\
              <a href="#"><i class="glyphicon glyphicon-blog icon-blogger"></i></a>\
            </div> \
          </div>\
        </div> \
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
