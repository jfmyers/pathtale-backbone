/* 
   Filename: myAccountLayout.js
   Summary: This layout renders the myAccountLayout and handles the updating of the following information:
			1.) Handle(must be company-admin)
			2.) First Name
			3.) Last Name
			4.) Email
			5.) Oranization Name (must be company-admin)
			6.) Web Site (must be company-admin)
			7.) City (must be company-admin)
			8.) State (must be company-admin)
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'text!account/templates/myAccount-tmpl.html'
], function($, _, Backbone, Marionette, App, myAccountTemplate){
    App.myAccountLayout = Marionette.Layout.extend({
		template: myAccountTemplate,
		events:{
			"blur #inputCompanyName":"updateCompanyName",
			"blur #inputFname":"updateFname",
			"blur #inputLname":"updateLname",
			"blur #inputCity":"updateCity",
			"blur #inputState":"updateState",
			"blur #inputEmail":"toggleEmail",
			"click #updateEmail":"updateEmail",
			"blur #inputWebSite":"updateWebSite",
			"blur #inputHandle":"toggleHandleModal",
			"click #updateHandle":"updateHandle"
		},
		updateCompanyName: function(ev){
			var text = $(ev.currentTarget).val();
			if(text != this.model.get("name")){
				App.BasicModel.get("company").name = text;
				App.CompanyModel.set("name", text);	
				console.log(App.CompanyModel);		
				App.CompanyModel.save({name:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputCompanyName", 110, "Saved", "right");
						} else {
							App.ViewUtilities.warning("#inputCompanyName", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputCompanyName", 65, "Error", "right");
					}
				});
			}
		},
		updateFname: function(ev){
			var text = $(ev.currentTarget).val();
			if(text != App.BasicModel.get("user").fname){
				App.BasicModel.get("user").fname = text;
				App.BasicModel.url = "/api/user/info/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";		
				console.log(App.BasicModel);		
				App.BasicModel.save({fname:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputFname", 110, "Saved", "right");
						} else {
							App.ViewUtilities.warning("#inputFname", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputFname", 65, "Error", "right");
					}
				});
			}
		},
		updateLname: function(ev){
			var text = $(ev.currentTarget).val();
			if(text != App.BasicModel.get("user").lname){
				App.BasicModel.get("user").lname = text;	
				App.BasicModel.url = "/api/user/info/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";		
				App.BasicModel.save({lname:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputLname", 110, "Saved", "right");
						} else {
							App.ViewUtilities.warning("#inputLname", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputLname", 65, "Error", "right");
					}
				});
			}
		},
		toggleEmail:function(ev){
			var text = $(ev.currentTarget).val();
			if(text != App.BasicModel.get("user").email){
				$("#EmailUpdateModal").modal('toggle');
			}
		},
		updateEmail: function(ev){
			$("#EmailUpdateModal").modal('toggle');
			var text = $("#inputEmail").val();
			if(text != App.BasicModel.get("user").email){
				App.BasicModel.get("user").email = text;	
				App.BasicModel.url = "/api/user/info/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";		
				App.BasicModel.save({title:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputEmail", 110, "Saved", "right");
						}else{
							App.ViewUtilities.warning("#inputEmail", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputEmail", 65, "Error", "right");
					}
				});
			}
		},
		updateWebSite: function(ev){
			var text = $(ev.currentTarget).val();
			if(text != this.model.get("website")){
				App.BasicModel.get("company").website = text;
				App.CompanyModel.set("website", text);		
				App.CompanyModel.save({website:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputWebSite", 110, "Saved", "right");
						}else{
							App.ViewUtilities.warning("#inputWebSite", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputWebSite", 65, "Error", "right");
					}
				});
			}
		},
		updateCity: function(ev){
			var text = $(ev.currentTarget).val();
			if(text != this.model.get("city")){
				App.BasicModel.get("company").city = text;	
				App.CompanyModel.set("city", text);		
				App.CompanyModel.save({city:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputCity", 110, "Saved", "right");
						}else{
							App.ViewUtilities.warning("#inputCity", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputCity", 65, "Error", "right");
					}
				});
			}
		},
		updateState: function(ev){
			var text = $(ev.currentTarget).val();
			if(text != this.model.get("state")){
				App.BasicModel.get("company").state = text;	
				App.CompanyModel.set("state", text);		
				App.CompanyModel.save({state:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputState", 110, "Saved", "right");
						}else{
							App.ViewUtilities.warning("#inputState", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputState", 65, "Error", "right");
					}
				});
			}
		},
		toggleHandleModal:function(ev){
			var text = $(ev.currentTarget).val();
			if(text != this.model.get("handle") && text != ""){
				$("#HandleUpdateModal").modal('toggle');
			}
		},
		updateHandle: function(ev){
			$("#HandleUpdateModal").modal('toggle');
			var text = $("#inputHandle").val();
			if(text != this.model.get("handle") && text != ""){	
				App.BasicModel.get("company").handle = text;
				App.CompanyModel.set("handle", text);
				App.CompanyModel.save({handle:text},{
					success: function(s){
						if(s.get("status")==200){
							App.ViewUtilities.success("#inputHandle", 110, "Saved", "right");
						}else if(s.get("status")==409){
							App.ViewUtilities.warning("#inputHandle", 170, "Handle Taken", "right");
						}else{
							App.ViewUtilities.warning("#inputHandle", 65, "Error", "right");
						}
					},
					error: function(e){
						App.ViewUtilities.warning("#inputHandle", 65, "Error", "right");
					}
				});
			}
		}
	})
  	return App.myAccountLayout;
});