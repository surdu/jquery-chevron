(function($) {

	var methods = {
		
		preload: function(callback)
		{
			return this.each($.proxy(function(index, element){
				this.templatePath = $(element).attr("href");
				this.templateName = $(element).attr("id") || this.attr("data-templateName");
				
				if (!$(this).data("template"))
				{
					$.ajax({
						type: "GET",
						url: this.templatePath,
						success: $.proxy( function(response){
							$(element).data("template", response);
							
							if (index == this.length - 1 && $.isFunction(callback))
								callback.apply(this)
															
						}, this)
					})
				}
				else if (index == this.length - 1 && $.isFunction(callback))
					callback.apply(this)
					
			}, this));
		},
		
		render: function(data, callback)
		{
			return this.each(function(){
				this.renderData = data;
				this.callback = callback;
				
				this.templatePath = $(this).attr("href");
				this.templateName = $(this).attr("id") || this.attr("data-templateName");
				
				if (!$(this).data("template"))
				{
					$.ajax({
						type: "GET",
						url: this.templatePath,
						success: $.proxy( methods.invokeRender, this)
					})
				}
				else
					methods.invokeRender($(this).data("template"));
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
			
			result = methods.renderTemplate(response, this.renderData)
			
			if ($.isFunction(this.callback)){
				this.callback.apply(this, [result])
			}
			else if (this.callback instanceof jQuery){
				this.callback.html(result);
			}
			else if (typeof(this.callback) == "string")
				$(this.callback).html(result);
			else
				$.error('Chevron render method received an unsuported callback type');
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
	      	$.error('Chevron must receive a method to call as first argument');
	    else
	      	$.error('Method ' +  method + ' does not exist on Chevron');
	}
	
})( jQuery );