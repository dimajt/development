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


Element.prototype.swipe = function(options) {

    var R1 = 10; // radius for detect swipe
    var R2 = 50; // radius for cancel swipe

    var drag = false; // cancel move event without start
    var swipe = false; // swipe indicator
    var disabled = false;

    var start; // start coordinates
    var last; // last event positions
    var passX, passY; // passed distances

    var mouseEvents = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    };

    var touchEvents = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    };

    var touch = 'ontouchstart' in window; // detect touch device
    var events = touch ? touchEvents : mouseEvents; // set swipe events

    // create object with handlers
    var handlers = {};
    for (var key in events) {
        handlers[key] = options[key] || function() {};
    }

    function coordinates(e) {
        var event = touch ? e.targetTouches[0] || e.changedTouches[0] : e;
        return {
            x: event.clientX,
            y: event.clientY
        };
    }

    function swipeStart(event) {

        if (disabled) return;

        start = coordinates(event);
        last = start;
        passX = 0;
        passY = 0;
        drag = true;
    }


    function swipeMove(event) {

        if (!drag) return;

        var position = coordinates(event);
        passX += Math.abs(position.x - last.x);
        passY += Math.abs(position.y - last.y);
        last = position;

        if (!swipe) {
            if (passX < R1 && passY < R1) {
                return;
            }
            if (passX > passY) {
                event.preventDefault();
                handlers.start(position);
                swipe = true;
                passX = 0;
                passY = 0;
            }
            else {
                swipeCancel();
            }
        }

        else {
            event.preventDefault();
            handlers.move(position);

            if (passX < R2 && passY < R2) {
                return;
            }

            if (passX > passY) {
                passX = 0;
                passY = 0;
            }
            else {
                swipeCancel();
            }

        }
    }

    function swipeEnd() {
        if (!swipe) return;
        swipeCancel();
    }

    function swipeCancel() {
        drag = false;
        swipe = false;
        handlers.end();
    }

    this.addEventListener(events.start, swipeStart, false);
    this.addEventListener(events.move, swipeMove, false);
    this.addEventListener(events.end, swipeEnd, false);
    if (touch) {
        this.addEventListener('touchcancel', swipeEnd, false);
    }

    this.disable = function() {
        disabled = true;
    };

    this.enable = function() {
        disabled = false;
    };

};



