/* 
   Filename: teamModel.js
   Summary: Model for each team-member/company-user.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.TeamModel = Backbone.Model.extend({
		defaults:{
			remove: 0
		}
	})
  	return App.TeamModel;
});
