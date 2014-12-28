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


Element.prototype.swipe = function(handlers) {

    var radius = 10;
    var drag = false;
    var swipe = false;

    var start = {};
    var pass = {};
    var last = {};

    var mouseEvents = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    };

    var touchEvents = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
        cancel: 'touchcancel'
    };

    var touch = 'ontouchstart' in window;
    var events = touch ? touchEvents : mouseEvents;

    function coordinates(e) {
        var touches = e.touches && e.touches.length ? e.touches : [e];
        var event = e.changedTouches && e.changedTouches[0] || e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] || touches[0].originalEvent || touches[0];
        return {
            x: event.clientX,
            y: event.clientY
        };
    }

    function swipeStart(event) {
        start = coordinates(event);
        last = start;
        drag = true;
        pass.x = 0;
        pass.y = 0;
    }

    function swipeMove(event) {
        if (!drag) return;

        var position = coordinates(event);
        pass.x += Math.abs(position.x - last.x);
        pass.y += Math.abs(position.y - last.y);
        last = position;

        if (pass.x < radius && pass.y < radius) {
            return;
        }

        if (pass.x > pass.y) {

            event.preventDefault();

            if (!swipe) {
                handlers.start(position);
                swipe = true;
                return;
            }

            handlers.move(position);

        }
        else {
            drag = false;
            swipe = false;
            handlers.end();
        }
    }

    function swipeEnd() {
        if (!swipe) return; // ???
        drag = false;
        swipe = false;
        handlers.end();
    }

    function swipeCancel() {
        drag = false;
        swipe = false;
        handlers.end();
    }

    this.addEventListener(events.start, swipeStart);
    this.addEventListener(events.move, swipeMove);
    this.addEventListener(events.end, swipeEnd);
    if (events.cancel) {
        this.addEventListener(events.cancel, swipeCancel);
    }

};

