/* 
   Filename: navLayout.js
   Summary: This layout contains methods for navigating to the applications pages,
			for the navigation's search bar, for displaying "training wheel tips"
	 		and for logging a user out.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'text!shared/templates/nav-tmpl.html'
], function($, _, backbone,Marionette, App, navTemplate){
    App.NavLayout = Marionette.Layout.extend({
  		template: navTemplate,
		regions:{
			title: '#title',
			controlls: '#controlls'
		},
		events:{
			'blur #inputSearch'			  : 	'closeSearchResultBox',
			'click #branding'	  		  : 	'renderBranding',
			'click #billing'	  		  : 	'renderBilling',
			'click #help'				  : 	'renderHelp',
			'click #homeBase'			  : 	'renderLinks',
			'click #home'				  : 	'renderLinks',
			'click #inputSearch'		  : 	'expandSearchResultBox',
			'click #myaccount'			  : 	'renderMyAccount',
			'click #logout'	  			  : 	'toggleLogOut',
			'click #playTrainingWheels'	  : 	'playTrainingWheels',
			'click #team'	  			  : 	'renderTeam',
			'keyup #inputSearch'		  : 	'updateSearchQuery'
			
		},
		/* Methods for Navigating to application pages */
		renderBilling: function(e){
			e.preventDefault();
			App.Router.navigate("billing", {trigger:true});
		},
		renderBranding: function(e){
			e.preventDefault();
			App.Router.navigate("branding", {trigger:true});
		},
		renderHelp: function(e){
			e.preventDefault();
			App.Router.navigate("help", {trigger:true});
		},
		renderLinks: function(e){
			e.preventDefault();
			App.Router.navigate("links", {trigger:true});
		},
		renderMyAccount: function(e){
			e.preventDefault();
			App.Router.navigate("myaccount", {trigger:true});
		},
		renderTeam: function(e){
			e.preventDefault();
			App.Router.navigate("team", {trigger:true});
		},
		/* Methods for the Navigation's Search Bar */
		closeSearchResultBox:function(){
			// Animate on close.
			$("#inputSearch").animate({
					width:"400px"
				},400,function(){
					$(".home-controls").css("display","block");
					$(".nav-ul").css("display","block");
				}
			)
		},
		expandSearchResultBox:function(){
			// Before animating(expaning) the search box, hide the navigations other controls.
			$(".nav-ul").css("display","none");
			$(".home-controls").css("display","none");
			// Animate and expand the search box.
			$("#inputSearch").animate({
					width:"800px"
				},400,function(){}
			)
			// If current page isn't "links", redirect the user to the "links" page where search results will be displayed.
			if(App.BasicModel.get("page") != "links"){
				App.Router.navigate("links", {trigger:true});
			}
		},
		updateSearchQuery: function(e){
			var query = $(e.currentTarget).val(),
				searchBegin = App.BasicModel.get("searchBegin");

			// Search box has been clicked and initial text has been entered by the user.
			if(searchBegin == false && query.length>0){
				// The LinkLayout region, 'content', will hold the search results.
				App.LinkLayout.renderSearch();
				App.BasicModel.set("searchBegin",true);
				$(".homeBodyTextBreak").find("h3").text("Search Results");
			}
			// Search box has previously had text entered by the user, but the text is now deleted.
			if(searchBegin == true && query.length == 0){
				// The LinkLayout controls the search results.
				App.LinkLayout.renderLinks();
				App.BasicModel.set("searchBegin",false);
				$(".homeBodyTextBreak").find("h3").text("Your Video Link(s)");
			}

			App.BasicModel.set("searchQuery",query);
		},
		// For new users/users that need guidance on application functionality.
		playTrainingWheels: function(){
			if(App.BasicModel.get("page") != "links"){
				App.BasicModel.get("data").playTrainingWheels = true;
				App.Router.navigate("links", {trigger:true});				
			}else{
				App.LinkLayout.trainingWheelsStart();
			}
		},
		// Before logging out ask the User if they're sure they want to logout.
		toggleLogOut: function(){
			$('#LogoutModal').modal('toggle');
		}
	})
  	return App.NavLayout;
});