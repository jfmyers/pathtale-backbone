/* 
   Filename: billingModel.js
   Summary: Model for the customer billing/orders.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
], function($, _, backbone,Marionette, App){
	App.BillingModel = Backbone.Model.extend({
		defaults:{

		}
	})
  	return App.BillingModel;
});
