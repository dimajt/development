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
        },

        date: function() {
            var D = new Date();
            var date = D.getDate();
            var month = D.getMonth() + 1;
            var year = D.getFullYear();
            return year + '-' + month + '-' + date;
        }

    }

};
