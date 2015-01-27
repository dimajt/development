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
            end: 'mouseup',
            out: 'mouseout'
        }
    };

    var device = getDevice();
    var events = pointerEvents[device];

    function getDevice() {
        if ('ontouchstart' in window) return 'touch';
        if (window.navigator.msPointerEnabled) return 'msPinter';
        return 'mouse';
    }

    function getCoordinates(e) {
        var event = e; // temporary
        return {
            x: event.clientX,
            y: event.clientY
        };
    }

    function setHandlers(options) {
        return {
            start: options.start || function() {},
            move: options.move || function() {},
            end: options.end || function() {}
        }
    }

    function Swipe(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.handlers = {};
    }

    Swipe.prototype.bind = function(options) {
        this.handlers = setHandlers(options);
        this.element.addEventListener(events.start, this, false);
        document.addEventListener(events.move, this, false);
        document.addEventListener(events.end, this, false);
    };

    Swipe.prototype.start = function(event) {
        this.startPosition = getCoordinates(event);
        this.drag = true;
    };

    Swipe.prototype.move = function(event) {

        if (!this.drag) return;

        var position = getCoordinates(event);
        var passX = Math.abs(position.x - this.startPosition.x);
        var passY = Math.abs(position.y - this.startPosition.y);

        if (!this.swipe) {
            if (passX < radius && passY < radius) {
                return;
            }
            if (passX > passY) {
                this.swipe = true;
                this.handlers.start(position);
            }
            else {
                this.end();
            }
        }
        else {
            this.handlers.move(position);
        }
    };

    Swipe.prototype.end = function() {

        this.drag = false;

        if (this.swipe) {
            this.handlers.end();
            this.swipe = false;
        }
    };




    Swipe.prototype.handleEvent = function(e) {

        // slow?

        switch(e.type) {

            case pointerEvents.touch.start:
            case pointerEvents.msPointer.start:
            case pointerEvents.mouse.start:
                this.start(e);
                break;

            case pointerEvents.touch.move:
            case pointerEvents.msPointer.move:
            case pointerEvents.mouse.move:
                this.move(e);
                break;

            case pointerEvents.touch.end:
            case pointerEvents.touch.cancel:
            case pointerEvents.msPointer.end:
            case pointerEvents.mouse.end:
                this.end(e);
                break;
        }
    };

    window.Swipe = Swipe;

})(window, document);