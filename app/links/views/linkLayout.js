/*  
   Filename: linkLayout.js
   Summary: This layout does the following:
				1.) Renders Tools that allow user to create/delete video-chat links.
				2.) Render 
				1.) Renders the tool bar for creating and removing video-chat links. 
				2.) Renders the video-chat links
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
  'links/views/toolsCompositeView',
  'links/views/linkCollectionView',
  'search/views/searchCollectionView',
  'text!links/templates/link-tmpl.html',
  'shared/views/loaderView'
], function($, _, Backbone, Marionette, App, toolsCompositeView, linkCollectionView, searchCollectionView, linkTemplate, LoaderView){
    App.LinkLayout = Marionette.Layout.extend({
		template: linkTemplate,
		regions:{
			nav: '.homeBodyNav',
			content:'.homeBodyContent'
		},
		initialize: function(){	
			this.listenTo(App.BasicModel,"change:searchStep",this.updateText);
		},
		renderLinks: function(){
			App.LinkLayout.Links = new linkCollectionView({model:App.BasicModel});
			this.content.show(App.LinkLayout.Links);
		},
		renderSearch: function(){
			App.LinkLayout.Search = new searchCollectionView({model:App.BasicModel});
			this.content.show(App.LinkLayout.Search);
		},
		renderTools: function(){
			App.LinkLayout.Tools = new toolsCompositeView({model:App.BasicModel});
			this.nav.show(App.LinkLayout.Tools);
		},
		trainingWheelsStart:function(){
			App.BasicModel.get("data").playTrainingWheels = false;
			setTimeout(function(){
	        	$('#joyRideTipContent').joyride({
					autoStart : true,
					modal:true,
	        		expose: false
	        	});
			},700)
		},
		updateText: function(){
			// As a user searches update text that indicates: Searching vs. Search Results.
			var status = App.BasicModel.get("searchStep");
			if(status == "SearchStart"){
				$(".homeBodyTextBreak").find("h3").text("Searching");
				var timerId = App.ViewUtilities.animateSearchingText('start',null);
				this.model.set("timerId",timerId);
			}else if(status == "SearchEnd"){
				App.ViewUtilities.animateSearchingText('stop', this.model.get("timerId"));
				$(".homeBodyTextBreak").find("h3").text("Search Results");
			}
		}
	})
  	return App.LinkLayout;
});