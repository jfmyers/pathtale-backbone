// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'shared/utilities/urlParse',
  'shared/controllers/setupController',
  'account/controllers/myAccountController',
  'billing/controllers/billingController',
  'branding/controllers/brandingController',
  'team/controllers/teamController',
  'links/controllers/linkController'
],function($, _, backbone, Marionette, App, QueryString, setupController, myAccountController, billingController, brandingController, teamController, linkController){
  	 App.Router = backbone.Router.extend({
    	routes: {
			'billing' 			: 	 		'billing',
			'branding' 			: 	 		'branding',
			'home'				: 			'links',
			'links'				: 			'links',
			'myaccount' 		: 	 		'myAccount',
			'team' 				: 	 		'team',
			'*actions' 			: 			'defaultAction'
    	},
		billing: function(){
			App.BillingController = billingController;
			App.BillingController.start();
		},
		branding: function(){
			App.BrandingController = brandingController;
			App.BrandingController.start();
		},
		links:function(){
			App.LinkController = linkController;
			App.LinkController.start();
		},
		myAccount: function(){
			App.MyAccountController = myAccountController;
			App.MyAccountController.start();
		},
		team: function(){
			App.TeamController = teamController;
			App.TeamController.start();
		},
		defaultAction: function(){
			var url = QueryString;
			var page = QueryString.QueryString.p;
			var scope =  QueryString.QueryString.s;
			var admin = App.BasicModel.get("data").admin;
			
			if(page == "" || page == undefined || page == null || page == "links"){
				this.links();
			
			}else if(page == "billing" && admin == 1){
				this.billing();
			}else if(page == "branding" && admin == 1){
				this.branding();
			}else if(page == "myaccount"){
				this.myaccount();
			}else if(page == "team"){
				this.team();
			}else{
				this.home();
			}
		}
  	});
  	var initialize = function(){
		App.SetupController = setupController;
		App.SetupController.start();
		App.Router = new App.Router;
  	};
  	return {
    	initialize: initialize
  	};	
});