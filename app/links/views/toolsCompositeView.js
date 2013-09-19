/* 
   Filename: toolsCompositeView.js
   Summary: This view renders the toolsCompositeView and handles the removal of links
			using a "master" delete link button. Also handles the creation of links.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'links/models/linkModel',
  'text!links/templates/tools-tmpl.html'
], function($, _, Backbone,Marionette, App, linkModel, toolsTemplate){
    App.ToolsCompositeView = Marionette.CompositeView.extend({
		template: toolsTemplate,
		events:{
			"click 	#newLink" 		: 		"newLink",
			"click 	#deleteLink" 	: 		"deleteLinks"
		},
		initialize: function(){
			// Animate the tools appearance when this view initializes.
			$(".homeBodyNav").animate({
					top:"55px"
				},500,function(){}
			)
		},
		newLink: function(e){
			// In order to save this link, the LinkModel will need to associate the link with a company.
			App.LinkModel = new linkModel({companyHandle:App.CompanyModel.get("handle"), cid:App.CompanyModel.get("id")});
			App.LinkModel.url = "../../../api/link/info/"+kpt+"?hash="+hpt+"&key="+kpt+"&blank=0";
			App.LinkModel.save({autoExpand:true},{
				success: function(s){
					App.LinkModel.set("id",s.get("linkId"));
					// When initally creating a link it has no tags. User will be prompted to add tags.
					App.LinkModel.set("tags","");
					App.LinkCollection.add(App.LinkModel);
				},
				error: function(e){
					alert("A Path Tale server error has occured. Please refresh the page and try again!");
				}
			})
		},
		deleteLinks: function(e){
			/* 
			   This method is bound to a "master" delete button, which allows the deletion of multiple
			   links simultaneously. Each linkItemView has a checkbox that when toggled updates the 
			   linkItemView's model's parameter 'remove' to either 1 or 0. The deleteLinks method, in this layout, loops 
			   through the LinkCollection to find models where 'remove' has been set to 1. If 'remove' is set to
			   1 then the 'deleteNow' parameter of the model is set to true, and the linkItemView, which is listening 
			   for a change in this parameter, deletes itself.
			*/
			var length = App.LinkCollection.models.length;
			if(length > 0){
				for(var i=0;i<length;i++){
					var model = App.LinkCollection.models[i];
					if(model.get("remove") == 1){
						// Setting deleteNow to true will tell the linkItemView, to remove it's model and it's view.
						model.set("deleteNow",true);
						// Update the iterator count, since the length of the collection has decreased by 1.
						if(i == App.LinkCollection.models.length){
							break;
						}
						i--;
					}
				}
				
			}
		}
	})
  	return App.ToolsCompositeView;
});