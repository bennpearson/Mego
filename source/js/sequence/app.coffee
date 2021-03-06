#  ____
# / ___|  ___  __ _ _   _  ___ _ __   ___  ___
# \___ \ / _ \/ _` | | | |/ _ \ '_ \ / __|/ _ \
#  ___) |  __/ (_| | |_| |  __/ | | | (__|  __/
# |____/ \___|\__, |\__,_|\___|_| |_|\___|\___|
#                |_|

"use strict"

utils = Namespace('SEQ.utils')
maps = Namespace('SEQ.gmaps')
modules = Namespace('SEQ.modules')
mego = Namespace("SEQ.mego")

# cache this reference
CoffeeSlider = modules.CoffeeSlider

class App
  #init function happens as soon as javascript is loaded
  constructor: ->
    $(document).ready @onDocReady

  # executes when document is ready
  onDocReady: =>
    @initCoffeeSlider()
    @initGallery()
    @initVideoPlayer()
    @initMaps()
    @initFlickrGallery()
    @initFlickrWidget()
    # @initFacebookStats()
    # @initSiteNav()
    # @initFaceBookFeed()

    @initFaq()
    # do this last or any references in the callbacks will be undefined
    @initMediaQueries()

  initMediaQueries: =>
    @mediaQueries = new utils.browser.MediaQueries()

  initCoffeeSlider: =>
    # init CoffeeSlider
    if $(".carousel").length > 0
      @coffeeSlider = new CoffeeSlider
        container: $(".carousel")
        transitionType: CoffeeSlider.TRANSITION_SLIDE
        loop: CoffeeSlider.LOOP_LIMIT
        transitionSpeed: 1400
        transitionDelay: 5000
        transitionDirection: CoffeeSlider.DIRECTION_HORIZONTAL
        touchStyle: CoffeeSlider.TOUCH_DRAG
        preload: true
        responsive: true
        selectors:
          slide: "figure"

  initGallery: =>
    # init CoffeeSlider
    if $(".gallery").length > 0
      @gallery = new modules.CoffeeGallery
        gallery: ".gallery"
        slider: ".gallery-carousel"
        thumbslider: ".thumbnails"
        autoThumbs: true
        stripElements: ["figcaption"]

  initVideoPlayer: ->
    if $("#player1").length > 0
      # init video player
      # to see player mode rendered just do:
      # player = new MediaElementPlayer("#player1",
      #  success: (media, node, player) ->
      #    console.log "Player mode: " + media.pluginType
      # )
      # See http://mediaelementjs.com/#api for callback options
      #
      player = new MediaElementPlayer("#player1")

  initMaps: ->
    if document.querySelector('#contact-widget .map')?
      @loadMapsApi @initContactWidgetMap

    if document.querySelector('#locations')?
      loadMapsApi initMapLocations

  loadMapsApi: (callback)->
    if google? and google.maps?
      callback.call()
    else
      mapsController = new maps.GoogleMapsApiController
        callback: callback

  initMapLocations: ->
    new maps.MapLocationsController
      DOMlocations: document.querySelectorAll('#location-listing li')
      mapOpts:
        mapEl: document.querySelector('#locations #map')

  initContactWidgetMap = ->
      zoom: 12
      mapEl: document.querySelector('#projects #map')
      locations: document.querySelectorAll('#project-listing li')
      mapTypeId: google.maps.MapTypeId.ROADMAP

  initContactWidgetMap: ->
    gmap = new maps.GoogleMap
      mapEl: document.querySelector('#contact-widget .map')
    gmap.centerOnAddress($("#contact-widget .adr"))

  initFlickrGallery: ->
    if document.querySelector('#flickr-gallery')?
      flickr = new modules.FlickrGallery
        apiKey:"a57204d74e7d388185a326741d19941f"
        userId:"62998169@N04"
        photoSetId:"72157627657152087"
        containerId:"flickr-gallery"
        thumbsPerPage:8
        showThumbs:true
        scaleMode:"scaleToFill"
        loaderGifSrc:"images/icons/ajax-loader.gif"

  initFlickrWidget: ->
    if document.querySelector('#flickr-widget')?
      flickr = new modules.FlickrGallery
        apiKey:"a57204d74e7d388185a326741d19941f"
        userId:"62998169@N04"
        photoSetId:"72157627657152087"
        containerId:"flickr-widget"
        thumbsPerPage:6
        showThumbs:false
        scaleMode:"scaleToFill"
        loaderGifSrc:"images/icons/ajax-loader.gif"

  # NOTE: if debug is true, http://www.sequence.co.uk is used
  initFacebookStats: ->
    facebook = new modules.FacebookStats
      container: $(".facebook-stats")
      page: 'site'
      debug: true

  initFaceBookFeed: ->
    facebookFeed = new modules.facebook.FacebookAPILoader()

  initFaq: ->
    @accordion = new modules.AccordionGroup $(".category"),
      selectors:
        main: "article"
        header: ".question"
        inner: ".answer"

  initSiteNav: ->
    @siteNav = new modules.Nav(document.querySelector("#site-nav"))

mego.app = new App()

