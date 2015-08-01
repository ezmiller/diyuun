/**
 * Helpers
 */
(function() {
	'use strict';

	var Helpers = {};

	Helpers.stripHtml = function(html) {
		var tmp = document.createElement("DIV");
	  tmp.innerHTML = html;
	  return tmp.textContent || tmp.innerText || "";
	};

	Helpers.escapeHtml = function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
	};

	Helpers.decodeHTMLEntities = (function() {

		// Creates element just once.
		var element = document.createElement('div');

		function decodeEntities(str) {
			if (str && typeof str == 'string') {
				str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
	      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
	      element.innerHTML = str;
	      str = element.textContent;
	      element.textContent = '';
			}
			return str;
		}
		
		return decodeEntities;
	})();

	module.exports = Helpers;

	// Modifications to javscript Objects
	
	String.prototype.trunc =
   function(n,useWordBoundary) {
     var tooLong, _s;
     tooLong = this.length > n;
     _s = tooLong ? this.substr(0, n-1) : this;
     _s = useWordBoundary && tooLong ? _s.substr(0,_s.lastIndexOf(' ')) : _s;
     return  tooLong ? _s + " ..." : _s;
  }; 

}());