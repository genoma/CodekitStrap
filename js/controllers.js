// Generated by CoffeeScript 1.8.0
(function() {
  var gulpStrap;

  gulpStrap = angular.module("testApp", []);

  gulpStrap.controller("Head", function($scope) {
    $scope.header = [
      {
        title: "HEADER",
        snippet: "this is an header"
      }
    ];
  });

  gulpStrap.controller("test", function($scope, $http) {
    $http.get("https://api.coindesk.com/v1/bpi/currentprice.json").success(function(data, status, headers, config) {
      $scope.btc = data;
    }).error(function(data, status, headers, config) {
      return console.log(data);
    });
  });

}).call(this);


//# sourceMappingURL=controllers.js.map
