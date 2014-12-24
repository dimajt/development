app.define('content', function(sb) {

    // --------------------
    // Variables
    // --------------------

    var $content;

    var date;
    var path;
    var visible = true;
    var history = [];



    // --------------------
    // Handlers
    // --------------------

    function animationEnd() {
        if (!visible) {
            $content.innerHTML = path + '<br>' + date;
            $content.className = '';
            visible = true;
        }
    }

    function locationChange(event) {
        path = event.path || path;
        date = event.date || date;
        visible = false;
        $content.className = 'hide';
    }



    // --------------------
    // Initialization
    // --------------------

    function elements() {
        $content = sb.id('content');
    }

    function events() {
        $content.on('transitionend', animationEnd);
        $content.on('webkitTransitionEnd', animationEnd);
        sb.listen('locationChange', locationChange);
    }

    return {

        init: function() {
            elements();
            events();
        }

    }

});