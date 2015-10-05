angular.module('guestbook', [ 'ngRoute' ])
  .config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl : 'home.html',
		controller : 'home'
	}).otherwise('/');

  })
  .controller('home', function($scope, $http) {
	  $scope.save=function(){
		  
		  var message = $scope.message;
		  $http.post("/message", message).success(function(data){
			  console.log("Saved" + data);
			  $http.get("/message/all").success(function(data){
				  console.log("Get after saving data" + JSON.stringify(data));
				  $scope.messageList = data;
				  $scope.message.name = "";
				  $scope.message.message = "";
			  });
		  });
	  }	  
  });