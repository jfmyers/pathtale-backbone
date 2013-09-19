/* 
   Filename: companyUserModel.js
   Summary:  The CompanyUserModel contains data on the user's relation to their company account(as a company user).
			* Separating out user and company users is critical, since in the future a specific user, Jim, might
			  be apart of various companies/organizations. Jim should not have to have multiple Path Tale accounts,
			  just because he is apart of multiple organizations.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.CompanyUserModel = Backbone.Model.extend({
		defaults:{
				
		}
	})
  	return App.CompanyUserModel;
});
