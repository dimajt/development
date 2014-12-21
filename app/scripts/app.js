var app = (function() {

    var modules = {};
    var events = {};

    return {

        define: function(name, value) {
            modules[name] = value;
        },

        start: function() {
            for (var module in modules) {
                modules[module] = modules[module](app.sandbox(this));
                modules[module].init();
            }
        },

        createEvent: function(event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);

        },

        fireEvent: function(event, value) {
            if (events[event]) {
                for (var i = 0; i < events[event].length; i++) {
                    events[event][i](value);
                }
            }
        }



    }

})();
