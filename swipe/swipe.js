/*!
 * swipe.js
 * Copyright (c) 2015 Dmitriy Karpov, dimajt@gmail.com
 * Released under MIT license
 */

(function(window, document) {

    'use strict';

    var POINTER_EVENTS = {
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

    var RADIUS = 10;
    var TOUCH = 'ontouchstart' in window;
    var MS_POINTER = window.navigator.msPointerEnabled;
    var DEVICE = getDevice();
    var EVENTS = POINTER_EVENTS[DEVICE];

    function getDevice() {
        if (TOUCH) return 'touch';
        if (MS_POINTER) return 'msPinter';
        return 'mouse';
    }

    function getCoordinates(e) {
        var event = e; // temporary
        return {
            x: event.clientX,
            y: event.clientY
        };
    }

    function Swipe(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.handlers = {};
    }

    Swipe.prototype.bind = function(options) {
        for (var event in events) {
            this.handlers[event] = options[event] || function() {};
            this.element.addEventListener(events[event], this, false);
        }
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
            if (passX < RADIUS && passY < RADIUS) {
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
            case pointerEvents.ms.start:
            case pointerEvents.mouse.start:
                this.start(e);
                break;

            case pointerEvents.touch.move:
            case pointerEvents.ms.move:
            case pointerEvents.mouse.move:
                this.move(e);
                break;

            case pointerEvents.touch.end:
            case pointerEvents.touch.cancel:
            case pointerEvents.ms.end:
            case pointerEvents.mouse.end:
                this.end(e);
                break;
        }
    };

    window.Swipe = Swipe;

})(window, document);