/**
 * Created by NNNGUYEN on 9/21/2015.
 */
posiba.controller('userController', function($scope) {
		// create a message to display in our view
    $scope.message = 'User Module';
    $scope.users = new Array();

    $scope.getUsers = function(){

        var params = {
            users: new Array(),
            pageIndex: 0,
            searchString: null
        };

        var usrService = new UserDataService();
        $.when(usrService.getUsers(params))
            .done(function(){
                $scope.users = params.users;
            })
    };

    $scope.editUser = function(userId){
        if(userId) {
            var usrService = new UserDataService();
            var user = new User();

            $.when(usrService.getUserById(user, userId))
                .done(function(){
                    $scope.selectedUser = user;
                });
        }
    }

    $scope.getUsers();
});
