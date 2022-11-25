const e = require('express');
var express = require('express');
var router = express.Router();
var privateInfo = require('./privateInfo');
let gitFunc = require('./gitScore');
let DB_users = []; //{ID: , PW: , GITHUBID: ,SCORE,INTERESTS}
let DB_profile = [];
let session_login = [];

let Octo = require('octokit');

const octokit = new Octo.Octokit({
  auth: privateInfo.APIKEY
})

function getUserFromDBByUserName(username) {
  let uidx = -1;
  for (let i = 0; i < DB_users.length; i++) {
    if (DB_users[i].ID === username) {
      uidx = i;
      break;
    }
  }
  if (uidx === -1) return null;
  return DB_users[uidx];
}

function getProfileFromDBByUserName(username) {
  let uidx = -1;
  for (let i = 0; i < DB_profile.length; i++) {
    if (DB_profile[i].ID === username) {
      uidx = i;
      break;
    }
  }
  if (uidx === -1) return null;
  return DB_profile[uidx];
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/get', (req, res) => {
  res.status(200).json({
    "test": 123
  })
})

router.post('/user/signup', (req, res) => {
  body = req.body;
  //console.log(body);

  let flag = true;

  DB_users.forEach((e) => {
    if (e.ID === body.ID) {
      flag = false;
      res.status(400).json({
        result: "error: same ID"
      });
    }
    else if (e.GITHUB === body.GITHUB) {
      flag = false;
      res.status(400).json({
        result: "error: same GITHUB"
      });
    }


  })
  if (flag) {
    //회원 정보를 저장하고 
    let userdata = {
      ID: body.ID,
      PW: body.PW,
      GITHUB: body.GITHUB,
      SCORE: 0,
      INTERESTS: Object.values(body.INTERESTS), //리스트로 바꿔서 넣어줘야한다. 그냥 body.INTERESTS는 object임.
      SKILLS: Object.values(body.SKILLS),
      IMG: "none",
      COMMENT: "",
      CONTACT: ""
    };
    let _prof = {
      ID: body.ID,
      PW: body.PW,
      GITHUB: body.GITHUB,
      IMG: "none",
      INTERESTS: Object.values(body.INTERESTS),
      COMMENT: "",
      SCORE: 0,
      SKILLS: Object.values(body.SKILLS),
      CONTACT: ""
    }
    DB_users.push(userdata);
    DB_profile.push(_prof);
    //console.log(DB_users);
    res.status(200).json({
      result: "result: success"
    })
  }
})

router.get('/users/scoreDescOrder', (req, res) => {
  // 유저 정보를 score 기준으로 오름차순 정렬함.

  let ret = DB_users.sort((a, b) => {
    if (a.SCORE < b.SCORE) return 1;
    else if (a.SCORE === b.SCORE) return 0;
    else return -1;
  })
  res.status(200).json(ret);
})
router.get('/users/scoreAscOrder', (req, res) => {
  // 유저 정보를 score 기준으로 오름차순 정렬함.

  let ret = DB_users.sort((a, b) => {
    if (a.SCORE > b.SCORE) return 1;
    else if (a.SCORE === b.SCORE) return 0;
    else return -1;
  })
  res.status(200).json(ret);
})
router.get('/userpage/list', (req, res) => {
  res.status(200).json(DB_profile);
})
router.get('/users/interests/:interest', (req, res) => {
  // 유저 정보를 score 기준으로 오름차순 정렬함.

  let ints = req.params.interest;
  console.log(ints + typeof (ints));
  let ret = DB_users.filter(e => Object.values(e.INTERESTS).includes(ints))
  ret = ret.map(e => e = {
    ID: e.ID,
    GITHUB: e.GITHUB,
    SCORE: e.SCORE,
    INTERESTS: e.INTERESTS,
    SKILLS: e.SKILLS,
    PW: e.PW,
    IMG: e.IMG,
    COMMENT: e.COMMENT,
    CONTACT: e.CONTACT
  })
  ret = ret.sort((a, b) => {
    if (a.SCORE < b.SCORE) return 1;
    else if (a.SCORE === b.SCORE) return 0;
    else return -1;
  })
  //console.log(ret);
  res.status(200).json(ret);
})
router.get('/users/skills/:skill', (req, res) => {


  let ints = req.params.skill;
  console.log(ints + typeof (ints));
  let ret = DB_users.filter(e => Object.values(e.SKILLS).includes(ints))
  ret = ret.map(e => e = { //conceal password
    ID: e.ID,
    GITHUB: e.GITHUB,
    SCORE: e.SCORE,
    INTERESTS: e.INTERESTS,
    SKILLS: e.SKILLS,
    PW: e.PW,
    IMG: e.IMG,
    COMMENT: e.COMMENT,
    CONTACT: e.CONTACT
  })
  ret = ret.sort((a, b) => {
    if (a.SCORE < b.SCORE) return 1;
    else if (a.SCORE === b.SCORE) return 0;
    else return -1;
  })
  //console.log(ret);
  res.status(200).json(ret);
})

