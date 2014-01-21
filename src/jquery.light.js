(function( $ ){
	var methods = {
		init : function( options ) { 
			var settings = $.extend( {
				
			}, options);
			this.click(function(e) {
				var t=$(this);
				var url=t.attr('href');
				e.preventDefault();
				var div = $('<div></div>').addClass('light_container').html('<span class="light_inner"><div class="light_loading">Loading...</div></span><a href="javascript:;" class="light_close">x</a>');
				var di=div.find('.light_inner');
				$('body').append(div);
				di.width(di.children().first().width());
				di.height(di.children().first().height());
				// lock scroll position, but retain settings for later
				var scrollPosition = [
					self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
					self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
				];
				var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
				html.data('scroll-position', scrollPosition);
				html.data('previous-overflow', html.css('overflow'));
				html.css('overflow', 'hidden');
				html.css('height','100%');
				window.scrollTo(scrollPosition[0], scrollPosition[1]);
				div.click(function(e) {
					console.log(e);
					var ele=$(e.target);
					var go=true;
					while(!ele.hasClass('light_container')) {
						if(ele.hasClass('light_inner')) {
							go=false;
						}
						ele=ele.parent();
					}
					if(go) {
						e.preventDefault();
						div.remove();
						// un-lock scroll position
						var html = jQuery('html');
						var scrollPosition = html.data('scroll-position');
						html.css('overflow', html.data('previous-overflow'));
						html.css('height','auto');
						window.scrollTo(scrollPosition[0], scrollPosition[1]);
					}
				});
				var img=$('<img />').attr('src',url);
				img.load(function() {
					di.html(img);
					var w=$( window ).width()-20;
					var h=$( window ).height()-20;
					img.css({'max-width':w,'max-height':h,'width':'auto','height':'auto'})
					di.width(di.children().first().width());
					di.height(di.children().first().height());
					if(t.attr('data-caption')!==undefined) {
						di.append('<div class="light_caption"><div class="light_caption_inner">'+t.attr('data-caption')+'</div></div>');
					}
				});
			});
		}
	};
	$.fn.light = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}else{
			$.error( 'Method ' +  method + ' does not exist on jQuery.light' );
		}
	};
})( jQuery );