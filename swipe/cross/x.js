(function(window) {

    var jQuery = function( selector, context ) {
        return new jQuery.fn.init( selector, context );
    };

    jQuery.fn = jQuery.prototype = {

        constructor: jQuery,

        //length: 0,

        toArray: function() {
            return 'toArray';
        },

        get: function() {
            return 'get'
        },

        init: function() {

        }
    };

    jQuery.fn.init = function(selector, context ) {
    };

    jQuery.fn.init.prototype = jQuery.fn;


    window.jQuery = jQuery;

})(window);

//console.log(jQuery());


