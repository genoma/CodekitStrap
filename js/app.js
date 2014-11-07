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

$(function() {
  return console.log("G");
});

//# sourceMappingURL=../maps/app.js.map