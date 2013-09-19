/*  
   Filename: setupController.js
   Summary: This controller sets-up the applications navigation bar, gets & organizes data
	 		shared by each module, sets-up Backbone options and sets-up  usefule utilitiy functions.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'shared/views/navLayout',
  'shared/utilities/viewUtilities',
  'shared/models/basicModel',
  'shared/models/userModel',
  'shared/models/companyUserModel',
  'shared/models/companyModel'
],function($, _, backbone, Marionette, App, navLayout, viewUtilities, basicModel, userModel, companyUserModel, companyModel){
  App.SetupController = {
	  start: function()
	  {
		  // Assign the User's key and session hash to the App object for later user.
		  this.key = App.key = kpt;
		  this.hash = App.hash = hpt;
		  // Determine whether a key or hash has been provided. If not the user is not authenitcated. No data will be retreived.
		  if(this.key == undefined || this.key == "" || this.hash == undefined || this.hash == ""){
			  App.BasicModel.set("authenticated",false);
		  } else {
			  this.getData();
		  }
		  // Setup Common utilitiy functions for Models and Views.
		  this.setUtilities();
		  
	  },
	  getData: function()
	  {
		  var thisController = this;
		  // Use the basic model to make one HTTP request to the API to get user's personal, company user and company data.
		  App.BasicModel = new basicModel({id:this.key});
		  App.BasicModel.url = '../../../api/user/info/'+this.key+"?hash="+this.hash+"&key="+this.key;
		  App.BasicModel.fetch({
			  success: function(s){
				  App.BasicModel.set("authenticated",true);
				  // Organize this data into separate models (UserModel, CompanyModel and CompanyUserModel)
				  thisController.organizeData();
			  },
			  error: function(e){
				  // If no data is returned then the user has not authenticated.
				  App.BasicModel.set("authenticated",false);
			  }
		  });
		  
	  },
	  organizeData: function()
	  {
		  // Using the results from our Basic "All Encompassing" Model we'll setup UserModel, CompanyModel and CompanyUserModel
		  App.UserModel = new userModel();
		  App.UserModel.attributes = App.BasicModel.get("user");
		  App.UserModel.id = App.BasicModel.get("user").md5_id;
		  App.UserModel.url = "../../../api/user/info/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";
		 
		 
		  App.CompanyModel = new companyModel();
		  App.CompanyModel.attributes = App.BasicModel.get("company");
		  App.CompanyModel.id = App.BasicModel.get("company").id;
		  App.CompanyModel.url = "../../../api/company/info/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";
		 
		  
		  App.CompanyUserModel = new companyUserModel();
		  App.CompanyUserModel.attributes = App.BasicModel.get("companyUser");
		  App.CompanyUserModel.url = "";
		  
		  // Now render the navigation bar.
		  this.renderNav();
		  
	  },
	  renderNav: function()
	  {
		  // Provide the NavLayout with the BasicModel since it will need user, company and company user data.
		  App.NavLayout = new navLayout({model:App.BasicModel});
		  App.nav.show(App.NavLayout);
		 
		  // Finally set Backbone Options that will handle browser states and history.
		  this.setBackboneOptions();
	  },
	  setBackboneOptions:function()
	  {
		  // Enable push state for compatible browsers.
		  var enablePushState = true;  

		  // Disable push state for older browsers (IE8, IE9 etc).
		  var pushState = !!(enablePushState && window.history && window.history.pushState);

		  if(pushState) {
			  Backbone.emulateHTTP = true;
			  Backbone.history.start({pushState: true });
		  }else{
			  Backbone.history.start({pushState: false });
		  }
		  Backbone.emulateJSON = true;
		  
		 
	  },
	  setUtilities:function()
	  {
		  // viewUtilities provides each view with usefule utility functions.
		  App.ViewUtilities = viewUtilities;
	  }
	  
  }
  
  return App.SetupController;
  
});