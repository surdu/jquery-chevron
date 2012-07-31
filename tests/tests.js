module("Preload");
asyncTest("Preload all templates test", function() {
	expect(3);

	$("#tmpl1, #tmpl2").removeData("template");
	$.Chevron("preload", function(){
		ok(true, "Preload callback was called");
		equal($("#tmpl1").data("template"), "Hello {{place}}!", "First template preloaded correctly.");
		equal($("#tmpl2").data("template"), "Hello, my name is {{name}}!", "Second template preloaded correctly.");
		start();
	});
});

asyncTest("Preload selective templates test", function() {
	expect(2);
	
	$("#tmpl1").removeData("template");
	$("#tmpl1").Chevron("preload", function(){
		ok(true, "Preload callback was called");
		equal($("#tmpl1").data("template"), "Hello {{place}}!", "Template preloaded correctly.");	
		start();
	});
});

test("Preload preloaded templates test", function() {
	expect(2);
	
	$("#tmpl2").Chevron("preload", function(){
		ok(true, "Preload callback was called");
	});
	
	equal($("#tmpl2").data("template"), "Hello, my name is {{name}}!", "Template preloaded correctly.")
});



module("Render");
asyncTest("Function callback", function() {
	expect(3);

	var count = 1;

	function done()
	{
		--count || start();
	}

	$("#tmpl1").Chevron("render", {place: "world"}, function(response){
		ok(true, "Callback function was called");
		equal(response, "Hello world!", "Template rendered correctly.");
		equal(this.templatePath, "templates/tmpl1.mustache", "Template rendered correctly.");
		equal(this.templateName, "tmpl1", "Template rendered correctly.");
		done();
	});
});
