# swipe.js
JavaScript plugin for creating and analyzing swipe events. Compatible with desktop and mobile browsers, support touch and mouse events.

## Installation
Download [swipe.js](https://raw.githubusercontent.com/dimajt/swipe.js/master/swipe.js) file and include it in your HTML document

```html
<script src="swipe.js"></script>
```

## Usage
Create an new swipe instance, passing the element you want to use:

```javascript
var element = document.getElementsById('demo'); 
var swipe = new Swipe(element);
```

or specify CSS selector:
```javascript
var swipe = new Swipe('#demo');
```

Use `bind()` method to start listening for swipe events. Attach handlers in parameter:
```javascript
swipe.bind({
    start: function() {
        // ...
    },
    move: function() {
        // ...
    },
    end: function() {
        // ...
    }
});
```
Each method receive as a parameter a coordinates object of the form `{x: 150, y: 310}`.

Use `swipe.disable()` to disable listeners or `swipe.enable()` to return them.

## Browser support
##### Mobile platforms
* Android 2+
* iOS 6+
* Windows Phone 8+

##### Browsers
* Chrome
* Firefox
* Safari
* IE 9+
* Opera 7+


