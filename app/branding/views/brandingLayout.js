/* 
   Filename: brandingLayout.js
   Summary: This layout renders the handles the uploading of a brand logo
	 		and previewing of a user's branded vide-chat page.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'branding/models/testLinkModel',
  'text!branding/templates/branding-tmpl.html'
], function($, _, Backbone, Marionette, App, testLinkModel, brandingTemplate){
    App.BrandingLayout = Marionette.Layout.extend({
		template: brandingTemplate,
		className:"branding",
		initialize: function(){
			var thisView = this;
			// Give the iframe 500ms to load before calling this.getIframe()
			setTimeout(function(){
				thisView.getIframe();
			},500);
		},
		events:{
			"click #preview"	:	"preview"
		},
		getIframe:function(){
			/* 
				The image upload form is held an iframe, attach this view to the iframe using the 
				utilities method iframeRef(), then bind a click event to the 'saveLogoButton' within the iframe.
			*/
			thisView = this;
			var iframe = App.ViewUtilities.iframeRef( document.getElementById('imageUpload') );
			var saveLogoButton = iframe.getElementById('saveLogoButton');
  		 	 $(saveLogoButton).click(function(){
  			  	thisView.updatePhoto();
  		 	 })
		},
		updatePhoto:function(){
			/*
				 When the 'saveLogoButton' is clicked the iframe handles the upload of the image to AWS S3,
				 this method, waiting 3000ms and refreshes the iframe, to reveal the new branded, logo.
				 ****Return to this method in the futre and implement a more event driven method****
			*/
			setTimeout(function(){
				$("#logoAlert").remove();
				var iframe = App.ViewUtilities.iframeRef( document.getElementById('imageUpload') );
				var src = "https://s3.amazonaws.com/logo-small/"+iframe.getElementById('pictureSrc').value;
				$(".companyLogo").attr("src",src);
			}, 3000);
		},
		preview: function(e){
			var target = $(e.currentTarget);
			App.TestLinkModel = new testLinkModel({cid:App.CompanyModel.get("id"),uid:App.UserModel.get("md5_id")});
			App.TestLinkModel.url = '../../../api/testlink/info/'+App.key+"?hash="+App.hash+"&key="+App.key;
			App.TestLinkModel.save({},{
				success:function(s)
				{
					$("#goToPreview").attr("action","../../../preview/"+s.get("link")).submit();
				},
				error: function(e)
				{
					alert("A Path Tale server error has occured. Please refresh the page and try again!");
				}
			})
		}
	})
  	return App.BrandingLayout;
});