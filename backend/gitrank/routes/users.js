var express = require('express');

var router = express.Router();

let DB_users=[];
let DB_profile=[];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
 
});
router.post('/user/signup',(req,res)=>{
  console.log(req.body);
  res.send('respond with a resource');
  const obj=req.body;
  console.log(obj.ID)
})
module.exports = router;
