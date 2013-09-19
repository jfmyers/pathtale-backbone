/* 
   Filename: billingLayout.js
   Summary: This layout handles the following:
	 			1.) Update a Customer's Plan (upgrade or downgrade)
				2.) Update credit card on file.
				3.) View billing history.
*/ 
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject',
  'text!billing/templates/billing-tmpl.html'
], function($, _, Backbone, Marionette, App, billingTemplate){
    App.BillingLayout = Marionette.Layout.extend({
		template: billingTemplate,
		initialize: function(){
			/* When a user updates their plan restyle the availble plans buttons to
			   reflect whether the plan would be an upgrade or a downgrade. */
			this.listenTo(App.BillingModel,"change:updatePlan",this.buttonStyler);
			// When a user updates their credit card update the card on file modal to reflect this change.
			this.listenTo(App.BillingModel,"change:last4",this.cardUpdater);
			this.listenTo(App.BillingModel,"change:exp_year",this.cardUpdater);
			this.listenTo(App.BillingModel,"change:exp_month",this.cardUpdater);
		},
		events:{
			"click #showUpdateCardModal": "showUpdateCardModal",
			"click #showCurrentCardModal": "showCurrentCardModal",
			"click .upgradePlan": "showUpgradeModal",
			"click #updatePlan": "updatePlan",
			"click #updateCard": "updateCard"
		},
		showUpdateCardModal: function(e){
			// Displays the modal nessesary to update a credit card.
			$("#updateCardModal").modal('toggle');
		},
		showCurrentCardModal: function(e){
			// Displays the modal with the user's current credit card on file. (Displays last 4-digits & expiration)
			$("#currentCardModal").modal('toggle');
		},
		showUpgradeModal: function(e){
			// Displays a modal asking if the user is sure that he/she want to upgrade or downgrade their plan.
			App.BillingModel.set("updatePlanTemp",$(e.currentTarget).attr("data-plan"));
			$("#upgradeModal").modal('toggle');
		},
		updatePlan: function(e){
			/* Make a call to PathTale API, which calls Stripe API and updates the user's plan. 
			   Charges are pro-rated and taken immediate effect. */
			App.BillingModel.url = "/api/billing/plan/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";
			App.BillingModel.set("updatePlan", App.BillingModel.get("updatePlanTemp") );
			$("#upgradeModal").modal('toggle');
			App.BillingModel.save({},{
				success: function(s)
				{
					//succeed silently
				},
				error: function(e)
				{
					alert("A Path Tale server error has occured. Please refresh the page and try again!");
				}
			})
		},
		cardUpdater: function(e){
			/* When a user updates their credit card, the current card on file modal, is left unupdated,
				so update last 4 card digits and card expiration. */
			//update card number
			$("#cardFour").html("<strong>Card Number:</strong> ************"+App.BillingModel.get("last4"));
			//update card expiration
			$("#cardExp").html("<strong>Expiration:</strong> "+App.BillingModel.get("exp_month")+"/"+App.BillingModel.get("exp_year"));
		},
		buttonStyler: function(e){
			// There are 6 plans available, starter, starteryr, team, teamyr, proteam, proteamyr
			var newPlan = App.BillingModel.get("updatePlan"),
				newPlanSelector = "#p"+newPlan,
				currentPlan = App.BasicModel.get("company").plan,
				currentPlanSelector = "#p"+currentPlan,
				parentSelector = $(newPlanSelector).parent();

			if(newPlan == "starter") {
				$("#pstarteryr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"starteryr\" id=\"pstarteryr\">Upgrade</a>");
				$("#pteam").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"team\" id=\"pteam\">Upgrade</a>");
				$("#pteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"teamyr\" id=\"pteamyr\">Upgrade</a>");
				$("#pproteam").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteam\" id=\"pproteam\">Upgrade</a>");
				$("#pproteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteamyr\" id=\"pproteamyr\">Upgrade</a>");
				
			} else if(newPlan == "starteryr") {
				$("#pstarter").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starter\" id=\"pstarter\">Downgrade</a>");
				
				$("#pteam").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"team\" id=\"pteam\">Upgrade</a>");
				$("#pteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"teamyr\" id=\"pteamyr\">Upgrade</a>");
				$("#pproteam").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteam\" id=\"pproteam\">Upgrade</a>");
				$("#pproteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteamyr\" id=\"pproteamyr\">Upgrade</a>");
				
			} else if(newPlan == "team") {
				$("#pstarter").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starter\" id=\"pstarter\">Downgrade</a>");
				$("#pstarteryr").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starteryr\" id=\"pstarteryr\">Downgrade</a>");
				
				$("#pteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"teamyr\" id=\"pteamyr\">Upgrade</a>");
				$("#pproteam").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteam\" id=\"pproteam\">Upgrade</a>");
				$("#pproteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteamyr\" id=\"pproteamyr\">Upgrade</a>");
				
			} else if(newPlan == "teamyr") {
				$("#pstarter").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starter\" id=\"pstarter\">Downgrade</a>");
				$("#pstarteryr").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starteryr\" id=\"pstarteryr\">Downgrade</a>");
				$("#pteam").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"team\" id=\"pteam\">Downgrade</a>");
				
				$("#pproteam").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteam\" id=\"pproteam\">Upgrade</a>");
				$("#pproteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteamyr\" id=\"pproteamyr\">Upgrade</a>");
				
			} else if(newPlan == "proteam") {
				$("#pstarter").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starter\" id=\"pstarter\">Downgrade</a>");
				$("#pstarteryr").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starteryr\" id=\"pstarteryr\">Downgrade</a>");
				$("#pteam").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"team\" id=\"pteam\">Downgrade</a>");
				$("#pteamyr").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"teamyr\" id=\"pteamyr\">Downgrade</a>");
				
				$("#pproteamyr").parent().html("<a class=\"orange-button-flat upgradePlan\" data-plan=\"proteamyr\" id=\"pproteamyr\">Upgrade</a>");
				
			} else if(newPlan == "proteamyr") {
				$("#pstarter").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starter\" id=\"pstarter\">Downgrade</a>");
				$("#pstarteryr").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"starteryr\" id=\"pstarteryr\">Downgrade</a>");
				$("#pteam").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"team\" id=\"pteam\">Downgrade</a>");
				$("#pteamyr").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"teamyr\" id=\"pteamyr\">Downgrade</a>");
				$("#pproteam").parent().html("<a class=\"grey-button-flat upgradePlan\" data-plan=\"proteam\" id=\"pproteam\">Downgrade</a>");
				
			}
			$(parentSelector).html("<p id=\"p"+newPlan+"\">Your Plan</p>");
			// Set the "plan" parameter of the BasicModel to the updated Plan
			App.BasicModel.get("company").plan = App.BillingModel.get("updatePlan");
			
		},
		updateCard: function(e)
		{
			/* After card passes tests, call stripe js api to validate the card details 
			   and get a stripe token. Once the stripe token has been recieved finish, 
			   via the finishCardUpadte() method. 
			*/
			var target = e.currentTarget,
			    $form = $(".payment-form"),
			    expMonth = $("#exp-month").val(),
			    expYear = $("#exp-year").val();
				
			if(expMonth == ""){
				App.ViewUtilities.errorBox("#payment-form", "Enter an expiration month.", 10000);
				return false;
			}
			if(expYear == ""){
				App.ViewUtilities.errorBox("#payment-form", "Enter an expiration year.", 10000);
				return false;
			}
			//add loader
			$(target).css("width","82%");
			$(".modal-footer").append("<img class='blockloader'src='/front/assets/loaders/blockLoader.gif' style='float:right;width:30px;height:30px;margin:2px 0px 0px 0px;padding:0px;border:none;' />");
			
			// Disable the submit button to prevent repeated clicks
			$(target).prop('disabled', true).addClass("disabledOrange");
			var finishCardUpdate = this.finishCardUpdate;
			
			var stripeResponseHandler = function(status,response) {
			  	var $form = $('.payment-form');
			  	if(response.error){
					// Show the errors on the form
					App.ViewUtilities.errorBox("#payment-form", response.error.message, 20000);
					$(target).prop('disabled', false).removeClass("disabledOrange").css("width","100%");
					$(".blockloader").remove();
				}else{
					// token contains id, last4, and card type
					var token = response.id;
					// Insert the token into the form so it gets submitted to the server
					$form.append($('<input type="hidden" id="stripeToken" name="stripeToken" />').val(token));
					var stripeToken = $("#stripeToken").val();
					App.BillingModel.set("stripeCardToken",stripeToken);
					finishCardUpdate();
				}
			};
			Stripe.createToken($form, stripeResponseHandler);
		},
		finishCardUpdate: function()
		{
			/* 
			   Now that the card has been validated by stripe js API and a stripe token
			   has been recieved, send the token to the PathTale API where the Stripe API
			   will be called and the customer object updated to reflect this change.
			*/
				
			App.BillingModel.url = "/api/billing/card/"+App.key+"?key="+App.key+"&hash="+App.hash+"&zero=0";
			App.BillingModel.save({},{
				success: function(s)
				{
					$("#updateCard").prop('disabled', false).removeClass("disabledOrange").css("width","100%");
					$(".blockloader").remove();
					$("#stripeToken").remove();
					
					if(s.get("status") != 200) {
						App.ViewUtilities.errorBox("#payment-form", s.get("message"), 25000);
					} else {
						$("#updateCardModal").modal('toggle');
						$("#payment-form").children("input").each(function(c, item){
							$(item).val("");
						})
						App.BillingModel.set("last4",s.get("card").last4);
						App.BillingModel.set("exp_month",s.get("card").exp_month);
						App.BillingModel.set("exp_year",s.get("card").exp_year);
						
						// Store this data in the BasicModel as well.
						App.BasicModel.get("order").last4 = s.get("card").last4;
						App.BasicModel.get("order").exp_month = s.get("card").exp_month;
						App.BasicModel.get("order").exp_year = s.get("card").exp_year;
					}
					
				},
				error: function(e)
				{
					App.ViewUtilities.errorBox("#payment-form", "Error! Refresh the page. Try Again.", 25000);
				}
			})
			
		}
	})
  	return App.BillingLayout;
});