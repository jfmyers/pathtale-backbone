/* 
   Filename: misc.js
   Summary: Useful methods that all application modules will find helpful.
*/ 
var Misc = {
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
		
	}
}