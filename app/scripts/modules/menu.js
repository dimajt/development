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
        $day,
        $current;

    var path = 'home';
    var animation = false;
    var redirect = false;





    // --------------------
    // Handlers
    // --------------------

    function animationEnd() {
        animation = false;
        if (redirect) {
            redirect = false;
            sb.notify('locationChange', {path: path});
        }
    }

    function changeLocation() {
        if (!animation) {
            var pathAttr = this.getAttribute('data-path');
            if (pathAttr !== path) {
                path = pathAttr;
                $current.className = '';
                $current = this;
                $current.className = 'current';
                redirect = true;
            }
        }
        hideMenu();
    }

    function showMenu() {
        if (!animation) {
            animation = true;
            $main.className = 'opened';
        }
    }

    function hideMenu() {
        if (!animation) {
            animation = true;
            $main.className = '';
        }
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
        $current = $items[0];
    }

    function events() {
        $shadow.on('click', hideMenu);
        $items.on('click', changeLocation);
        $menu.on('transitionend', animationEnd);
        $menu.on('webkitTransitionEnd', animationEnd);
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
