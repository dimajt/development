app.define('init', function(sb) {

    function resize() {
        sb.notify('resize', window.innerWidth);
    }

    return {

        init: function() {
            window.addEventListener('resize', resize, false);
            resize();
        }

    }

});
