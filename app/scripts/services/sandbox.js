app.sandbox = function(core) {

    return {

        listen: function(event, callback) {
            core.createEvent(event, callback);
        },

        notify: function(event, value) {
            core.fireEvent(event, value);
        },

        id: function(id) {
            return document.getElementById(id);
        },

        getKey: function(key) {
            return core.data.getKey(key);
        },

        getDate: function() {
            return core.data.getDate();
        },

        getSection: function() {
            return core.data.getSection();
        }

    }

};
