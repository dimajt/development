app.sandbox = function(core) {

    return {

        listen: function(event, callback) {
            core.createEvent(event, callback)
        },

        notify: function(event, value) {
            core.fireEvent(event, value)
        },

        id: function(id) {
            return document.getElementById(id);
        }

    }

};
