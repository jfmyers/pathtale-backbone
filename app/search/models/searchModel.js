/* 
   Filename: searchModel.js
   Summary: Return the search results. Essentially a LinkModel, since the search result is a link.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.SearchModel = Backbone.Model.extend({
		defaults:{
			open: false,
			autoExpand: false,
			remove: 0
		}
	})
  	return App.SearchModel;
});
