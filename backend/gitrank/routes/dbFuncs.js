let fs=require('fs')

function loadUsers(){
    let dataBuffer=fs.readFileSync("DB/DB_users.json");
    let data=JSON.parse(dataBuffer.toString());
    if(Object.keys(data).length===0)return [];
    return data;
  }

  function loadProfiles(){
    let dataBuffer=fs.readFileSync("DB/DB_profile.json");
    let data=JSON.parse(dataBuffer.toString());
    if(Object.keys(data).length===0)return [];

    return data;
  }

function saveDatas(user,profile,DB_users,DB_profile){
  if(user){
    let dataUser=JSON.stringify(DB_users);
    fs.writeFileSync("DB/DB_users.json",dataUser);
  }
  if(profile){
    let dataProfile=JSON.stringify(DB_profile);
  
    fs.writeFileSync("DB/DB_profile.json",dataProfile);
  }
}

module.exports.loadProfiles=loadProfiles;
module.exports.loadUsers=loadUsers;
module.exports.saveDatas=saveDatas;