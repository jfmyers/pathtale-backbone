/* 
   Filename: teamController.js
   Summary: Uses the TeamModel.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'team/models/teamModel'
], function($, _, Backbone,Marionette, App, TeamModel){
	App.TeamCollection = Backbone.Collection.extend({
		model: App.TeamModel,
		parse: function(response) {
			// Status of response is 200, indicates success
			if(response.status == 200){
				return response.data;
			} else {
				alert("A Path Tale server error has occured. Please refresh the page and try again!");
			}
		}
	})
  	return App.TeamCollection;
});
