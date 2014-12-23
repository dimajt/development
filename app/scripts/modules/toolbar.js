app.define('toolbar', function(sb) {

    var $menu;
    var $calendar;
    var $title;

    function changeTitle() {
        console.log('change title');
    }

    function menuToggle() {
        sb.notify('menuToggle');
    }

    function toggleCalendar() {
        console.log('show menu');
    }

    function changes() {

    }

    return {

        init: function() {


            $menu = document.getElementById('toolbar-menu');
            $calendar = document.getElementById('toolbar-calendar');
            $title = document.getElementById('toolbar-title');

            $menu.addEventListener('click', menuToggle, false);
            $calendar.addEventListener('click', toggleCalendar, false);

            sb.listen('changeSection', changeTitle);
            sb.listen('menuToggle', changes);

        }

    }

});
