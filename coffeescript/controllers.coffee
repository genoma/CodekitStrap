# Base gulpstrap js/coffeescript tp handle
# Angular js framework in bootsrap (example)
gulpStrap = angular.module("testApp", [])

gulpStrap.controller "Head", ($scope) ->
  $scope.header = [
    {
      title: "HEADER"
      snippet: "this is an header"
    }
  ]
  return



# HOWTO GET DATA FROM AJAX JSON FILE
# This is a basic example how to get
# a from a json file and parse its contents
# on your html (index.html line 56)
gulpStrap.controller "test", ($scope, $http) ->
  $http.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .success (data, status, headers, config) ->
      $scope.btc = data
      return
    .error (data, status, headers, config) ->
      console.log data
    return
