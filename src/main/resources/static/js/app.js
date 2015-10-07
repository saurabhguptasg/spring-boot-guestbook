angular.module('guestbook', [ 'ngRoute' ])
  .config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl : 'home.html',
		controller : 'home'
	}).when('/message', {
		templateUrl : 'message.html',
		controller : 'message'
	})
	.otherwise('/');

  })
  .controller('message', function($scope, $http) {
	  this.loadData = function() {
		  $http.get("/message/all").success(function(data){
			  console.log("Get after saving data: " + JSON.stringify(data));
			  $scope.messageList = data;
		  });
	  }
	  var _this=this;
	  $scope.save=function(){
		  var message = $scope.message;
		  $http.post("/message", message).success(function(data){
			  console.log("Saved: " + data);
			  _this.loadData();
			  $scope.message.name = "";
			  $scope.message.message = "";
		  });
	  }
	  this.loadData();
  })
  .controller('home', function($scope, $http, $location) {
	  $scope.goKillApp = function() {
		  $http.get("/killApp").success(function(data){
			  console.log("Killed: " + data);
		  });
	  }
	  $scope.goMessage = function() {
		  $location.path("/message");
	  }
	  this.initCtrl = function() {
		  $http.get("/cloudinfo").success(function(data){
			  $scope.cloudinfo = data;
		  });  
	  }
	  this.initCtrl();
  });