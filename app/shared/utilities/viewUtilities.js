/* 
   Filename: viewUtilities.js
   Summary: Useful utility type methods used across application views.
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'appObject'
],function($, _, backbone, Marionette, App){
  App.ViewUtilities = {
	 // Animate text, Searching. --> Searching.. --> Searching... , repeat process.
	 animateSearchingText: function(cmd, timerId)
	 {
		if(cmd == 'start'){
			var timerId = setInterval(function(){
				var text = $(".homeBodyTextBreak").find("h3").text();
				if(text.length == 9){
					$(".homeBodyTextBreak").find("h3").text("Searching.");
				}else if(text.length == 10){
					$(".homeBodyTextBreak").find("h3").text("Searching. .");
				}else if(text.length == 12){
					$(".homeBodyTextBreak").find("h3").text("Searching. . .");
				}else if(text.length == 14){
					$(".homeBodyTextBreak").find("h3").text("Searching. . . .");
				}else if(text.length == 16){
					$(".homeBodyTextBreak").find("h3").text("Searching");
				}
			},150)
		}else{
			clearInterval(timerId);
		}
		return timerId;
	 },
 	 // Displays a customized error box that self destructs after a user specified time.
  	 errorBox: function(selector, text, timeout)
  	 {
  		// selector = element that the error message will be prepended to, ex: #form_container or .form-container
  		// text = the message to be displayed
  		// timeout = How long should this error message stick arround? Specify in ms, ex: 1000ms = 1 second
  		$(".generatedErrorBox").remove();
  		var html = "<div class='generatedErrorBox' > " +
  				   		"<p>"+text+"</p>" +
  				   "</div>";
  		$(selector).prepend(html);
		
  		var t = setTimeout(function(){
  			$(".generatedErrorBox").remove();
  		},timeout)
		
  	 },
	 // Allows a view to access html elements contained within an iframe in it's view.
 	 iframeRef: function(frameRef){
 	 	return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument;
 	 },
	 // Use Regular Expressions to determine if user inputted email is valid.
 	 isValidEmailAddress: function(emailAddress)
 	 {
 		var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
 		return pattern.test(emailAddress);
 	 },
	 // Displays a BootStrap.js popover as a warning. Self destructs after 3200ms.
 	 warning:function(selector, width, text, placement)
 	 {
 		// selector = element the popover will be attached to. ex: #email_input, .email_input
 		// width = width of the popover
 		// text = text to go inside the popover
 		// placement = where should the popover appear relative to the selector: top, bottom, left, right
 		var options = {title:"",content:"<div style='float:left;width:"+width+"px;height:auto;padding: 2px 0px 8px 0px;'><h6 style='float:left;width:auto;height:auto;margin:0px;padding:0px;color:#f26d4f;'>"+text+"</h6><i style='float:left;width:18px;height:18px;margin:2px 0px 0px 12px;padding:0px;opacity:.65;' class='icon-exclamation-sign'></i></div>",trigger:'manual',html:true,placement:placement};
 		$(selector).popover(options);
 		$(selector).popover('show');
 		$(selector).css("border","1px solid #f26d4f").css("background","#F3E9E7");
 		var t = setTimeout(function(){
 			$(selector).css("border","1px solid #CCC").css("background","#fbfbfb");
 			$(selector).popover('destroy');
 		},3200);
 	 },
	 // Displays a BootStrap.js popover as a success alert. Self destructs after 3200ms.
	 // ***In the future merge this with warning alert above***
 	 success:function(selector, width, text, placement)
 	 {
 		// selector = element the popover will be attached to. ex: #email_input, .email_input
 		// width = width of the popover
 		// text = text to go inside the popover
 		// placement = where should the popover appear relative to the selector: top, bottom, left, right
 		var options = {title:"",content:"<div style='float:left;width:"+width+"px;height:auto;padding: 2px 0px 8px 0px;'><h6 style='float:left;width:auto;height:auto;margin:0px;padding:0px;color:green;'>"+text+"</h6><i style='float:left;width:18px;height:18px;margin:2px 0px 0px 12px;padding:0px;opacity:.65;' class='icon-exclamation-sign'></i></div>",trigger:'manual',html:true,placement:placement};
 		$(selector).popover(options);
 		$(selector).popover('show');
 		$(selector).css("border","1px solid green");
 		var t = setTimeout(function(){
 			$(selector).css("border","1px solid green");
 			$(selector).popover('destroy');
 		},3200);
 	 }
  }
  return App.ViewUtilities;
});