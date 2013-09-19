/* 
   Filename: linkCollectionView.js
   Summary: This view retrieves the link collection and renders each model in the 
            collection as a linkItemView(representing each video-chat link).
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'links/collections/linkCollection',
  'links/models/linkModel',
  'links/views/linkItemView'
], function($, _, Backbone,Marionette, App, linkCollection, linkModel, linkItemView){
    App.LinkCollectionView = Marionette.CollectionView.extend({
		tagName:"ul",
		className:"linkList",
		initialize: function(){
			App.LinkCollection = new linkCollection();
			this.listenTo(App.LinkCollection,"add",this.renderView);
			App.LinkController.getCollection();
		},
		renderView: function(item){
			if(item != ""){
				$(".link-tip").remove();
				App.LinkItemView = new linkItemView({model:item});
				App.LinkItemView.render();
				$(App.LinkItemView.el).hide()
				$(".linkList").prepend(App.LinkItemView.el);
				$(App.LinkItemView.el).show("200");
			}
		}
	})
  	return App.LinkCollectionView;
});