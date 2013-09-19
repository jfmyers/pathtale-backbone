/* 
   Filename: basicModel.js
   Summary:  The BasicModel returns three categories of data:
				1. user
				2. company
				3. companyUser

			  - The setupController handles organizing these into separate models.
			  - Combining these into one model, means fewer API calls, data is already
			    loaded when accesing other views and views that need all 3 types of data
	    	    can simply use the BasicModel.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.BasicModel = Backbone.Model.extend({
		defaults:{
			key:"",
			secret:"",
			pageTitle:"Home",
			searchBegin:false
		}
	})
  	return App.BasicModel;
});