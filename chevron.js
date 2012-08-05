(function($) {

	var methods = {
		
		preload: function(callback)
		{
			// will count how many templates where preloaded
			this._preloadCount = 0;
			
			return this.each($.proxy(function(index, element){
				this.templatePath = $(element).attr("href");
				this.templateName = $(element).attr("id") || this.attr("data-templateName");
				
				if (!$(this).data("template"))
				{
					$.ajax({
						type: "GET",
						url: this.templatePath,
						context: this,
						success: function(response, status, request){
							this._preloadCount ++;
							
							$(element).data("template", response);

							if (callback && this._preloadCount == this.length && $.isFunction(callback))
								callback.call(this)
						}
					})
				}
				else if (callback && index == this.length - 1 && $.isFunction(callback))
					callback.call(this)
					
			}, this));
		},
		
		render: function(data, callback)
		{
			if (typeof(callback) == "undefined")
				throw new Error('Missing the callback attribute in Chevron render method');

			return this.each(function(){
				this.renderData = data;
				this.callback = callback;
				
				this.templatePath = $(this).attr("href");
				this.templateName = $(this).attr("id") || $(this).attr("data-templateName");
				
				if (!$(this).data("template"))
				{
					$.ajax({
						type: "GET",
						url: this.templatePath,
						success: $.proxy( methods.invokeRender, this)
					})
				}
				else
					methods.invokeRender.call(this, $(this).data("template"));
			});
		},
		
		renderTemplate: function(templateText, templateData)
		{
			return Mustache.to_html(templateText, templateData);
		},
		
		invokeRender: function(response)
		{
			if (!$(this).data("template"))
				$(this).data("template", response);
			
			var result = methods.renderTemplate(response, this.renderData)
			
			if ($.isFunction(this.callback)){
				this.callback.call(this, result)
			}
			else if (this.callback instanceof jQuery){
				this.callback.html(result);
			}
			else if (typeof(this.callback) == "string")
				$(this.callback).html(result);
			else
				throw new Error('Chevron render method received an unsuported callback type');
			}
	}

	$.Chevron = $.fn.Chevron = function(method)
	{
		var self = this;
		
		// if called like $.Chevron (for all templates in the page)
		if (!self.selector)
			self = $("link[rel=template]");
					
	    if (methods[method])
	    	return methods[method].apply(self, Array.prototype.slice.call(arguments, 1));
	   	else if (!method)
	   		throw new Error('Chevron must receive a method to call as first argument');
	    else
	    	throw new Error('Method ' +  method + ' does not exist on Chevron');
	}
	
})( jQuery );