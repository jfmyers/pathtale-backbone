/* 
   Filename: brandingController.js
   Summary: This controller runs all initilization procedures for the Branding Module.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'branding/views/brandingLayout',
  'shared/views/loaderView'
],function($, _, backbone, Marionette, App, brandingLayout, loaderView){
  App.BrandingController = {
	  start: function()
	  {
		  // Tell Backbone what page the user is on. This is stored in the Basic Model.
		  App.BasicModel.set("page","branding");
		  // Show the loader while this view is setup.
		  App.LoaderView = new loaderView();
		  App.main.show(App.LoaderView);
		  // Call this controller's renderView method to setup the view.
		  this.renderView();
	  },
	  renderView: function()
	  {
		  App.BrandingLayout = new brandingLayout({model:App.CompanyModel});
		  App.main.show(App.BrandingLayout);
	  }
  }
  return App.BrandingController;
});