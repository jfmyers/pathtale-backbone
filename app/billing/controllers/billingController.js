/* 
   Filename: billingController.js
   Summary: This controller runs all initilization procedures for the Billing Module.
   **Billing is handled by Stripe
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'billing/views/billingLayout',
  'shared/views/loaderView',
  'billing/models/billingModel'
],function($, _, backbone, Marionette, App, billingLayout, loaderView, billingModel){
  App.BillingController = {
	  start: function()
	  {
		  // Tell Backbone what page the user is on. This is stored in the Basic Model.
		  App.BasicModel.set("page","billing");
		  // Show the loader while this view is setup.
		  App.LoaderView = new loaderView();
		  App.main.show(App.LoaderView);
		  
		  /* 
		  	 Billing data is kept within the order attribute of the BasicModel.
		  	 Don't get the billing data twice, if this page has already been visited.
		     Since more calls will need to be made to Stripe, which can be slow at times.
		  */
		  if(App.BasicModel.get("order") == undefined){
			  	// Get Billing Data then render view.
		  		this.getBillingInfo();
		  } else {
			  	// Billing data already exists in the Basic Model, just render the view.
			 	this.renderView();
		  }
	  },
	  getBillingInfo: function()
	  {
		  thisController = this;
		  App.BillingModel = new billingModel();
		  App.BillingModel.url = "/api/billing/info/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";
		  App.BillingModel.fetch({
			  success:function(s)
			  {
				  App.BasicModel.set("order",s.attributes);
				  thisController.renderView();
			  },
			  error: function(e)
			  {
			  	  thisController.getBillingInfo();
			  }
		  })
	  },
	  renderView: function()
	  {
		  App.BillingLayout = new billingLayout({model:App.BasicModel});
		  App.main.show(App.BillingLayout);
	  }
  }
  return App.BillingController;
});