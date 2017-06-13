musicAppVar.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			  templateUrl: 'pages/org.html',
			  controller: 'mainController'
			  })
		.when('/concerts', {
			  templateUrl: 'pages/concerts.html',
			  controller: 'mainController'
			  })
		.when('/concert/pieces', {
			  templateUrl: 'pages/pieces.html',
			  controller: 'mainController'
			  })
        .when('/concert/instruments', {
			  templateUrl: 'pages/instruments.html',
			  controller: 'mainController'
			  })
		.when('/concert/pieces/parts', {
			  templateUrl: 'pages/parts.html',
			  controller: 'mainController'
			  })
});