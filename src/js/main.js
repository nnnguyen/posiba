// create the module "Posiba"
var posiba = angular.module("posiba", ['ngRoute', 'google-maps']);
// configure our routes
posiba.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'homeController'
			})

			// route for the about page
			.when('/map', {
				templateUrl : 'views/map.html',
				controller  : 'mapController'
			})

			.when('/user', {
				templateUrl : 'views/user.html',
				controller  : 'userController'
			})

			.when('/chart', {
				templateUrl : 'views/chart.html',
				controller  : 'chartController'
			})
	});
