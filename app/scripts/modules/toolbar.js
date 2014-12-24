app.define('toolbar', function(sb) {

    // --------------------
    // Variables
    // --------------------

    var $toolbar,
        $menu,
        $calendar,
        $title;



    // --------------------
    // Handlers
    // --------------------

    function setWidth(val) {
        $toolbar.style.width = val + 'px';
    }

    function showMenu() {
        sb.notify('showMenu');
    }



    // --------------------
    // Initialization
    // --------------------

    function elements() {
        $toolbar = sb.id('toolbar');
        $menu = sb.id('toolbar-menu');
        $calendar = sb.id('toolbar-calendar');
        $title = sb.id('toolbar-title');
    }

    function events() {
        $menu.on('click', showMenu);
        sb.listen('resize', setWidth);
    }

    return {

        init: function() {
            elements();
            events();
        }

    }

});
