(function() {
  var facebook,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  facebook = Namespace("SEQ.modules.facebook");

  facebook.FacebookAPILoader = (function() {

    function FacebookAPILoader(options) {
      this.options = options;
      this.onLoadComplete = __bind(this.onLoadComplete, this);

      this.onLoadError = __bind(this.onLoadError, this);

      this.onDataSuccess = __bind(this.onDataSuccess, this);

      this.loadData = __bind(this.loadData, this);

      this.applySettings = __bind(this.applySettings, this);

      this.init = __bind(this.init, this);

      this.init();
    }

    FacebookAPILoader.prototype.init = function() {
      var YOUR_APP_ID, YOUR_APP_SECRET;
      YOUR_APP_ID = "316388251782445";
      YOUR_APP_SECRET = "03b0e2d1db3b1c18a11a04069d319906";
      this.url = "https://graph.facebook.com/oauth/access_token?client_id=" + YOUR_APP_ID + "&client_secret=" + YOUR_APP_SECRET + "&grant_type=client_credentials";
      return this.loadData();
    };

    FacebookAPILoader.prototype.applySettings = function() {
      this.settings = {
        url: "https://graph.facebook.com/"
      };
      return $.extend(true, this.settings, this.options);
    };

    FacebookAPILoader.prototype.loadData = function() {
      return $.ajax(this.url, {
        success: this.onDataSuccess,
        error: this.onLoadError,
        complete: this.onLoadComplete
      });
    };

    FacebookAPILoader.prototype.onDataSuccess = function(data, textStatus, jqXHR) {
      var _this = this;
      return $.ajax("https://graph.facebook.com/" + 699178242 + "/statuses?" + data, {
        success: function(data, textStatus, jqXHR) {
          return console.log(data);
        }
      });
    };

    FacebookAPILoader.prototype.onLoadError = function(jqXHR, textStatus, errorThrown) {
      return console.log(jqXHR, textStatus, errorThrown);
    };

    FacebookAPILoader.prototype.onLoadComplete = function(jqXHR, textStatus) {
      return console.log(textStatus);
    };

    return FacebookAPILoader;

  })();

}).call(this);
