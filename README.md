jQuery Chevron
==============

A jQuery extension that wraps the mustache js templating functionality allowing you to store templates in separate files instead of embedding them in the html

### Usage

Let's say you have the following simple template, called 'template.mustache':

```
Hello {{place}} !
```

First thing you need to do is add a link to your template in you html. For this, we use the `link` tag. The `rel` attribute is used for the preload functionality (see below).

```html
<link href="path/to/template.mustache" rel="template" id="templateName"/>
```

Then, in order to render the template:

```js
	$("#templateName").Chevron("render", {place: "world"}, function(result){
		// do something with 'result'
		// 'result' will contain the result of rendering the template
		// (in this case 'result' will contain: Hello world!)
	});

```

You can use any selector that will identify the template link. The above code can also be written:

```js
	$("link[rel=template]").Chevron("render", {place: "world"}, function(response){
		// do something with 'response'
	});

```

This will load and cache the template data and render the template. When all is done, the callback function will be called with the result of rendering the template.

The subsequent calls to the `render` method will use the cached data and not load the template from the file.

### Preload templates

When the template data needs to be ready before the render is called, you can call the `preload` method before you call the `render` method:

	$("#templateName").Chevron("preload", function(){
		// do something when the template was succesfully preloaded
	});

If you want to preload all the templates in the current html page, Chevron provides you a shortcut:

$.Chevron("preload", function(){
	// do something when the templates are successfully preloaded
});

In order for this to work, all your templates link must have a `rel="template"` attribute. In other words, the above shortcut could also be written as:

	$("link[rel=template]").Chevron("preload", function(){
		// do something when the templates are succesfully preloaded
	});

