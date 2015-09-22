var UserDataService = function(){

    function getUsers(params, doneFn) {
        var defaultParams = {
            pageIndex: 0,
            searchString: null
        };
        _.extend(defaultParams, params);

        $.getJSON("../data/users.json", function(data){
            if(!data || !data.users) {
              data = {};
              data.users = [];
            }
            if(doneFn) {
                doneFn(data.users);
            }
        });
      }

    function getUserById(userId, doneFn) {
      $.getJSON("../data/users.json", function(data){
          var user = null;
          if(data && data.users) {
              user = _.findWhere(data.users, {userId: userId});
          }
          if(doneFn) {
              doneFn(user);
          }
      });
    }

    function updateUser(user, doneFn) {
        $.getJSON("../data/users.json", function(data){
          var existUser = null;
            if(data && data.users){
                existUser = _.findWhere(data.users, {userId: user.userId});
            }
            if(existUser) {
                var idx = _.indexOf(data.users, existUser);
                _.extend(data.users[idx], user);
            }
            if(doneFn) {
                doneFn(data);
            }
        });
    }

    function createUser(user, doneFn) {
        $.getJSON("../data/users.json", function(data){
            if(data && data.users){
                var existUser = _.findWhere(data.users, {userName: user.userName});
            }
            if(existUser) {
                alert(existUser.userName + " already exist!");
            } else {
                data.users.push(user);
            }
            if(doneFn) {
                doneFn(data);
            }
        })
    }

    function deleteUser(userId) {
      $.getJSON("../data/users.json", function(data){
        var existUser = null;
          if(data && data.users){
              existUser = _.findWhere(data.users, {userId: user.userId});
          }
          if(existUser) {
              var idx = _.indexOf(data.users, existUser);
              data.users = _.without(data.users, existUser);
          }
          if(doneFn) {
              doneFn(data);
          }
      });
    }

    return {
        getUsers: getUsers,
        getUserById: getUserById,
        updateUser: updateUser,
        createUser: createUser,
        deleteUser: deleteUser
    }
}
