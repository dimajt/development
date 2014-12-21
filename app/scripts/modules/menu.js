app.define('menu', function(sb) {

    var $menu;
    var visible = false;

    function menuToggle() {
        visible = !visible;
        $menu.style.display = visible ? 'block' : 'none';
    }

    return {

        init: function() {
            $menu = document.getElementById('menu');
            sb.listen('menuToggle', menuToggle)
        }

    }

});
