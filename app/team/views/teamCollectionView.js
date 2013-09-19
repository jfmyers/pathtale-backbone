/* 
   Filename: teamCollectionView.js
   Summary: This view retrieves the team collection and renders each model in the 
            collection as a teamItemView(representing each team-member or company-user).
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'team/views/teamItemView'
], function($, _, Backbone,Marionette, App, teamItemView){
    App.TeamCollectionView= Marionette.CollectionView.extend({
		tagName:"ul",
		className:"teamList",
		initialize: function(){
			// As models are retrieved from the API & added to the TeamCollection, render to the view.
			this.listenTo(App.TeamCollection,"add",this.renderView);
			// The getCollection method will retrieve a collection of company-users("team-members")
			App.TeamController.getCollection();  
		},
		renderView: function(item){
			if(item != ""){
				// We don't want to show the current user, who is the admin, in the list of company-users.
				if(App.key != item.get("uid")){
					$(".link-tip").remove();
					// The Team Item View for each team-member.
					App.TeamItemView = new teamItemView({model:item});
					App.TeamItemView.render();
					// Fancy animation stuff...
					$(App.TeamItemView.el).hide()
					$(".teamList").prepend(App.TeamItemView.el);
					$(App.TeamItemView.el).show("200");
				}
			}
		}
	})
  	return App.TeamCollectionView;
});