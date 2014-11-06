gulpStrap = angular.module("testApp", [])

gulpStrap.controller "Head", ($scope) ->
  $scope.header = [
    {
      title: "HEADER"
      snippet: "this is an header"
    }
  ]
  return
