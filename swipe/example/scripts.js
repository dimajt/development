Element.prototype.translateX = function(val) {
    this.style.webkitTransform = 'translateX(' + val + 'px)';
    this.style.mozTransform = 'translateX(' + val + 'px)';
    this.style.transform = 'translateX(' + val + 'px)';
};


function Demo() {

    // -----------------------
    // Variables & constants
    // -----------------------

    var $menu = document.getElementById('menu-element');
    var $items = $menu.getElementsByTagName('a');
    var $shadow = document.getElementById('menu-shadow');
    var $toolbar = document.getElementById('toolbar');
    var $toggle = document.getElementById('toggle');
    var $slider = document.getElementById('slider');
    var $container = document.getElementById('slider-container');

    var menuSwipe = new Swipe(document);
    var sliderSwipe = new Swipe($slider);

    var width;

    var menu = {
        width: 240,
        position: 0,
        start: null,
        pass: null
    };

    var slider = {
        position: 0,
        start: null,
        pass: null,
        length: 5,
        current: 0
    };



    // -----------------------
    // Handlers
    // -----------------------

    function sliderSwipeStart(position) {
        slider.start = position.x;
        $container.className = 'swipe';
    }

    function sliderSwipeMove(position) {
        slider.pass = slider.position + position.x - slider.start;
        if (slider.pass > 0) slider.pass = 0;
        if (slider.pass < -width * (slider.length - 1)) slider.pass = -width * (slider.length - 1);
        $container.translateX(slider.pass);
    }

    function sliderSwipeEnd() {
        if (slider.pass < slider.position - width / 4) {
            slider.position = slider.position - width;
        }
        else if (slider.pass > slider.position + width / 4) {
            slider.position = slider.position + width;
        }
        slider.current = Math.abs(slider.position / width);
        $container.className = '';
        $container.translateX(slider.position);
    }

    function menuSwipeStart(position) {
        menu.start = position.x;
        $menu.className = 'swipe';
    }

    function menuSwipeMove(position) {
        menu.pass = menu.position + position.x - menu.start;
        if (menu.pass < 0) menu.pass = 0;
        if (menu.pass > menu.width) menu.pass = menu.width;
        if (!$shadow.className && !menu.position && menu.pass > 0) {
            $shadow.className = 'show';
        }
        $menu.translateX(menu.pass);
    }

    function menuSwipeEnd() {
        menu.position = menu.pass > menu.width / 2 ? menu.width : 0;
        $menu.className = '';
        $menu.translateX(menu.position);
        $shadow.className = menu.position ? 'show' : '';
    }

    function menuToggle() {
        menu.position = menu.position ? 0 : menu.width;
        $menu.translateX(menu.position);
        $shadow.className = menu.position ? 'show' : '';
    }

    function resize() {
        width = document.body.offsetWidth;
        slider.position = slider.current * -width;
        $toolbar.style.width = width + 'px';
        $shadow.style.width = width + 'px';
        $container.translateX(slider.position);
    }

    function changeItem() {
        for (var i = 0; i < $items.length; i++) {
            $items[i].className = '';
        }
        this.className = 'current';
        menuToggle();
    }



    // -----------------------
    // Events
    // -----------------------

    window.addEventListener('resize', resize, false);
    $toggle.addEventListener('click', menuToggle, false);

    sliderSwipe.bind({
        start: sliderSwipeStart,
        move: sliderSwipeMove,
        end: sliderSwipeEnd
    });

    menuSwipe.bind({
        start: menuSwipeStart,
        move: menuSwipeMove,
        end: menuSwipeEnd
    });

    for (var i = 0; i < $items.length; i++) {
        $items[i].addEventListener('click', changeItem, false);
    }





    // -----------------------
    // Initialization
    // -----------------------

    resize();






}

document.addEventListener('DOMContentLoaded', Demo, false);

