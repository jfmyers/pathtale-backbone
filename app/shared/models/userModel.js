/* 
   Filename: userModel.js
   Summary:  The UserModel contains data on the user's Path Tale account.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.UserModel = Backbone.Model.extend({
		defaults:{
		
		}
	})
  	return App.UserModel;
});
