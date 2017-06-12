angular.module('App.controllers', [])
    .controller('IndexController', ['$scope','$http','$route','$window', function ($scope,$http,$route,$window) {
      var storage = window.localStorage;
      $scope.dashboard = false;
      $scope.preloader = true;
      //check if the user is new or existing
      if(storage.getItem('stepscount'))
      {
        //this means the user is existing
        console.log(storage.getItem('stepscount'));
      }
      else
      {
        console.log('i shdl see this if it is new user');
        //hit the gethealthio and create a new user and fetch all the data source links
        $http({
          url: 'https://platform.gethealth.io/v1/health/account/user/',
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({user: { uid:'1'},access_token:'A8AC3C0B4F18AD1BC5199D2055388BE2F5600200'})
        }).success(function (data) {
          console.log(data);
        }).error(function (data) {
          console.log(data);
        });
      }
      // $http({
      //   url: 'https://parseapi.back4app.com/classes/contacts?limit=999',
      //   method: "GET",
      //   headers: { 'X-Parse-Application-Id': 'Fdo6szLdxY1gndKElzfBljZoXvq1DRM84w8dwlvo', 'X-Parse-REST-API-Key': 'svq43qepgkP1S333jwJzCva6r2mPySuO2SdekWdr', 'Content-Type': 'application/json' },
      //   data: JSON.stringify({
      //     //for now nothing
      //   })
      // }).success(function (data) {
      //   console.log(data.results);
      //   //clear the old data
      //   storage.clear();
      //   var datalist = data.results;
      //   //load the new data
      //   datalist.forEach(function(each){
      //     storage.setItem(each.objectId,JSON.stringify(each));
      //   });
      //   $scope.ContactsResult = data.results;
      //   $scope.preloader = false;
      //   $scope.contacts = true;
      // }).error(function (data) {
      //   var localdata = []
      //   console.log(storage.length);
      //   for (var i = 0; i < storage.length; i++){
      //     localdata.push(JSON.parse(storage.getItem(storage.key(i))));
      //   }
      //   $scope.ContactsResult = localdata;
      //   $scope.preloader = false;
      //   $scope.contacts = true;
      //   Materialize.toast('Offline data!', 2000);
      // });
      $scope.reloadroute = function() {
        $route.reload();
      }
    }])
    .controller('ParamController', ['$scope','$routeParams','$http', function ($scope,$routeParams,$http) {
      var storage = window.localStorage;
      $scope.params = $routeParams;
      console.log(JSON.parse(storage.getItem($scope.params.userid)));
      $scope.contactda = JSON.parse(storage.getItem($scope.params.userid));
      $scope.contactview = true;
    }])
    .controller('HelpSomeoneController', ['$scope','$http','$route','$window', function ($scope,$http,$route,$window) {
      var storage = window.localStorage;
      $scope.preloader = true;
      $scope.listofhelps = false;
      $http({
        url: 'https://parseapi.back4app.com/classes/helps?limit=999',
        method: "GET",
        headers: { 'X-Parse-Application-Id': 'Fdo6szLdxY1gndKElzfBljZoXvq1DRM84w8dwlvo', 'X-Parse-REST-API-Key': 'svq43qepgkP1S333jwJzCva6r2mPySuO2SdekWdr', 'Content-Type': 'application/json' },
        data: JSON.stringify({
          //for now nothing
        })
      }).success(function (data) {
        var datalist = data.results;
        //load the new data
        $scope.issuesresult = data.results;
        $scope.preloader = false;
        $scope.listofhelps = true;
      }).error(function (data) {
        $scope.preloader = false;
        $scope.listofhelps = true;
        Materialize.toast('Something went wrong', 2000);
      });
      $scope.reloadroute = function() {
        $route.reload();
      }
    }])
    .controller('HelpParamController', ['$scope','$routeParams','$http', function ($scope,$routeParams,$http) {
      $scope.issueview = false;
      $scope.preloader = true;
      $scope.params = $routeParams;
      $http({
        url: encodeURI('https://parseapi.back4app.com/classes/helps?where={"objectId":"'+$scope.params.qid+'"}'),
        method: "GET",
        headers: { 'X-Parse-Application-Id': 'Fdo6szLdxY1gndKElzfBljZoXvq1DRM84w8dwlvo', 'X-Parse-REST-API-Key': 'svq43qepgkP1S333jwJzCva6r2mPySuO2SdekWdr', 'Content-Type': 'application/json' },
        data: JSON.stringify({
          //for now nothing
        })
      }).success(function (data) {
        $scope.issueda = data.results[0];
        $scope.preloader = false;
        $scope.issueview = true;
      }).error(function (data) {
        $scope.preloader = false;
        $scope.issueview = true;
        Materialize.toast('Something went wrong.', 2000);
      });

    }])
    .controller('NeedHelpController',['$scope','$http', function($scope,$http) {
      $scope.helpform = true;
      $scope.helpresult = false;
      $scope.preloader = false;
      $scope.submit = function () {
        $scope.helpform = false;
        $scope.preloader = true;
        $http({
          url: 'https://parseapi.back4app.com/classes/helps',
          method: "POST",
          headers: { 'X-Parse-Application-Id': 'Fdo6szLdxY1gndKElzfBljZoXvq1DRM84w8dwlvo', 'X-Parse-REST-API-Key': 'svq43qepgkP1S333jwJzCva6r2mPySuO2SdekWdr', 'Content-Type': 'application/json' },
          data: JSON.stringify({
            title:$('#title').val(),
            description:$('#detailed').val(),
            name:$('#name').val(),
            phone:parseInt($('#phone').val())
          })
        }).success(function (data) {
          $scope.helpresultdesc = "Successfully added."
          $scope.preloader = false;
          $scope.helpresult = true;
        }).error(function (data) {
          $scope.helpresultdesc = "Something went wrong. Try again later."
          $scope.preloader = false;
          $scope.helpresult = true;
        });
      }
    }]);
