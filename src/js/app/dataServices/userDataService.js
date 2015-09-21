var UserDataService = function(){
  function getUsers(pageIndex, searchString) {
    var users = [];

    $.getJSON("../data/users.json", function(data){
        if(data && data.users){
          $.each(data.users, function(index){});
        }
    });
  }
}
