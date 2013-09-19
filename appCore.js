requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: '../../../front/js',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		// App NameSpace
		app: 'app',
		appObject:'appObject',
		// App Module NameSpaces
		account: 'app/account',
		billing: 'app/billing',
		branding: 'app/branding',
		links: 'app/links',
		search: 'app/search',
		shared: 'app/shared',
		team: 'app/team',
		// Library NameSpaces
		jquery:'libs/jquery',
		underscore:'libs/underscore',
		backbone:'libs/backbone',
		marionette:'libs/marionette',
		handlebars:'libs/handlebars',
		bootstrap:'libs/bootstrap',
		datepicker:'libs/bootstrap-datepicker',
		timepicker:'libs/bootstrap-timepicker',
		text:'libs/text',
		domReady:'libs/domReady',
		placeholder:'libs/placeholder',
		iecors:'libs/iecors',
		jqueryCustom:'libs/jqueryCustom',
		avgrund:'libs/avgrund',
		hexorator:'libs/hexorator',
		joyride:'libs/joyride'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'marionette' : {
			deps : ['jquery', 'underscore', 'backbone'],
			exports : 'Marionette'
		},
		'underscore': {
			exports: '_'
		},
		'placeholder': {
			deps: ['jquery'],
			exports: 'Placeholder'
		},
		'iecors': {
			deps: ['jquery'],
			exports: 'Iecors'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'Bootstrap'
		},
		'datepicker': {
			deps: ['jquery'],
			exports: 'datepicker'
		},
		'timepicker': {
			deps: ['jquery'],
			exports: 'timepicker'
		},
		'jqueryCustom': {
			deps: ['jquery'],
			exports: 'jqueryCustom'
		},
		'avgrund': {
			deps: ['jquery'],
			exports: 'avgrund'
		},
		'hexorator': {
			deps: ['jquery'],
			exports: 'hexorator'
		},
		'joyride': {
			deps: ['jquery'],
			exports: 'joyride'
		}
	}
});
// Start the main app logic.
require(['domReady','app/appInitialize','jquery','bootstrap','placeholder','iecors','marionette','datepicker','timepicker','avgrund','hexorator','joyride'],function(domReady,appInitialize,$,bootstrap,placeholder,iecors,marionette,datepicker,timepicker,avgrund,hexorator,joyride){
	appInitialize.initialize();
});