/*!
 * swipe.js
 * Copyright (c) 2015 Dmitriy Karpov, dimajt@gmail.com
 * Released under MIT license
 */

(function(window, document) {

    'use strict';

    var radius = 10;

    var pointerEvents = {
        touch: {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            cancel: 'touchcancel'
        },
        msPointer: {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            end: 'MSPointerUp'
        },
        mouse: {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
        }
    };

    var device = getDevice();
    var events = pointerEvents[device];

    function getDevice() {
        if ('ontouchstart' in window) return 'touch';
        if (window.navigator.msPointerEnabled) return 'msPointer';
        return 'mouse';
    }

    function Swipe(el) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
    }

    Swipe.prototype.bind = function(options) {
        this.setHandlers(options);
        this.el.addEventListener(events.start, this, false);
        document.addEventListener(events.move, this, false);
        document.addEventListener(events.end, this, false);
    };

    Swipe.prototype.disable = function() {
        this.disabled = true;
    };

    Swipe.prototype.enable = function() {
        this.disabled = false;
    };

    Swipe.prototype.setHandlers = function(options) {
        this.handlers = {
            start: options.start || function() {},
            move: options.move || function() {},
            end: options.end || function() {}
        }
    };

    Swipe.prototype.getCoordinates = function(event) {
        var e = device === 'touch' ? event.targetTouches[0] || event.changedTouches[0] : event;
        return {
            x: e.clientX,
            y: e.clientY
        };
    };

    Swipe.prototype.start = function(event) {
        if (this.disabled) return;
        this.startPosition = this.getCoordinates(event);
        this.drag = true;
    };

    Swipe.prototype.move = function(event) {

        if (!this.drag) return;

        var position = this.getCoordinates(event);

        if (this.swipe) {
            event.preventDefault();
            this.handlers.move(position, event);
            return;
        }

        var passX = Math.abs(position.x - this.startPosition.x);
        var passY = Math.abs(position.y - this.startPosition.y);

        if (passX < radius && passY < radius) {
            return;
        }
        if (passX > passY) {
            this.swipe = true;
            this.handlers.start(position, event);
            event.preventDefault();
            return;
        }

        this.end();
    };

    Swipe.prototype.end = function() {
        this.drag = false;
        if (this.swipe) {
            this.handlers.end();
            this.swipe = false;
        }
    };


    Swipe.prototype.handleEvent = function(e) {

        switch(e.type) {

            case 'touchstart':
            case 'pointerdown':
            case 'MSPointerDown':
            case 'mousedown':
                this.start(e);
                break;

            case 'touchmove':
            case 'pointermove':
            case 'MSPointerMove':
            case 'mousemove':
                this.move(e);
                break;

            case 'touchend':
            case 'pointerup':
            case 'MSPointerUp':
            case 'mouseup':
            case 'touchcancel':
            case 'pointercancel':
            case 'MSPointerCancel':
            case 'mousecancel':
                this.end(e);
                break;
        }
    };

    window.Swipe = Swipe;

})(window, document);