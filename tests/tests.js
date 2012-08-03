module("Preload", {
	setup: function(){
		$("#tmpl1, #tmpl2").removeData("template");
	}
});
asyncTest("Preload all templates test", function() {
	expect(3);

	$.Chevron("preload", function(){
		ok(true, "Preload callback was called");
		equal($("#tmpl1").data("template"), "Hello {{place}}!", "First template preloaded correctly.");
		equal($("#tmpl2").data("template"), "Hello, my name is {{name}}!", "Second template preloaded correctly.");
		start();
	});
});

asyncTest("Preload selective templates test", function() {
	expect(2);
	
	$("#tmpl1").Chevron("preload", function(){
		ok(true, "Preload callback was called");
		equal($("#tmpl1").data("template"), "Hello {{place}}!", "Template preloaded correctly.");	
		start();
	});
});

module("Render");
asyncTest("Function callback", function() {
	expect(4);

	$("#tmpl1").Chevron("render", {place: "world"}, function(response){
		ok(true, "Callback function was called");
		equal(response, "Hello world!", "Template rendered correctly.");
		equal(this.templatePath, "templates/tmpl1.mustache", "Template path is correct.");
		equal(this.templateName, "tmpl1", "Template name is correct.");
		start();
	});
});

asyncTest("Render all templates", function() {
	var count = 3;
	expect(count * 3);

	var expecting = {
		"tmpl1":{
			path: "templates/tmpl1.mustache",
			result: "Hello world!"
		},

		"tmpl2":{
			path: "templates/tmpl2.mustache",
			result: "Hello, my name is Slim Shady!"
		},

		"dataName":{
			path: "templates/tmpl2.mustache",
			result: "Hello, my name is Slim Shady!"
		},
		
	}

	function done()
	{
		-- count || start();
	}

	$.Chevron("render", {place: "world", name:"Slim Shady"}, function(response){
		ok(true, "Callback function was called");
		equal(response, expecting[this.templateName].result, "Template rendered correctly.");
		equal(this.templatePath, expecting[this.templateName].path, "Template path is correct.");
		done();
	});
});


test("Render without callback", function() {
	
	function checkError(error)
	{
		return error.message == "Missing the callback attribute in Chevron render method";
	}
	
	raises( function(){
		$("#tmpl1").Chevron("render", {place: "world"});
	} , checkError, 'Error was thrown due to missing callback');
});