// router.post('/userpage/edit/:username', (res, req) => {
//   let uId = req.params.username;
//   let profile = DB_users.filter(e => e.ID === uId)[0];
//   DB_users = DB_users.filter(e => e.ID !== uId);
//   let body = req.body;
//   profile.IMG = body.IMG;
//   profile.INTERESTS = Object.values(body.INTERESTS);
//   profile.COMMENT = body.COMMENT;

//   profile.SKILLS = Object.values(body.SKILLS);

//   DB_users.push(profile);
//   res.status(200).json({
//     profile
//   })

// })
router.post('/userpage/edit/:username', (req, res) => {
  //let uId=body.ID;
  //console.log(body);
  let uId = req.params.username;
  let profile = DB_users.filter(e => e.ID === uId)[0];
  DB_users = DB_users.filter(e => e.ID !== uId);

  let body = req.body;

  profile.IMG = body.IMG;
  profile.INTERESTS = body.INTERESTS;
  profile.COMMENT = body.COMMENT;
  profile.CONTACT = body.CONTACT;

  profile.SKILLS = body.SKILLS;

  DB_users.push(profile);
  res.status(200).json({
    profile
  })
})
router.get('/userpage/:userID', (req, res) => {
  let uID = req.params.userID;
  console.log("userpage: " + uID);
  let ret = DB_users.filter(e => e.ID === uID);

  if (ret.length == 0) {
    res.status(404).json({
      result: "error: No such user."
    })
  }
  else {
    res.status(200).json(ret[0]);
  }
})

router.get('/score/:username', async (req, res) => {
  let username = req.params.username;

  let uidx = -1;
  for (let i = 0; i < DB_users.length; i++) {
    if (DB_users[i].ID === username) {
      uidx = i;
      break;
    }
  }
  if (uidx === -1) {
    res.status(404).json({
      result: "error"
    })
  }
  let gitID = DB_users[uidx].GITHUB;
  console.log(gitID);
  let score = await gitFunc.getScore(gitID);
  DB_users[uidx].SCORE = score;
  for (let i = 0; i < DB_profile.length; i++) {
    if (DB_profile[i].ID === username) {
      uidx = i;
      break;
    }
  }
  DB_profile[uidx].SCORE = score;

  res.status(200).json({
    gitscore: score
  });
})

router.get('/user/signin/:username/:password', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;
  let checkDB = getUserFromDBByUserName(username);
  //if(session_login.includes(username)){
  //res.status(404).json({
  //result:"error:already singedin"
  //})
  //}
  if (checkDB == null) {
    res.status(404).json({
      result: "error:no such user"
    })
  }
  else {
    if (checkDB.PW === password) {
      session_login.push(username);
      res.status(200).json({
        result: "success"
      })
    }
    else {
      res.status(404).json({
        result: "error:password doesn't match"
      })
    }
  }
})
router.get('/user/signout/:username', (req, res) => {
  let username = req.params.username;
  let checkDB = getUserFromDBByUserName(username);
  if (checkDB == null) {
    res.status(404).json({
      result: "error:no such user"
    })
  }
  else {

    session_login = session_login.filter(e => e !== username);
    res.status(200).json({
      result: "success"
    })


  }

})
router.get('/users/signingin', (req, res) => {
  res.status(200).json({
    result: session_login
  })
})
router.get('/user/signingin/:username', (req, res) => {
  let username = req.params.username;
  if (session_login.includes(username) === true) {
    res.status(200).json({
      result: "success"
    })
  }
  else {
    res.status(404).json({
      result: "error:no such user sginined"
    })
  }
})
module.exports = router;


