(function() {
  var utils;

  utils = Namespace("SEQ.utils");

  utils.dateutils = {
    ParseDate: function(string) {
      this.string = string;
      return this.string.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3');
    }
  };

}).call(this);
