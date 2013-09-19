/*  
   Filename: linkController.js
   Summary: This controller sets-up the link module. More specifically it does the following:
				1.) Renders the LinkLayout's tool bar for creating and removing video-chat links. 
				2.) Renders the LinkLayout's video-chat links
				3.) If the user is new then the "training wheels" are played to highlight features.
   Controller WorkFlow:
		start() --> renderView()
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'links/views/linkLayout',
  'shared/views/loaderView'
],function($, _, backbone, Marionette, App, linkLayout, loaderView){
  App.LinkController = {
	  start: function()
	  {
		  // Tell Backbone what page the user is on. This is stored in the Basic Model.
		  App.BasicModel.set("page","link");
		  // Show the loader while this view is setup.
		  App.LoaderView = new loaderView();
		  App.main.show(App.LoaderView);	
		  // Call this controller's renderView method to setup the view.	  
		  this.renderView();
	  },
	  renderView: function()
	  {
		  // Show the LinkLayout in the "main" region of the application.
		  App.LinkLayout = new linkLayout({model:App.BasicModel});
		  App.main.show(App.LinkLayout); 
		  
		  // Render the tool bar for creating and removing vide-chat links.
		  App.LinkLayout.renderTools();
		  // Render the video-chat links.
		  App.LinkLayout.renderLinks();
		  
		  // If this is a new user show "training wheels" to highlight features.
		  if(App.BasicModel.get("data").playTrainingWheels == true){
			  App.LinkLayout.trainingWheelsStart();
		  }
	  },
	  getCollection: function(){
		  App.LinkCollection.url = "../../../api/link/info/"+kpt+"?hash="+hpt+"&key="+kpt+"&blank=0";
		  App.LinkCollection.fetch({
		  		success: function(s){
					$(".linkTag").hexorator({baseColor:10});
					if(App.LinkCollection.length == 0){
						$(".loader").remove();
						var html = "<div id='linkTip' class='link-tip'><h3>Get started!</h3><p>Click \"New Video Link\" above to generate a new video link and get talking!</p> </div>";
						$(".homeBodyContent").append(html);
						$(".link-tip").fadeIn(500);
					}
				},
				error:function(e){
					alert("A Path Tale server error has occured. Please refresh the page and try again!");
				}
		  });
	  }
  }
  return App.LinkController;
});