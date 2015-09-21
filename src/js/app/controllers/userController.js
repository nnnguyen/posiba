/**
 * Created by NNNGUYEN on 9/21/2015.
 */
posiba.controller('userController', function($scope, $http) {
		// create a message to display in our view
    $scope.message = 'User Module';

    var getUsers = function(){
      $scope.users = [];
      $http.get("../data/users.json")
            .success(function (response) {
              if(users) {
                
                $scope.users = response.users;
              }
            });
    }

    getUsers();
});
