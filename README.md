# jQuery DoubleScroll Plugin

A Simple jQuery plugin to display additional scrollbar on top of the element.  
*This plugin does not requires jQuery-UI*

## Usage

Call the **doubleScroll** function on the desired jQuery elements on page load :  

```javascript
$(document).ready(function() {
   $('.double-scroll').doubleScroll();
});
```

## Options

You can configure the double scroll with the following options :  
```javascript
{
	contentElement: undefined, // Widest element, if not specified first child element will be used
	scrollCss: {                
		'overflow-x': 'auto',
		'overflow-y': 'hidden'
	},
	contentCss: {
		'overflow-x': 'auto',
		'overflow-y': 'hidden'
	},
	onlyIfScroll: true, // top scrollbar is not shown if the bottom one is not present
	resetOnWindowResize: false, // recompute the top ScrollBar requirements when the window is resized
	customizeAfterShowFunction: function(e, $self, options) { // this function is called every time a double scroll show happens (can be called many times, if window resizes happen)
		var wrapperScrollbarElement = $(options.topScrollBarWrapperSelector); // get the element with class 'doubleScroll-scroll-wrapper' to modify it if needed
		var innerScrollbarElement = $(options.topScrollBarInnerSelector); // get the element with class 'doubleScroll-scroll' to modify it if needed
		
		// The function is used to customize wrapper scrollbar and inner scrollbar as needed, after the double scrollbar show.
		
		// Arguments:
		//  e: resize event argument (can be undefined if it's not called from a window resize)
		//  $self: the jQuery element which has the doubleScroll function applied to
		//  options: the options used to create the double scroll, with all it's internally added info (topScrollBarWrapperSelector, topScrollBarInnerSelector and so on)
	}
}
```

######  contentElement

The element to use as the scroll reference.  
First child element is used if nothing is specified.

######  scrollCss

Key-Value pairs that allow you to customize the top scrollbar CSS.

######  contentCss

Key-Value pairs that allow you to customize the content CSS.

######  onlyIfScroll

If **true**, will display the top scrollbar only if the content is scrollable...

######  resetOnWindowResize

If **true**, will attach an event to regenerate the top scrollbar when the window is resized.  
Use it when the scrollable element has a width which is relative to the window width.

## Licence

Dual licensed under the MIT and GPL licenses:
-  http://www.opensource.org/licenses/mit-license.php
-  http://www.gnu.org/licenses/gpl.html

## Authors

-  @sniku : https://github.com/sniku/jQuery-doubleScroll
-  @avianey
