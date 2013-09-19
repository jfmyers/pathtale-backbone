/* 
   Filename: searchCollectionView.js
   Summary: This is a collection view that contains linkItemViews,
			i.e. individual links returned by the search.

   Macro WorkFlow of How a Search is Initiated and How Results Are Displayed:
		1.) User enters text into the NavLayout's search bar.
	 		This text is set to the BasicModel's parameter "searchQuery".
		2.) NavLayout then call's HomeLayout's method "renderHomeBodySearch".
		 	The HomeLayout's method "renderHomeBodySearch" instanties this view("searchCollectionView").
  		3.) This view(searchCollectionView) listens to changes in the BasicModel's parameter "searchQuery", 
			which the NavLayout updates on every keyup.
		4.) When a change to this parameter occurs (i.e. user has entered more text),
			a search is executed and the results are added to the LinkCollection.
		5.) Results are then rendered as a linkItemView within this view(searchCollectionView). 
	 		This view (searchCollectionView) is displayed within the HomeLayout's 'content' region.

  Micro WorkFlow of How This View Deals with Search:
  	BasicModel 'change:searchQuery' --> searchOnServer() --> mergeToMaster() --> renderView()

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
    App.SearchView = Marionette.CollectionView.extend({
		tagName:"ul",
		className:"linkList",
		initialize: function(){
			App.LinkCollection = new linkCollection();
			// When the search returns a LinkModel render it as a linkItemView.
			this.listenTo(App.LinkCollection,"add",this.renderView);
			// When the NavLayout updates the Basic Model's parameter, 'searchQuery', iniate a search on the server.
			this.listenTo(App.BasicModel,"change:searchQuery",this.searchOnServer);
			// Apply the hexorate plugin to any existing links.
			$(".linkTag").hexorator({baseColor:10});
		},
		mergeToMaster: function(TempLinkCollection){
			// Delete models in the master collection that are not in the temp collection.
			_.each(App.LinkCollection.models,function(model,i){
				var id = model.id;
				if(TempLinkCollection.get(id) == undefined){
					model.set("tempRemove",true);
					App.LinkCollection.remove(id);
				}
			})
			// Transfer models in the temp collection to the master collection if they don't yet exist.
			App.LinkCollection.add(TempLinkCollection.toJSON()); // This will result calls to the renderView method.
		},
		searchOnServer: function(){
			var thisView = this,
			 	query =  App.BasicModel.get("searchQuery");
			// Don't begin a search if the query is blank.			
			if(query != ""){
				// NavLayout sets the BasicModel's parameter "searchBegin", which indicates whether or not the user has begun typing.		   
				if(App.BasicModel.get("searchBegin")){
					// Create a temporary collection of links, which we'll merge with a master list of search results later.
					var TempLinkCollection = new linkCollection();
					TempLinkCollection.url = "/api/search/info/"+query+"?hash="+hpt+"&key="+kpt+"&blank=0";
					// The 'SearchStart' & 'SearchEnd' parameters indicate to other views when the search has started/ended. 
					App.BasicModel.set("searchStep","SearchStart");
					TempLinkCollection.fetch({
					 	success: function(s){
							// Indicate that the Search has Ended.
							App.BasicModel.set("searchStep","SearchEnd");
							// Merge the results with the master search collection
						 	thisView.mergeToMaster(s);
							// After merging update the links' colors using the hexorator plugin.
						   	$(".linkTag").hexorator('update');
					  	},
					  	error:function(e){ 
							//fail silently 
						}
					});
				}
			}
		},
		renderView: function(item){
			App.LinkItemView = new linkItemView({model:item});
			App.LinkItemView.render();
			// Fancy animation stuff...
			$(App.LinkItemView.el).hide()
			$(".linkList").prepend(App.LinkItemView.el);
			$(App.LinkItemView.el).show("200");
		}
	})
  	return App.SearchView;
});