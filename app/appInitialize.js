define([
  'jquery',
  'underscore',
  'backbone',
  'appObject',
  'app/router' // Request router.js
],function($, _, Backbone, App, Router){
  	var initialize = function(){
		App.addRegions({
			nav		:  "#top-nav",
			main	:  "#main-content-body",
			modals	:  "#misc-modal-holder"
		})
  		App.addInitializer(function(options){
  			Router.initialize();
  		})
  		App.start();
		return App;
  	}
  	return{
    	initialize: initialize
  	};
})