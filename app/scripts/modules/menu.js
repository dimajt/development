app.define('menu', function(sb) {

    // --------------------
    // Variables
    // --------------------

    var $main,
        $menu,
        $shadow,
        $items,
        $keys,
        $languages,
        $date,
        $day,
        $current;

    var sections = [
        'home',
        'weather',
        'holidays',
        'events',
        'births',
        'horoscope'
    ];
    var animation = false;
    var redirect = false;
    var section = sb.getSection();




    // --------------------
    // Handlers
    // --------------------

    function animationEnd() {
        animation = false;
        if (redirect) {
            redirect = false;
            sb.notify('changeSection', section);
        }
    }

    function changeLocation() {
        if (!animation) {
            var path = this.getAttribute('data-path');
            if (path !== section) {
                section = path;
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

    function setWidth() {
        $shadow.style.width = window.innerWidth + 'px';
    }



    // --------------------
    // Initialization
    // --------------------

    function setSections() {
        for (var i = 0; i < $items.length; i++) {
            $items[i].querySelector('span').innerHTML = sb.getKey(sections[i]);
        }
    }

    function setCurrent() {
        $current.className = 'current';
    }

    function elements() {
        $main = sb.id('menu');
        $items = sb.id('menu-items').children;
        $menu = sb.id('menu-element');
        $shadow = sb.id('menu-shadow');
        $languages = sb.id('menu-languages').children;
        $date = sb.id('menu-date');
        $day = sb.id('menu-day');
        $current = $items[sections.indexOf(section)];
    }

    function events() {
        $shadow.on('click', hideMenu);
        $items.on('click', changeLocation);
        $menu.on('transitionend', animationEnd);
        $menu.on('webkitTransitionEnd', animationEnd);
        window.on('resize', setWidth);
        sb.listen('showMenu', showMenu);

    }

    return {

        init: function() {
            elements();
            events();
            setWidth();
            setCurrent();
            setSections();
        }

    }

});
