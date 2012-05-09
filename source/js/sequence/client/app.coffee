#  ____                                       
# / ___|  ___  __ _ _   _  ___ _ __   ___  ___ 
# \___ \ / _ \/ _` | | | |/ _ \ '_ \ / __|/ _ \
#  ___) |  __/ (_| | |_| |  __/ | | | (__|  __/
# |____/ \___|\__, |\__,_|\___|_| |_|\___|\___|
#                |_|   
         
"use strict"  

utils = SEQ.utils.namespace('SEQ.utils')
maps = utils.namespace('SEQ.gmaps')
modules = utils.namespace('SEQ.modules')
Project_Namespace = utils.namespace "SEQ.project_namespace"

#init function happens as soon as javascript is loaded
do init = ->
	# console.log "init"
	$(document).ready ->
    onDocReady()
# executes when document is ready
onDocReady = ->
    initCoffeeSlider()
    initGallery()
    initVideoPlayer()   
    initMaps()
    
initCoffeeSlider = ->  
  # init CoffeeSlider
  if $(".carousel").length > 0
    coffeeslider = new modules.CoffeeSlider
      container: $(".carousel")
      transitionType: "slide"
      loop: "infinite"
      transitionSpeed: 1400
      transitionDelay: 5000
      transitionDirection: "horizontal"
      touchStyle: "drag"
      preload: true
      responsive: false
      selectors:
        slide: "figure"

initGallery = ->
  # init CoffeeSlider
  if $(".gallery").length > 0
    thumbnails = new modules.ThumbSlider
      container: $(".thumbnails")
      transitionType: "slide"
      loop: "infinite"
      transitionSpeed: 1400
      transitionDelay: 5000
      transitionDirection: "horizontal"
      touchStyle: "drag"
      preload: true
      step: 3
      responsive: false
      hasDotNav: false
      selectors:
       slide: "figure"
  
    coffeeslider.registerNavModule(thumbnails)

initVideoPlayer = ->
  if $("#player1").length > 0  
     # init video player
     player = new MediaElementPlayer("#player1")  

initMaps = ->
  mapsController = new maps.GoogleMapsApiController
    sensor: true
    callback: onMapsApiLoaded
    
onMapsApiLoaded = ->
  initContactWidgetMap()

initContactWidgetMap = -> 
  contactWidgetMap = document.querySelector('#contact-widget .map')
  
  if contactWidgetMap?
    adr = $("#contact-widget .adr")
    street = adr.find(".street-address").html()
    locality = adr.find(".locality").html()
    postcode = adr.find(".postal-code").html()
    gmap = new maps.GoogleMap
      mapEl: contactWidgetMap
      zoom: 12
      mapTypeId: google.maps.MapTypeId.ROADMAP      
      mapTypeIds: []
      panControl: false
      zoomControl: false
      mapTypeControl: false
      scaleControl: false
      streetViewControl: false
      overviewMapControl: false
    gmap.centerOnAddress("#{street}, #{locality}, #{postcode}")
    
        
   
   


