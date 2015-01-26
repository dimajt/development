app.define('content', function(sb) {

    // --------------------
    // Variables
    // --------------------

    var $content;

    var date = sb.getDateString();
    var section = 'home';
    var visible = true;



    // --------------------
    // Handlers
    // --------------------

    function animationEnd() {
        if (!visible) {
            $content.innerHTML = section + '<br>' + date;
            $content.className = '';
            visible = true;
        }
    }

    function changeLocation() {
        visible = false;
        $content.className = 'hide';
    }

    function changeSection(value) {
        section = value;
        changeLocation();
    }

    function changeDate(value) {
        date = value;
        changeLocation();
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
        sb.listen('changeSection', changeSection);
        sb.listen('changeDate', changeDate);
    }

    return {

        init: function() {
            elements();
            events();
            changeLocation();
        }

    }

});