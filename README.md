<h2>PathTale-Backbone</h2>

This is the backbone application that powers our link management platform, used by organizations and their team members. I posted this as supporting code to a recent post I made about some of the things I've learned using Backbone. 
<br>
<br>
Here is a link to that post, which explains why the application is organized the way it is, as well as some other things.
<br>
<a href="http://jfmyers.com/post/4/" target="_blank">http://jfmyers.com/post/4/</a>

<h3>Initializing the Application:</h3>
The application is initialized in the appCore.js file:
```js
// Start the main app logic.
require(['domReady','app/appInitialize','jquery','bootstrap','placeholder','iecors','marionette','avgrund','hexorator','joyride'],function(domReady,appInitialize,$,bootstrap,placeholder,iecors,marionette,avgrund,hexorator,joyride){
	appInitialize.initialize();
});
```
The initialize method is located in the appInitialize.js file, in the app folder. This method creates a global App object, starts the router and sets-up the App's Marionette regions.
```js
define([
  'jquery',
  'underscore',
  'backbone',
  'appObject',
  'app/router'
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
```