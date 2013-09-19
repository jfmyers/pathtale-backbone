/* 
   Filename: testLinkModel.js
   Summary: Model for the test link when branding.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.TestLinkModel = Backbone.Model.extend({
		defaults:{
			
		}
	})
  	return App.TestLinkModel;
});
