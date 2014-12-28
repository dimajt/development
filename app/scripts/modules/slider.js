app.define('slider', function(sb) {

    var $slider;

    function swipeStart() {
        console.log('start');
    }

    function swipeMove() {
        console.log('move');
    }

    function swipeEnd() {
        console.log('end');
    }

    function elements() {
        $slider = sb.id('slider');
    }

    function events() {

        $slider.swipe({
            start: swipeStart,
            move: swipeMove,
            end: swipeEnd
        });

    }

    return {

        init: function() {
            elements();
            events();
        }

    }

});
