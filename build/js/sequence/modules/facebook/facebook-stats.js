(function() {
  "use strict";

  var FacebookStats, htmlString, modules,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  modules = Namespace('SEQ.modules');

  htmlString = "";

  SEQ.modules.FacebookStats = FacebookStats = (function() {

    function FacebookStats(options) {
      this.options = options;
      this.initFBStats = __bind(this.initFBStats, this);

      this.applySettings = __bind(this.applySettings, this);

      this.settings = {};
      this.container = {};
      this.inner = {};
      this.applySettings(options);
      this.initFBStats();
    }

    /**
    @param {Object}  options    User-defined options
    */


    FacebookStats.prototype.applySettings = function(options) {
      this.settings = {
        url: "https://api.facebook.com/method/fql.query?query=" + encodeURI("SELECT url, normalized_url, share_count, like_count, comment_count, total_count,commentsbox_count, comments_fbid, click_count FROM link_stat WHERE ") + "url=",
        page: 'site',
        debug: false,
        selectors: {
          container: this.options.container,
          inner: "facebook-item"
        }
      };
      return $.extend(true, this.settings, options);
    };

    FacebookStats.prototype.initFBStats = function() {
      var likePage,
        _this = this;
      if (this.settings.page != null) {
        if (this.settings.page === 'page') {
          likePage = window.location.href;
        } else {
          if (this.settings.debug === false) {
            likePage = 'http://' + window.location.host;
          } else {
            likePage = 'http://www.sequence.co.uk';
          }
        }
        return $.ajax(this.settings.url + "'" + likePage + "'", {
          dataType: 'xml',
          error: function(jqXHR, textStatus, errorThrown) {},
          success: function(data, textStatus, jqXHR) {
            var comment_count, like_count, link_stat, share_count, total_count;
            link_stat = $(data).find('link_stat').length;
            if (link_stat > 0) {
              share_count = $(data).find('share_count').text();
              like_count = $(data).find('like_count').text();
              comment_count = $(data).find('comment_count').text();
              total_count = $(data).find('total_count').text();
              htmlString += "<article class='" + _this.settings.selectors.inner + "'>";
              htmlString += "<p>Shared Count: " + share_count + "</p>";
              htmlString += "<p>Like Count: " + like_count + "</p>";
              htmlString += "<p>Comment Count: " + comment_count + "</p>";
              htmlString += "<p>Total Count: " + total_count + "</p>";
              htmlString += "</article>";
              return $(_this.settings.selectors.container).html(htmlString);
            }
          }
        });
      }
    };

    return FacebookStats;

  })();

}).call(this);
