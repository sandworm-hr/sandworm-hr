// Backbone view for member profile form
var AboutUsView = Backbone.View.extend({

  className: 'about-us container',

  divText: '\
      <div class="row"> \
        <div class="col-md-10 col-md-offset-1 text-center" id="about-us-container">\
          <div class="row"><h2>About Us</h2></div>\
          <div class="member-profiles row text-left">\
            <div class="member-profile col-md-4" id="edwin-profile"> \
                <img src="assets/images/Edwin.png" class="profile-image"> \
                <div class="text-center row profile-name">Edwin Lin</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/edwinlin1987" target="_blank"><i class="glyphicon icon-large icon-search icon-github"></i></a></li>\
                  <li><a href="https://www.linkedin.com/in/edwinlin1987" target="_blank"><i class="glyphicon icon-large icon-search icon-linked-in linkedin-icon"></i></a></li>\
                  <li><a href="http://eddyjs.com" target="_blank"><i class="glyphicon icon-large icon-search icon-blog"></i></a></li>\
                </ul></div>\
              </ul>\
            </div> \
            <div class="member-profile col-md-4" id="paul-profile"> \
                <img src="assets/images/Paul.png" class="profile-image"> \
                <div class="text-center row profile-name">Paul Sokolik</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/sokolikp" target="_blank"><i class="glyphicon icon-large icon-search icon-github"></i></a></li>\
                  <li><a href="https://www.linkedin.com/in/paulsokolik" target="_blank"><i class="glyphicon icon-large icon-search icon-linked-in linkedin-icon"></i></a></li>\
                  <li><a href="http://paulsokolik.com/" target="_blank"><i class="glyphicon icon-large icon-search icon-blog"></i></a></li>\
                </ul></div>\
            </div> \
            <div class="member-profile col-md-4" id="tamara-profile"> \
                <img src="assets/images/Tamara.jpeg" class="profile-image">\
                <div class="text-center row profile-name">Tamara Woodson</div>\
                <div class="text-center row"><ul class="nav navbar navbar-nav about-us-nav">\
                  <li><a href="https://github.com/tmwoodson" target="_blank"><i class="glyphicon icon-large icon-search icon-github"></i></a></li>\
                  <li><a href="https://www.linkedin.com/pub/tamara-woodson/38/400/345" target="_blank"><i class="glyphicon icon-large icon-search icon-linked-in linkedin-icon"></i></a></li>\
                  <li><a href="http://tmwoodson.github.io/" target="_blank"><i class="glyphicon icon-large icon-search icon-blog"></i></a></li>\
                </ul></div>\
            </div> \
          </div>\
        </div> \
     </div>\
     <div class="row text-center attribution"><p>Icons from <a href="http://glyphicons.com" target="_blank">Glyphicons Free</a>,\
                         licensed under <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.\
                      </p>\
     </div>',

  initialize: function(){
    this.render();
  },

  render: function(){
    //Render profile form
    return this.$el.html(this.divText);
  }

});
