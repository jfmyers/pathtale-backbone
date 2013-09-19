/* 
   Filename: searchCollection.js
   Summary: Uses the SearchModel.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'search/models/searchModel'
], function($, _, Backbone,Marionette, App, SearchModel){
	App.SearchCollection = Backbone.Collection.extend({
		model: App.SearchModel,
		parse: function(response) {
			if(response.status == 200){
				return response.searchResults;
			}
		},
		filter: function(query){
			var query = query;
		}
	})
  	return App.SearchCollection;
});
