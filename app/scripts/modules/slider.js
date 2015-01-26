app.define('slider', function(sb) {

    var $slider;
    var $slide;
    var $container;

    var $h1, $h2, $h3;
    var MS = 24 * 60 * 60 * 1000;


    var currentDateString = sb.getDateString();
    var currentDateObject = sb.getDateObject();

    var language = sb.getLanguage();



    function fillStatus(date) {
        var day = (date - currentDateObject) / MS;

        if (day < -2) {
            // n days ago
        }
        else if (day === -2) {
            return sb.getKey('dayBeforeYesterday');
        }
        else if (day === -1) {
            return sb.getKey('yesterday');
        }
        else if (day === 0) {
            return sb.getKey('today');
        }
        else if (day === 1) {
            return sb.getKey('tomorrow');
        }
        else if (day === 2) {
            return sb.getKey('dayAfterTomorrow');
        }
        else {
            // 3 days later
        }
    }

    function fillDay(date) {
        return sb.getKey('day', date.getDay());
    }

    function fillDate(date) {
        var d = date.getDate();
        var m = sb.getKey('month', date.getMonth());
        var y = date.getFullYear();
        return (language == 'en' ? m + ' ' + d : d + ' ' + m) + ', ' + y;
    }

    function fillClass(date) {
        return 'day' + date.getDay();
    }

    function create() {
        for (var i = 0; i < $slide.length; i++) {
            var date = new Date(currentDateString);
            date.setDate(date.getDate() - 1 + i);
            $slide[i].classList.add(fillClass(date));
            $h1[i].innerHTML = fillStatus(date);
            $h2[i].innerHTML = fillDay(date);
            $h3[i].innerHTML = fillDate(date);
        }
    }


    var start;
    var pass;
    var animation = false;
    var changes = false;

    function animationEnd() {
        animation = false;
        if (changes) {

            console.log(changes);

            if (changes === -1) {
                $slide[0]
            }

            changes = false;


        }
    }





    // ---------------------
    // Handlers
    // ---------------------

    function swipeEnd() {

        console.log('end');

        var width = window.innerWidth / 3;
        var style = 0;

        if (pass < -width / 3) {
            changes = -1;
            style = -width;

        }
        if (pass > width / 3) {
            changes = 1;
            style = width;
        }
        $container.style.webkitTransform = 'translateX(' + style + 'px)';
        animation = true;
        $container.className = '';
    }

    function swipeMove(position) {
        console.log('move');
        pass = position.x - start;
        $container.style.webkitTransform = 'translateX(' + pass + 'px)';
    }

    function swipeStart(position) {
        console.log('start');
        start = position.x;
        $container.className = 'swipe';
    }



    // ---------------------
    // Initialization
    // ---------------------

    function elements() {
        $slider = sb.id('slider');
        $container = sb.id('slider-container');
        $slide = sb.className('slide', $slider);


        $h1 = sb.tagName('h1', $slider);
        $h2 = sb.tagName('h2', $slider);
        $h3 = sb.tagName('h3', $slider);
    }

    function events() {
        $container.swipe({
            start: swipeStart,
            move: swipeMove,
            end: swipeEnd
        });
        $container.on('transitionend', animationEnd);
        $container.on('webkitTransitionEnd', animationEnd);
    }


    return {

        init: function() {
            elements();
            events();
            create();
        }

    }

});
