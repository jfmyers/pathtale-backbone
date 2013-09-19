/* 
   Filename: companyModel.js
   Summary:  The CompanyModel contains data on the company-user's company.
			 
			 * Why do we say "company-user's company" and not "user's company"?
			   - In the future(pending updated functionality) a user might be
			     associated with multiple companies, i.e. a single user could 
			     have multiple company-user accounts with multiple companies.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.CompanyModel = Backbone.Model.extend({
		defaults:{
			cid:"",
			name:"",
			description:"",
			website:"",
			handle:"",
			city:"",
			state:"",
			cuid:"",
			industry:""			
		}
	})
  	return App.CompanyModel;
});
