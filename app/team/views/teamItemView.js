/* 
   Filename: teamItemView.js
   Summary: This view handles the rendering & removal of teamItemViews.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'text!team/templates/team-item-tmpl.html'
], function($, _, Backbone,Marionette, App, teamItemTemplate){
    App.TeamItemView = Marionette.ItemView.extend({
		template: teamItemTemplate,
		tagName: "li",
		events:{	
			"click 	input"	  :  	"toggleRemove"
		},
		initialize: function(){
		 	// This view's model's parameter, 'deleteNow', tells Backbone whether the view & model should be removed.
			this.listenTo(this.model, 'change:deleteNow', this.removeView);
		},
		removeView: function(){
			// This method is called when the teamLayout method, 'deleteUsers', sets this model's deleteNow parameter to true.
			var thisView = this;
			App.TeamCollection.remove(this.model);
			if(this.model.get("deleteNow") == true){
				// Send HTTP Delete to API and destroy the model.
				var id = this.model.get("id"),
					json = '{"cuid":'+this.model.get("cuid")+',"cid":'+App.CompanyModel.get("id")+',"uid":'+'"'+kpt+'","remove":1}';
				this.model.url = "../../../api/team/info/"+App.CompanyModel.get("id")+"?key="+kpt+"&hash="+hpt+"&z=0";
				this.model.id = this.model.get("cuid");
			    this.model.destroy({data:{
					"model": json
				}});
				// Remove view, do some animation effect first.
				$(this.el).fadeOut("500",function(){
					thisView.remove();
				})
			}
		},
		toggleRemove: function(){
			/* 
			   Within the view a check-box is used to indicate the admin-user's intent to remove another team-member.
			   When the admin-user toggles the check-box update the model accordingly(0 if not checked, 1 if checked). 
			*/			 
			if(this.model.get("remove") == 1){
				this.model.set("remove",0);
			}else{
				this.model.set("remove",1);
			}
		}
	})
  	return App.TeamItemView;
});