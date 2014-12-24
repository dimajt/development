app.define('init', function(sb) {

    var date = sb.date();
    var path = 'home';

    function resize() {
        sb.notify('resize', window.innerWidth);
    }

    return {

        init: function() {
            window.addEventListener('resize', resize, false);
            resize();
            sb.notify('locationChange', path);
            sb.notify('dateChange', date);
        }

    }

});
