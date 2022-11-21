var express = require('express');
var router = express.Router();


let DB_users=[]; //{ID: , PW: , GITHUBID: ,SCORE,INTERESTS}
let DB_profile=[];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/get',(req,res)=>{
  res.status(200).json({
    "test":123
  })
})

router.post('/user/signup',(req,res)=>{
  body=req.body;
  //console.log(body);
 
  let flag=true;

  DB_users.forEach((e)=>{
    if(e.ID===body.ID){
      flag=false;
      res.status(400).json({
        result:"error: same ID"
      });
    }
    else if(e.GITHUB===body.GITHUB){
      flag=false;
        res.status(400).json({
          result:"error: same GITHUB"
        }); 
    }

    
  })
  if(flag){
    //회원 정보를 저장하고 
    let userdata={
      ID: body.ID, 
      PW: body.PW,
       GITHUB: body.GITHUB,
       SCORE: 0,
       INTERESTS:Object.values(body.INTERESTS), //리스트로 바꿔서 넣어줘야한다. 그냥 body.INTERESTS는 object임.
      SKILLS:Object.values(body.SKILLS)
    };
    let _prof={
      ID:body.ID,
      GITHUB:body.GITHUB,
      IMG:"none",
      INTERESTS:Object.values(body.INTERESTS),
      COMMENT:"",
      SCORE:0,
      SKILLS:Object.values(body.SKILLS)
    }
    DB_users.push(userdata);
    DB_profile.push(_prof);
    //console.log(DB_users);
    res.status(200).json({
      result:"result: success"
    })
  }
})

router.get('/users/scoreDescOrder',(req,res)=>{
  // 유저 정보를 score 기준으로 오름차순 정렬함.
  
  let ret=DB_users.sort((a,b)=>{    
    if(a.SCORE<b.SCORE)return 1;
    else if(a.SCORE===b.SCORE)return 0;
    else return -1;
  })
  res.status(200).json(ret);
})
router.get('/users/scoreAscOrder',(req,res)=>{
  // 유저 정보를 score 기준으로 오름차순 정렬함.
  
  let ret=DB_users.sort((a,b)=>{    
    if(a.SCORE>b.SCORE)return 1;
    else if(a.SCORE===b.SCORE)return 0;
    else return -1;
  })
  res.status(200).json(ret);
})
router.get('/users/interests/:interest',(req,res)=>{
  // 유저 정보를 score 기준으로 오름차순 정렬함.
  
  let ints=req.params.interest;
  console.log(ints+typeof(ints));
  let ret=DB_users.filter(e=>Object.values(e.INTERESTS).includes(ints))
  ret=ret.map(e=>e={
    ID: e.ID,
    GITHUB: e.GITHUB,
    SCORE: e.SCORE,
    INTERESTS: e.INTERESTS,
    SKILLS: e.SKILLS,
  })
  ret=ret.sort((a,b)=>{    
    if(a.SCORE<b.SCORE)return 1;
    else if(a.SCORE===b.SCORE)return 0;
    else return -1;
  })
  //console.log(ret);
  res.status(200).json(ret);
})
router.get('/users/skills/:skill',(req,res)=>{
  
  
  let ints=req.params.skill;
  console.log(ints+typeof(ints));
  let ret=DB_users.filter(e=>Object.values(e.SKILLS).includes(ints))
  ret=ret.map(e=>e={ //conceal password
    ID: e.ID,
    GITHUB: e.GITHUB,
    SCORE: e.SCORE,
    INTERESTS: e.INTERESTS,
    SKILLS: e.SKILLS,
  })
  ret=ret.sort((a,b)=>{    
    if(a.SCORE<b.SCORE)return 1;
    else if(a.SCORE===b.SCORE)return 0;
    else return -1;
  })
  //console.log(ret);
  res.status(200).json(ret);
})

router.post('/userpage/edit/:uid',(res,req)=>{
  
})
router.get('/userpage/:userID',(req,res)=>{
  let uID=req.params.userID;
  console.log("userpage: "+uID);
  let ret=DB_profile.filter(e=>e.ID===uID);

  if(ret.length==0){
    res.status(404).json({
      result:"error: No such user."
    })
  }
  else{
    res.status(200).json(ret[0]);
  }
})
module.exports = router;
