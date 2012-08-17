"use strict"

modules = Namespace('SEQ.modules')
animate = Namespace('SEQ.effects.Transition')

class modules.AccordionGroup
  
  # initial settings
  this.settings = {}
  
  constructor: (this.container, options) ->
    
    this.applySettings(options)
    this.sections = []
    
    for section in this.container.find(this.settings.selectors.main)
      this.sections.push(new modules.Accordion(section, this.settings))     
  
  # 
  # Private Methods
  # _____________________________________________________________________________________

  applySettings: (options) =>
    
    # merge defaults with options
    this.settings =
      openDuration: 300
      closeDuration: 300
      selectors:
        main: ".section"
        header: "header"
        inner: ".inner"
        
    $.extend true, this.settings, options
   
  open: (index, openDuration) =>    
    this.sections[index||=0].open(openDuration||=this.settings.openDuration)
   
class modules.Accordion
  
  constructor: (container, settings) ->
    this.isOpen = false
    this.settings = settings
    this.container = $(container)

    this.inner = this.container.find(this.settings.selectors.inner)
    this.inner.css
      overflow: "hidden"
    this.openHeight = this.inner.outerHeight()
      
    this.header = this.container.find(this.settings.selectors.header)
    this.header.css
      cursor: "pointer"
    
    this.header.on("click", this.onHeaderClick)
    #prevent selection
    this.header.on("mousedown", (e) =>
      e.preventDefault();
    )

    this.close 0
   
  onHeaderClick: (e) =>
    e.preventDefault()
    if this.isOpen 
      this.close(this.settings.openDuration)
    else 
      this.open(this.settings.closeDuration)

  # 
  # Public Methods
  # _____________________________________________________________________________________


  close:(duration) =>
    this.container.addClass("closed").removeClass("open")
    this.isOpen = false;
    # this.inner.css
    #   height: this.inner.outerHeight()       
    
    setTimeout =>
      animate.To
       target: this.inner,
       duration: duration,
       props:
         height: "0px",
         opacity: 0
    , 100
 
  open: (duration) =>
    this.container.addClass("open").removeClass("closed")    
    this.isOpen = true

    animate.To
     target: this.inner,
     duration: duration,
     props:
       height: "#{this.openHeight}px",
       opacity: 1    
     complete: =>
       this.inner.css
        height: "auto"
        
        
  