var UserDataService = function(){

    function getUsers(params) {
        var defaultParams = {
            users: new Array(),
            pageIndex: 0,
            searchString: null
        };
        _.extend(defaultParams, params);

        return $.Deferred(function(def){
            $.when(
                $.getJSON("../data/users.json", function(data){
                    if(data && data.users){
                        $.each(data.users, function(index, usr){
                            var usrModel = new User();
                            usrModel.userId = usr.userId;
                            usrModel.userName = usr.userName;
                            usrModel.gender = usr.gender;
                            usrModel.email = usr.email;
                            usrModel.skills = usr.skills;

                            defaultParams.users.push(usrModel);
                        });
                        //users(arr);
                        _.extend(params, defaultParams);
                    }
                })
            )
                .done(function(){
                    def.resolve();
                })
                .fail(function(){
                    def.reject();
                });
        }).promise();
    }

    function getUserById(user, userId) {
        return $.Deferred(function(def){
            $.when(
                $.getJSON("../data/users.json", function(data){
                    if(data && data.users){
                        user = _.findWhere(data.users, {userId: userId});
                    }
                })
            )
                .done(function(){
                    def.resolve();
                })
                .fail(function(){
                    def.reject();
                });
        }).promise();

    }

    function updateUser(user) {
        return $.Deferred(function(def){
            $.when(
                $.getJSON("../data/users.json", function(data){
                    if(data && data.users){
                        var existUser = _.findWhere(data.users, {userId: user.userId});
                    }
                    if(existUser) {
                        var idx = _.indexOf(data.users, existUser);
                        _.extend(data.users[idx], user);
                    }
                })
            )
                .done(function(){
                    def.resolve();
                })
                .fail(function(){
                    def.reject();
                });
        }).promise();
    }

    function createUser(user) {
        return $.Deferred(function(def){
            $.when(
                $.getJSON("../data/users.json", function(data){
                    if(data && data.users){
                        var existUser = _.findWhere(data.users, {userName: user.userName});
                    }
                    if(existUser) {
                        alert(existUser.userName + " already exist!");
                    } else {
                        data.users.push(user);
                    }
                })
            )
                .done(function(){
                    def.resolve();
                })
                .fail(function(){
                    def.reject();
                });
        }).promise();
    }

    function deleteUser(userId) {
        return $.Deferred(function(def){
            $.when(
                $.getJSON("../data/users.json", function(data){
                    if(data && data.users){
                        var existUser = _.findWhere(data.users, {userId: userId});
                    }
                    if(!existUser) {
                        alert(existUser.userName + " doesn't exist!");
                        return null;
                    } else {
                        data.users = _.without(data.users, existUser);
                        return existUser;
                    }
                })
            )
                .done(function(){
                    def.resolve();
                })
                .fail(function(){
                    def.reject();
                });
        }).promise();
    }

    return {
        getUsers: getUsers,
        getUserById: getUserById,
        updateUser: updateUser,
        createUser: createUser,
        deleteUser: deleteUser
    }
}
