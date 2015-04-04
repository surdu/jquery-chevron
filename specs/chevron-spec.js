describe("jquery-chevron", function () {

  beforeEach(function () {
    $("#tmpl1, #tmpl2").removeData("template");
  });

  it("preloads all templates", function (done) {
    expect($("#tmpl1").data("template")).toBeUndefined();
    expect($("#tmpl2").data("template")).toBeUndefined();

    $.Chevron("preload", function(){
      expect($("#tmpl1").data("template")).toEqual("Hello {{place}}!");
      expect($("#tmpl2").data("template")).toEqual("Hello, my name is {{name}}!");
  		done();
  	});
  });

  it("preloads selective template", function (done) {
    expect($("#tmpl1").data("template")).toBeUndefined();

    $("#tmpl1").Chevron("preload", function(){
      expect($("#tmpl1").data("template")).toEqual("Hello {{place}}!");
      done();
    });
  });

  it("renders template and exposes render info", function (done) {

    $("#tmpl1").Chevron("render", {place: "world"}, function(response){
      expect(response).toEqual("Hello world!");
      expect(this.templatePath).toEqual("templates/tmpl1.mustache");
      expect(this.templateName).toEqual("tmpl1");
  		done();
  	});
  });

  it("renders multiple templates at once", function (done) {

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
  		}
  	};

    $.Chevron("render", {place: "world", name:"Slim Shady"}, function(response){
      expect(response).toEqual(expecting[this.templateName].result);
      expect(this.templatePath).toEqual(expecting[this.templateName].path);
  		done();
  	});
  });

  it("throws error when no callback is specified", function () {
    expect(function () {
      $("#tmpl1").Chevron("render", {place: "world"});
    }).toThrow(new Error("Missing the callback attribute in Chevron render method"));
  })
})
