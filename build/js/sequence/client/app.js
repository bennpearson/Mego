(function() {
  "use strict";

  var App, CoffeeSlider, maps, mego, modules, utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  utils = Namespace('SEQ.utils');

  maps = Namespace('SEQ.gmaps');

  modules = Namespace('SEQ.modules');

  mego = Namespace("SEQ.mego");

  CoffeeSlider = modules.CoffeeSlider;

  App = (function() {

    function App() {
      this.initGallery = __bind(this.initGallery, this);

      this.initCoffeeSlider = __bind(this.initCoffeeSlider, this);

      this.initMediaQueries = __bind(this.initMediaQueries, this);

      this.onDocReady = __bind(this.onDocReady, this);
      $(document).ready(this.onDocReady);
    }

    App.prototype.onDocReady = function() {
      this.initCoffeeSlider();
      this.initGallery();
      this.initVideoPlayer();
      this.initMaps();
      this.initFlickrGallery();
      this.initFlickrWidget();
      this.initSiteNav();
      return this.initMediaQueries();
    };

    App.prototype.initMediaQueries = function() {
      return this.mediaQueries = new utils.browser.MediaQueries();
    };

    App.prototype.initCoffeeSlider = function() {
      if ($(".carousel").length > 0) {
        return this.coffeeSlider = new CoffeeSlider({
          container: $(".carousel"),
          transitionType: CoffeeSlider.TRANSITION_SLIDE,
          loop: CoffeeSlider.LOOP_LIMIT,
          transitionSpeed: 1400,
          transitionDelay: 5000,
          transitionDirection: CoffeeSlider.DIRECTION_HORIZONTAL,
          touchStyle: CoffeeSlider.TOUCH_DRAG,
          preload: true,
          responsive: true,
          selectors: {
            slide: "figure"
          }
        });
      }
    };

    App.prototype.initGallery = function() {
      if ($(".gallery").length > 0) {
        return this.gallery = new modules.CoffeeGallery({
          gallery: ".gallery",
          slider: ".gallery-carousel",
          thumbslider: ".thumbnails",
          autoThumbs: true,
          stripElements: ["figcaption"]
        });
      }
    };

    App.prototype.initVideoPlayer = function() {
      var player;
      if ($("#player1").length > 0) {
        return player = new MediaElementPlayer("#player1");
      }
    };

    App.prototype.initMaps = function() {
      if (document.querySelector('#contact-widget .map') != null) {
        this.loadMapsApi(this.initContactWidgetMap);
      }
      if (document.querySelector('#projects') != null) {
        return this.loadMapsApi(this.initMapLocations);
      }
    };

    App.prototype.loadMapsApi = function(callback) {
      var mapsController;
      if ((typeof google !== "undefined" && google !== null) && (google.maps != null)) {
        return callback.call();
      } else {
        return mapsController = new maps.GoogleMapsApiController({
          sensor: true,
          callback: callback
        });
      }
    };

    App.prototype.initMapLocations = function() {
      return new maps.MapLocationsController({
        zoom: 12,
        mapEl: document.querySelector('#projects #map'),
        locations: document.querySelectorAll('#project-listing li'),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    };

    App.prototype.initContactWidgetMap = function() {
      var gmap;
      gmap = new maps.GoogleMap({
        mapEl: document.querySelector('#contact-widget .map'),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeIds: [],
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
      });
      return gmap.centerOnAddress($("#contact-widget .adr"));
    };

    App.prototype.initFlickrGallery = function() {
      var flickr;
      if (document.querySelector('#flickr-gallery') != null) {
        return flickr = new modules.FlickrGallery({
          apiKey: "a57204d74e7d388185a326741d19941f",
          userId: "62998169@N04",
          photoSetId: "72157627657152087",
          containerId: "flickr-gallery",
          thumbsPerPage: 8,
          showThumbs: true,
          scaleMode: "scaleToFill",
          loaderGifSrc: "images/icons/ajax-loader.gif"
        });
      }
    };

    App.prototype.initFlickrWidget = function() {
      var flickr;
      if (document.querySelector('#flickr-widget') != null) {
        return flickr = new modules.FlickrGallery({
          apiKey: "a57204d74e7d388185a326741d19941f",
          userId: "62998169@N04",
          photoSetId: "72157627657152087",
          containerId: "flickr-widget",
          thumbsPerPage: 6,
          showThumbs: false,
          scaleMode: "scaleToFill",
          loaderGifSrc: "images/icons/ajax-loader.gif"
        });
      }
    };

    App.prototype.initFacebookStats = function() {
      var facebook;
      return facebook = new modules.FacebookStats({
        container: $(".facebook-stats"),
        page: 'site',
        debug: true
      });
    };

    App.prototype.initFaceBookFeed = function() {
      var facebookFeed;
      return facebookFeed = new modules.facebook.FacebookAPILoader();
    };

    App.prototype.initSiteNav = function() {
      return this.siteNav = new modules.Nav(document.querySelector("#site-nav"));
    };

    return App;

  })();

  mego.app = new App();

}).call(this);
