/**
 * Created by NNNGUYEN on 9/21/2015.
 */
posiba.controller('userController', function($scope, $http, $q) {
		// create a message to display in our view
    $scope.message = 'User Module';
    $scope.users = new Array();
    $scope.selectedUser = null;

    $scope.getUsers = function(pageIndex, searchString){

        var params = {
            pageIndex: pageIndex || 0,
            searchString: searchString || ""
        };

        var usrService = new UserDataService();
        var deferred = $q.defer();
        usrService.getUsers(params, function(result){
          deferred.resolve(result);
        });

        deferred.promise.then(function(users){
          if(users && users.length > 0){
              $.each(users, function(index, usr){
                  var usrModel = new User();
                  usrModel.userId = usr.userId;
                  usrModel.userName = usr.userName;
                  usrModel.gender = usr.gender;
                  usrModel.email = usr.email;
                  usrModel.website = usr.website;
                  usrModel.skills = usr.skills;

                  $scope.users.push(usrModel);
              });
          }
        });
    };

    $scope.editUser = function(userId){
        if(userId) {
            var usrService = new UserDataService();
            var deferred = $q.defer();
            usrService.getUserById(userId, function(result){
              deferred.resolve(result);
            });
            deferred.promise.then(function(usr){
                if(usr) {
                  var usrModel = new User();
                  usrModel.userId = usr.userId;
                  usrModel.userName = usr.userName;
                  usrModel.gender = usr.gender;
                  usrModel.email = usr.email;
                  usrModel.website = usr.website;
                  usrModel.skills = usr.skills;

                  $scope.selectedUser = usrModel;
                }
            });
        }
    };

    $scope.saveUser = function(user){
        var users = [];
        $scope.selectedUser = angular.copy(user);
        var usrService = new UserDataService();
        var deferred = $q.defer();
        usrService.updateUser($scope.selectedUser, function(result){
          deferred.resolve(result);
        });

        deferred.promise.then(function(data){
          if(data && data.users.length > 0){
              $.each(data.users, function(index, usr){
                  var usrModel = new User();
                  usrModel.userId = usr.userId;
                  usrModel.userName = usr.userName;
                  usrModel.gender = usr.gender;
                  usrModel.email = usr.email;
                  usrModel.website = usr.website;
                  usrModel.skills = usr.skills;

                  users.push(usrModel);
              });
              $scope.users = users;
          }
        });
    };
    $scope.deleteUser = function(userId){
        var users = [];
        var usrService = new UserDataService();
        var deferred = $q.defer();
        usrService.deleteUser(userId, function(result){
          deferred.resolve(result);
        });

        deferred.promise.then(function(data){
          if(data && data.users.length > 0){
              $.each(data.users, function(index, usr){
                  var usrModel = new User();
                  usrModel.userId = usr.userId;
                  usrModel.userName = usr.userName;
                  usrModel.gender = usr.gender;
                  usrModel.email = usr.email;
                  usrModel.website = usr.website;
                  usrModel.skills = usr.skills;

                  users.push(usrModel);
              });
              $scope.users = users;
          }
        });
    };

    $scope.getUsers();
});
