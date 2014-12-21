HTMLElement.prototype.on = function(event, callback) {
    this.addEventListener(event, callback, false)
};
