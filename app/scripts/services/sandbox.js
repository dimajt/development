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

        className: function(value, node) {
            return node.getElementsByClassName(value);
        },

        tagName: function(value, node) {
            return node.getElementsByTagName(value);
        },

        getKey: function() {
            return core.data.getKey.apply(null, arguments);
        },

        getDateString: function() {
            return core.data.getDateString();
        },

        getDateObject: function() {
            return core.data.getDateObject();
        },

        getSection: function() {
            return core.data.getSection();
        },

        getLanguage: function() {
            return core.data.getLanguage();
        }

    }

};
