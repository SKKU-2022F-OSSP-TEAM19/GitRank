let fs=require('fs')

function loadDatas(){
    let dataBuffer=fs.readFileSync("DB_users.json");
    let data=JSON.parse(dataBuffer.toString());
    DB_users=data;
  
    dataBuffer=fs.readFileSync("DB_profile.json");
    data=JSON.parse(dataBuffer.toString());
    DB_profile=data;
  
  }

function saveDatas(user,profile){
  if(user){
    let dataUser=JSON.stringify(DB_users);
    fs.writeFileSync("../DB_users.json",dataUser);
  }
  if(profile){
    let dataProfile=JSON.stringify(DB_profile);
  
    fs.writeFileSync("../DB_profile.json",dataProfile);
  }
}

module.exports.loadDatas=loadDatas;
module.exports.saveDatas=saveDatas;