Element.prototype.on = function(event, callback) {
    this.addEventListener(event, callback);
};

HTMLCollection.prototype.on = function(event, callback) {
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event, callback, false);
    }
};
