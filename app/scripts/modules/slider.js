app.define('slider', function(sb) {

    var date;


    function setDate(value) {
        date = value;
    }

    function elements() {

    }

    function events() {
        sb.listen('set-date', setDate);
    }

    return {

        init: function() {
            elements();
            events();
        }

    }

});
