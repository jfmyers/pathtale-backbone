/* 
   Filename: linkModel.js
   Summary: Model for each link.
   Notes on Default Values:
   		- If 'autoExpand' is set to true, then when the model
	      is rendered in a linkItemView it will be expanding,
		  displaying a text-area where a user can edit the tags
		  associated with the link.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.LinkModel = Backbone.Model.extend({
		defaults:{
			open: false,
			autoExpand: false,
			remove: 0
		}
	})
  	return App.LinkModel;
});
