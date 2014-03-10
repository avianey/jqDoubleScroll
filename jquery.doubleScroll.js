/*
 * @name DoubleScroll
 * @desc displays scroll bar on top and on the bottom of the div
 * @requires jQuery
 *
 * @author Pawel Suwala - http://suwala.eu/
 * @author Antoine Vianey - http://www.astek.fr/
 * @version 0.3 (10-03-2014)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
jQuery.fn.doubleScroll = function(userOptions) {
	// Default options
	var options = {
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
		resetOnWindowResize: false // recompute the top ScrollBar requirements when the window is resized
	};
	$.extend(true, options, userOptions);
	// do not modify
	// internal stuff
	$.extend(options, {
		topScrollBarMarkup: '<div class="doubleScroll-scroll-wrapper" style="height: 20px;"><div class="doubleScroll-scroll" style="height: 20px;"></div></div>',
		topScrollBarInnerSelector: '.doubleScroll-scroll'
	});
	
	var _showScrollBar = function($self, options) {
		
		if (options.onlyIfScroll && $self.get(0).scrollWidth <= $self.width()) {
			// content doesn't scroll
			return;
		}
		
		var $contentElement;

	    // add div that will act as an upper scroll
	    var $topScrollBar = $($(options.topScrollBarMarkup));
	    $self.before($topScrollBar);

	    // find the content element (should be the widest one)			
	    if (options.contentElement !== undefined && $self.find(options.contentElement).length !== 0) {
	        $contentElement = $self.find(options.contentElement);
	    } else {
	        $contentElement = $self.find('>:first-child');
	    }

	    // bind upper scroll to bottom scroll
	    $topScrollBar.bind('scroll.doubleScroll', function() {
	    	$self.scrollLeft($topScrollBar.scrollLeft());
	    });

	    // bind bottom scroll to upper scroll
	    var selfScrollHandler = function() {
	        $topScrollBar.scrollLeft($self.scrollLeft());
	    };
	    $self.bind('scroll.doubleScroll', selfScrollHandler);

	    // apply css
	    $topScrollBar.css(options.scrollCss);
	    $self.css(options.contentCss);

	    // set the width of the wrappers
	    $(options.topScrollBarInnerSelector, $topScrollBar).width($contentElement.outerWidth());
	    $topScrollBar.width($self.width());
	    
	}
	
	return this.each(function() {
		var $self = $(this);
		_showScrollBar($self, options);
	    
	    // bind the resize handler
		// do it once
	    if (options.resetOnWindowResize) {
	    	var handler = function() {
	    		$self.unbind('scroll.doubleScroll');
	    		$self.prev('div.doubleScroll-scroll-wrapper').remove();
	    		_showScrollBar($self, options);
	    	};
	    	$(window).bind('resize.doubleScroll', handler);
	    }
	});
}