/* 
   Filename: loaderView.js
   Summary: This view contains a loader .gif used extensively across the applications modules.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'text!shared/templates/loader-tmpl.html'
], function($, _, Backbone,Marionette, App, LoaderTemplate){
    App.LoaderView = Marionette.ItemView.extend({
		template: LoaderTemplate,
		tagName: "div",
		className: "loader",
		idAttribute: "feedLoader"
	})
  	return App.LoaderView;
});