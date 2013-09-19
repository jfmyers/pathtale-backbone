define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'links/models/linkModel'
], function($, _, Backbone,Marionette, App, LinkModel){
	App.LinkCollection = Backbone.Collection.extend({
		model: App.LinkModel,
		parse: function(response) {
			if(response.status == 200){
				return response.data;
			}
		}
	})
  	return App.LinkCollection;
});
