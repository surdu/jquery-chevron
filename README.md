# jQuery Chevron [![Build Status](https://travis-ci.org/surdu/jquery-chevron.svg?branch=master)](https://travis-ci.org/surdu/jquery-chevron)

jQuery Chevron is a jQuery extension that wraps the mustache js templating functionality allowing you to store templates in separate files instead of embedding them in the html.

## Usage

Let's say you have the following simple template, called 'template.mustache':

```
Hello {{place}} !
```

First thing you need to do is add a link to your template in you html. For this, we use the `link` tag.

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

You can use any selector that will identify the template(s) link. The above code can also be written:

```js
	$("link[rel=template]").Chevron("render", {place: "world"}, function(result){
		// do something with 'result'
	});

```

This will load and cache the template data and render the template. When all is done, the callback function will be called one time for each template identified by the selector. See bellow for more details about the render method.

## Preload templates

When the template data needs to be ready before the render is called, you can call the `preload` method before you call the `render` method:

	$("#templateName").Chevron("preload", function(){
		// do something when all the specified templates are successfully preloaded
	});

As with the `render` method, you can use any selector to identify the template or templates that need to be preloaded.


If you want to preload all the templates in the current html page, you could do the following:

	$("link[rel=template]").Chevron("preload", function(){
		// do something when all the specified templates are successfully preloaded
	});


## Rendering/Preloading all the templates

Chevron offers you a shortcut in order to render or preload all the templates declared in the html by links with `rel="template"` tag.

By doing the following, Chevron will preload all the templates from your html:

	$.Chevron("preload", function(){
		// do something when all the templates are successfully preloaded
	});

The above is equivalent of the following code:

	$("link[rel=template]").Chevron("preload", function(){
		// do something when all the templates are successfully preloaded
	});

The same shortcut apply also for the `render` method, in order for you to render all the templates at once, if that is desired.


## Chevron methods

You can call Chevron methods in the following ways:

    $.Chevron(methodName, arg1, arg2, ... )

or

    $("someSelector").Chevron(methodName, arg1, arg2, ... )

The `methodName` could be one of the following:

### render(templateData, callback)

This method will preload and render all the templates from the links specified by the selector. If the method is called without the selector, all the templates specified by link tags with the attribute `rel="template"` will be rendered.

The method receives the following arguments:

* templateData - an object representing the variables that need to be sent to the template in the form of `{varName: varValue}`
* callback - can be one of the following:
  * a jQuery object - representing where you want the result of the rendering to be placed in, for example `$("#output").find("span")`. Chevron will replace whatever content is inside the element denoted by the jQuery object with the result of the render.
  * a string - this is used to denote a selector what will be passed to jQuery to identify an element where you want the result of the rendering to be placed as for example: `"#output span"`. As in the previous example, the content inside the denoted element will be replaced.
  * a function - in this case, the function will be called after the template was rendered and you'll receive the result of the render as the first argument. `this` in the context of this function will represent the Chevron object.

### preload(callback)

This method preloads all the templates specified by the selector so that when you will call `render` method in the future, all the templates area ready to render. Otherwise, when you call `render` for the first time, the render method will take care of preloading the template first.

If the method is called without the selector, all the templates specified by link tags with the attribute `rel="template"` will be preloaded.

The method receives the following argument:

* callback - a function to be called after **all** the templates denoted by the selector are loaded. `this` in the context of this function will represent the Chevron object.

## Chevron attributes

The attributes are usually accessed on `this` inside callback functions. The Chevron object has the following attributes:

### templatePath
Represents the path specified in the link's `href` attribute.

### templateName
Represents either the `id` or `data-templateName` attribute of the link element. The attributes will be checked in this order. This can be used to identify which template rendered in the case you select multiple templates to render at the same time and you've chosen a function as your callback.
