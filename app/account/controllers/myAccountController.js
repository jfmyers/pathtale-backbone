/* 
   Filename: myAccountController.js
   Summary: This controller runs all initilization procedures for the account module.
			The account module handles updating a user's info, such as name, email.
			If the user is the company's admin. the the user will also be able to
			update the video-chat handle and organization information such as the 
			name of the organization, it's website, location, etc...
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'account/views/myAccountLayout',
  'shared/views/loaderView'
],function($, _, backbone, Marionette, App, myAccountLayout, loaderView){
  App.MyAccountController = {
	  start: function()
	  {
		  // Tell Backbone what page the user is on. This is stored in the Basic Model.
		  App.BasicModel.set("page","myaccount");
		   // Show the loader while this view is setup.
		  App.LoaderView = new loaderView();
		  App.main.show(App.LoaderView);
		  
		  // Call this controller's renderView method to setup the view.
		  this.renderView();
		  this.setOptions();
	  },
	  renderView: function()
	  {
		  App.MyAccountLayout = new myAccountLayout({model:App.BasicModel});
		  App.main.show(App.MyAccountLayout);
	  },
	  setOptions: function()
	  {
		  // Setup typeahead for major US cities and US states.
		  var cities = ['New York','Boston','Philadelphia','Washington D.C.','San Francisco','San Diego','Boulder','San Jose','Baltimore','Pittsburg','Chicago','Atlanta'];
		  $('#inputCity').typeahead({source: cities});
		  var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming','Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon','Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia','Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'Noord-Brabant', 'Noord-Holland', 'Overijssel', 'Utrecht', 'Zeeland', 'Zuid-Holland'];   
		  $('#inputState').typeahead({source: states});
	  }
  }
  return App.MyAccountController;
});