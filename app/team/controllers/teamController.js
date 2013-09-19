/* 
   Filename: teamController.js
   Summary: This controller runs all initilization procedures and serves 
			as an interface to retrieve data for the Team Module.
   Module WorkFlow:
   		Team Controller --> TeamLayout --> TeamCollectionView --> TeamItemView
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'team/views/teamLayout',
  'team/collections/teamCollection',
  'shared/views/loaderView'
],function($, _, backbone, Marionette, App, teamLayout, teamCollection, loaderView){
  App.TeamController = {
	  start: function()
	  {
		  // Tell Backbone what page the user is on. This is stored in the Basic Model.
		  App.BasicModel.set("page","team");
		  // Show the loader while this view is setup.
		  App.LoaderView = new loaderView();
		  App.main.show(App.LoaderView);
		  // The Team Collection contains Team Member models.
		  App.TeamCollection = new teamCollection();
		  // Finally call this controller's renderView method to setup the view.
		  this.renderView();
	  },
	  renderView: function()
	  {
		  // Show the TeamLayout in the "main" region of the application.
		  App.TeamLayout = new teamLayout({model:App.BasicModel});
		  App.main.show(App.TeamLayout);
		  App.TeamLayout.renderContent();
	  },
	  getCollection: function()
	  {
		  // Retrieve the team collections from the API.
		  App.TeamCollection.url = "/api/team/info/"+App.CompanyModel.get("id")+"?hash="+hpt+"&key="+kpt+"&blank=0";
		  App.TeamCollection.fetch({
			  success: function(s){
				  /* 
				  	 If no team members besides the admin. are associated with this account, then display a message,
				  	 with instructions on how the admin can get their team-members setup on Path Tale.
				  */
				  if(App.TeamCollection.length < 2 && App.TeamCollection.where({uid:App.UserModel.get("md5_id")}).length > 0 ){
					  $(".loader").remove();
					  var accountHandle = App.CompanyModel.get("handle")+".pathtale.com";
					  var html = "<div id='linkTip' class='link-tip' style='width: 97%;margin-top: 20px;background: rgba(242, 109, 79, 0.6);cursor:default'><h3>No team members have joined your account!</h3><p>Share the link above with Team Members that you'd like to join you on this Path Tale account -- "+accountHandle+".</a></p> </div>";
					  $(".memberList").append(html);
					  $(".link-tip").fadeIn(500);
				  }
			  },
			  error:function(e){
				  alert("A Path Tale server error has occured. Please refresh the page and try again!");
			  }
		  });
	  }
  }
  return App.TeamController;
});