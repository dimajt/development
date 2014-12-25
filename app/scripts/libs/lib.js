Element.prototype.on = function(event, callback) {
    this.addEventListener(event, callback, false);
};

HTMLCollection.prototype.on = function(event, callback) {
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event, callback, false);
    }
};
Window.prototype.on = function(event, callback) {
    this.addEventListener(event, callback, false);
};
Date.prototype.reformat = function() {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var date = this.getDate();
    return year + '-' + month + '-' + date;
};
