var User = function(){
  var self = this;

  self.userId = null;
  self.userName = null;
  self.gender = 1;
  self.email = null;
  self.website = null;
  self.skills = [];

  return self;
};

User.prototype = function(){

  function getGender(){
    var self = this;
    return self.gender === 1 ? "Male" : "Female";
  }

  function displaySkills(){
    var self = this;
    if(self.skills.length > 0) {
      return self.skills.join(",");
    }

    return "";
  }

  return {
    getGender: getGender,
    displaySkills: displaySkills
  };
}();
