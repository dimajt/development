app.define('menu', function(sb) {

    // --------------------
    // Variables
    // --------------------

    var $main,
        $menu,
        $shadow,
        $items,
        $languages,
        $date,
        $day;



    // --------------------
    // Handlers
    // --------------------

    function changeLocation() {
        console.log('!');
    }

    function showMenu() {
        $main.className = 'opened';
    }

    function hideMenu() {
        $main.className = '';
    }

    function setWidth(val) {
        $shadow.style.width = val + 'px';
    }



    // --------------------
    // Initialization
    // --------------------

    function elements() {
        $main = sb.id('menu');
        $items = sb.id('menu-items').children;
        $menu = sb.id('menu-element');
        $shadow = sb.id('menu-shadow');
        $languages = sb.id('menu-languages').children;
        $date = sb.id('menu-date');
        $day = sb.id('menu-day');
    }

    function events() {
        $shadow.on('click', hideMenu);
        $items.on('click', changeLocation);
        sb.listen('showMenu', showMenu);
        sb.listen('resize', setWidth);
    }

    return {

        init: function() {
            elements();
            events();
        }

    }

});
