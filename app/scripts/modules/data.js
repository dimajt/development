app.define('data', function(sb) {


    var date = 12;
    var item = 'home';


    return {

        init: function() {

            sb.notify('set-date', date);
            sb.notify('set-item', item);

        }

    }

});
