/* 
   Filename: teamLayout.js
   Summary: This layout renders the teamCollectionView and handles the removal of
	 		team-members using a "master" delete user button.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'team/views/teamCollectionView',
  'text!team/templates/team-tmpl.html'
], function($, _, Backbone, Marionette, App, teamCollectionView, teamTemplate){
    App.TeamLayout = Marionette.Layout.extend({
		template: teamTemplate,
		regions:{
			nav: '.homeBodyNav',
			content:'.memberList'
		},
		events:{
			"click 	#deleteUser" 	: 	 "deleteUsers"
		},
		renderContent: function(){
			// The Team Collection View contains each Team Item View (every item view represents a company-user).
			App.TeamCollectionView = new teamCollectionView({model:App.BasicModel});
			// Show the Collection View is this layout's "content" region.
			this.content.show(App.TeamCollectionView);
		},
		deleteUsers: function(e){
			/* 
			   This method is bound to a "master" delete button, which allows the deletion of multiple
			   team members simultaneously. Each teamItemView has a checkbox that when toggled updates the 
			   teamItemView's model's parameter 'remove'. The deleteUser method, in this layout, loops 
			   through the TeamCollection to find models where 'remove' has been set to 1. If 'remove' is set to
			   1 then the 'deleteNow' parameter of the model is set to true, and the teamItemView, which is listening 
			   for a change in this parameter, deletes itself.
			*/
			var length = App.TeamCollection.models.length;			
			if(length > 0){
				for(var i=0;i<length;i++){
					var model = App.TeamCollection.models[i];
					if(model.get("remove") == 1){
						// Setting deleteNow to true will tell the teamItemView, to remove it's model and it's view.
						model.set("deleteNow",true);
						// Update the iterator count, since the length of the collection has decreased by 1.
						if(i == App.TeamCollection.models.length){
							break;
						}
						i--;
					}
				}
			}
		}
		
	})
  	return App.TeamLayout;
});