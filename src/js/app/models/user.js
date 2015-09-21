var User = function(){
  var self = this;

  self.userId = null;
  self.userName = null;
  self.gender = 1;
  self.email = null;
  self.skills = [];

  return self;
};

User.prototype = function(){

  function getGender(){
    var self = this;
    return self.gender === 1 ? "Male" : "Female";
  }

  return {
    getGender: getGender
  };
}();
