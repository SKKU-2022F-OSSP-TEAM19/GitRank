var express = require('express');
var router = express.Router();


let DB_users=[]; //{ID: , PW: , GITHUBID: }
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
  console.log(body);
 
  let flag=true;

  DB_users.forEach((e)=>{
    if(e.ID===body.ID){
      flag=false;
      res.status(400).json({
        result:"error:same ID"
      });
    }
    else if(e.GITHUB===body.GITHUB){
      flag=false;
        res.status(400).json({
          result:"error:same GITHUB"
        }); 
    }

    
  })
  if(flag){
    DB_users.push(body);
    console.log(DB_users);
    res.status(200).json({
      result:"result:complete"
    })
  }
})
module.exports = router;
