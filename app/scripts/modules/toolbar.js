app.define('toolbar', function(sb) {

    // --------------------
    // Variables
    // --------------------

    var $toolbar,
        $menu,
        $calendar,
        $title;

    var section = sb.getSection();




    // --------------------
    // Handlers
    // --------------------

    function setWidth() {
        $toolbar.style.width = window.innerWidth + 'px';
    }

    function showMenu() {
        sb.notify('showMenu');
    }

    function writeTitle(value) {
        $title.innerHTML = sb.getKey(value);
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
        window.on('resize', setWidth);
        sb.listen('changeSection', writeTitle);
    }

    return {

        init: function() {


            elements();
            events();
            setWidth();
            writeTitle(section);
        }

    }

});
