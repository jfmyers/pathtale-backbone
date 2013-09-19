/* 
   Filename: linkItemView.js
   Summary: This view handles the rendering, editing & removal of linkItemViews.

   Workflow for Removing Tags associated with a linkItemView:
        this.toggleRemove() --> toolsCompositeView click #deleteLink --> toolsCompositeView.deleteLinks() --> this.removeView()

   Workflow for Editing Tags associated with a linkItemView:
   		this.editTagsView() --> this.save() --> this.textToTags() --> this.compareTagObjects() --> this.updateTagView()
	
   *What's a tag?
		- Every link can be categorized/organized with tags. For example a recruiter interviewing for a position in software
		  engineering might add the tags, "vp of enginner", "backbone", "python", "ruby" to the link.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'text!links/templates/link-item-tmpl.html'
], function($, _, Backbone,Marionette, App, homeLinkItemTemplate){
    App.LinkItemView = Marionette.ItemView.extend({
		template: homeLinkItemTemplate,
		tagName: "li",
		events:{
			"click 		h3"	 			:  			"editTagsView",		
			"click 		input"	 	    :  			"toggleRemove",
			"blur 		textarea"		: 	 		"save"
		},
		initialize: function(){
			// This view's model has a parameter, 'deleteNow' that tells Backbone whether the view & model should be removed.
			this.listenTo(this.model, 'change:deleteNow', this.removeView);
			// If this is a brand new link, the model's parameter, 'autoexpand', will be set to true, allowing a user to add tags to the link.
			var thisView = this;
			setTimeout(function(){
				if(thisView.model.get("autoExpand") == true){
					thisView.editTagsView();
				}
			},500);
		},
		/* Removing Link Methods */
		removeView: function(){	
			// This method is called when the ToolsCompositeView method, 'deleteLinks', sets this model's deleteNow parameter to true.	
			var thisView = this;
			if(this.model.get("deleteNow") == true){
				// Send HTTP Delete to API and destroy the model.
				var id = this.model.get("id"),
					json = '{"id":'+id+',"uid":'+'"'+kpt+'"}';
				this.model.url = "../../../api/link/info/"+kpt+"?key="+kpt+"&hash="+hpt+"&z=0";
				
				this.model.destroy({data:{
					"model": json
				}});
				// Remove view, do some animation effect first.
				$(this.el).fadeOut("500",function(){
					thisView.remove();
				})
			}
		},
		toggleRemove: function(){
			/* 
			   Within the view a check-box is used to indicate the user's intent to remove a link.
			   When the user toggles the check-box update the model accordingly(0 if not checked, 1 if checked). 
			*/	
			if(this.model.get("remove") == 1){
				this.model.set("remove",0);
			}else{
				this.model.set("remove",1);
			}
		},
		/* Editing Link Methods */
		editTagsView: function(e){
			/* 
				This method expands the view to reveal a text area where a user can add or delete tags
				This expanded view can be toggled on or off.
			*/
			var thisView = this;
			if(this.model.get("open") == true){
				$(this.el).height("97px");
				$(this.el).children().height("97px");
				this.model.set("open",false);
				// Fancy animation stuff...
				// FadeOut tagEdit area.
				$(this.el).find(".tagEdit").fadeOut(200,function(){
					// FadeIn tags.
					$(thisView.el).find(".tagHolder").fadeIn(300);
				});			
			}else{
				$(this.el).height("250px");
				$(this.el).children().height("250px");
				this.model.set("open",true);
				// Fancy animation stuff...
				// FadeOut tags.
				$(this.el).find(".tagHolder").fadeOut(200, function(){
					// FadeIn tagEdit area.
					$(thisView.el).find(".tagEdit").fadeIn(300);
				});
			}
		},
		save: function(e){
			/*
				This method saves tags after a user has editing a link's tags, but only if 
			    there is a difference between the new tags and the old tags.
			*/
			var text = $(e.currentTarget).val(),
			 	needToUpdate = false,
				// Convert tags in text-area from comma separated to a tag object
			    parsedTags = this.textToTags(text),
				// Get the existing tags, to be place in a tag object and compared to the parsedTag object
			    existingTags = this.model.get("tags"),
			    newExistingTagObject = {};
			
			// Create an object that contains all the existing tags for this link.
			_.each(existingTags,function(item,i){
				if(item.tag != undefined){
					newExistingTagObject[i] = $.trim(item.tag);
				}else{
					newExistingTagObject[i] = $.trim(item);
				}
			})
			
			// Is there a difference between existing tag objects and the new parsed tag objects?
			needToUpdate = this.compareTagObjects(newExistingTagObject,parsedTags);
			if(needToUpdate == true){
				this.model.set("tags",parsedTags);
				this.model.save({tagUpdate:1},{
					success: function(s){
						var options = {title:"",content:"<div style='float:left;width:68px;height:auto;padding: 1px 0px 4px 0px;'><h6 style='float:left;width:auto;height:auto;margin:0px;padding:0px;color:#22262e;'>Saved</h6><i style='float:left;width:18px;height:18px;margin:3px 0px 0px 12px;padding:0px;' class=' icon-ok-sign'></i></div>",trigger:'manual',html:true,placement:'bottom'};
						$(e.currentTarget).popover(options);
						$(e.currentTarget).popover('show');
						setTimeout(function(){
							$(e.currentTarget).popover('destroy');
						},2000);
					},
					error: function(e){
						var options = {title:"",content:"<div style='float:left;width:110px;height:auto;padding: 1px 0px 5px 0px;'><h6 style='float:left;width:auto;height:auto;margin:0px;padding:0px;color:red;'>Failed to Save</h6><i style='float:left;width:18px;height:18px;margin:1px 0px 0px 12px;padding:0px;' class='icon-exclamation-sign'></i></div>",trigger:'manual',html:true,placement:'bottom'};
						$(e.currentTarget).popover(options);
						$(e.currentTarget).popover('show');
						setTimeout(function(){
							$(e.currentTarget).popover('destroy');
						},3000);
					}
				});
				// Now update the current view to display the new tags.
				this.updateTagView();
			}
		},
		compareTagObjects: function(o1, o2) {
			/* 
				Compare object1, to object2 to see if there is a difference.
				Called from the save() method.
			*/
			var k1 = Object.keys(o1).sort(),
				k2 = Object.keys(o2).sort();
			if (k1.length != k2.length) return true;
			for(var i = 0;i<k2.length;i++){
				if(!_.contains(o1,o2[i])){
					return true;
					break;
				}
			}
		},
		updateTagView: function(){
			/*
				Called after editing if there is a difference between edits and existing tags.
			*/
			var thisView = this;
			this.$(".linkTag").remove();
			var tags = this.model.get("tags");
			_.each(tags,function(tag,i){
				var tagHtml = '<a class="linkTag newTag">'+tag+'</a>';
				thisView.$(".tagHolder").append(tagHtml);
			})
			// After adding new tags, call the hexorator plug-in to update tag colors.
			$(".linkTag").hexorator('update');
		},
		textToTags:function(text){
			/* 
				When editing tags, string must separated by comma, parse and added to an object.
				Example: String = "tag1, tag2, tag3, tag4" to Object{ 0: "tag1", 1: "tag2", 2: "tag3", etc..
				Called from the save() method.
			*/
			var tags = text.split(','),
				parsedTags = {};
			_.each(tags,function(tag,i){
				tag = $.trim(tag);
				if(tag != ""){
					parsedTags[i] = tag;
				}
			})
			return parsedTags;
		}
		
	})
  	return App.LinkItemView;
});