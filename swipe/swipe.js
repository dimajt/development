/*!
 * swipe.js
 * Copyright (c) 2015 Dmitriy Karpov, dimajt@gmail.com
 * Released under MIT license
 */

(function(window, document, undefined) {

    'use strict';

    // device
    // events
    // handlers

    var device = getDevice();
    var events = getEvents();



    function Swipe(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.disabled = false;
        this.handlers = {
            start: function() {},
            move: function() {},
            end: function() {}
        };
        this.device = 'ontouchstart' in window && 'touch' || window.navigator.msPointerEnabled && 'msPointer' || 'mouse';
    }

    Swipe.prototype.bind = function(options) {


        for (var event in events) {}

        this.options = options;

        if (this.device === 'touch') {
            this.element.addEventListener('touchstart', this, false);
            this.element.addEventListener('touchmove', this, false);
            this.element.addEventListener('touchend', this, false);
            this.element.addEventListener('touchcancel', this, false);
        }
        else if (this.device === 'msPointer') {
            this.element.addEventListener('MSPointerDown', this, false);
            this.element.addEventListener('MSPointerMove', this, false);
            this.element.addEventListener('MSPointerUp', this, false);
        }
        else {
            this.element.addEventListener('mousedown', this, false);
            this.element.addEventListener('mousemove', this, false);
            this.element.addEventListener('mouseup', this, false);
        }
    };

    Swipe.prototype.enable = function() {
        this.disabled = false;
    };

    Swipe.prototype.disable = function() {
        this.disabled = true;
    };

    Swipe.prototype.start = function() {
        console.log('start');
    };

    Swipe.prototype.move = function() {
        console.log('move');
    };

    Swipe.prototype.end = function() {
        console.log('end');
    };



    Swipe.prototype.handleEvent = function(e) {
        switch(e.type) {

            case 'mousedown':
            case 'touchstart':
            case 'MSPointerDown':
                this.start(e);
                break;

            case 'mousemove':
            case 'touchmove':
            case 'MSPointerMove':
                this.move(e);
                break;

            case 'mouseup':
            case 'touchend':
            case 'touchcancel':
            case 'MSPointerUp':
                this.end(e);
                break;
        }
    };

    window.Swipe = Swipe;

})(window, document);