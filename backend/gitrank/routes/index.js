const { response } = require('express');
const e = require('express');
var express = require('express');
var router = express.Router();
const https = require('https');
const parser = require('node-html-parser');
//var privateInfo=require('./privateInfo');

let dbFuncs = require('./dbFuncs');
let gitFunc = require('./gitScore');
let DB_users = []; //{ID: , PW: , GITHUBID: ,SCORE,INTERESTS}
let DB_profile = [];
let session_login = [];

const dataRegex = new RegExp(`[0-9]+-[0-9]+-[0-9]+`)
const scoreRegex = new RegExp(`[0-9]+`)

// let Octo=require('octokit');

// const octokit = new Octo.Octokit({
//     auth: privateInfo.APIKEY
//   })


DB_users = dbFuncs.loadUsers();
DB_profile = dbFuncs.loadProfiles();


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
      //GITHUB: body.GITHUB
      //,
      //SCORE: 0,
      //INTERESTS:body.INTERESTS, //리스트로 바꿔서 넣어줘야한다. 그냥 body.INTERESTS는 object임.
      //SKILLS:body.SKILLS
    };
    let _prof = {
      ID: body.ID, //FK
      GITHUB: body.GITHUB,
      IMG: "none",
      INTERESTS: body.INTERESTS,
      COMMENT: "",
      SCORE: 0,
      SKILLS: body.SKILLS,
      CONTACT: body.CONTACT
    }
    DB_users.push(userdata);
    DB_profile.push(_prof);
    //console.log(DB_users);
    dbFuncs.saveDatas(true, true, DB_users, DB_profile);
    res.status(200).json({
      result: "result: success"
    })
  }
})

router.get('/users/scoreDescOrder', (req, res) => {
  // 유저 정보를 score 기준으로 내림차순 정렬함.

  let ret = DB_profile.sort((a, b) => {
    if (a.SCORE < b.SCORE) return 1;
    else if (a.SCORE === b.SCORE) return 0;
    else return -1;
  })
  res.status(200).json(ret);
})
router.get('/users/scoreAscOrder', (req, res) => {
  // 유저 정보를 score 기준으로 내림차순 정렬함.

  let ret = DB_profile.sort((a, b) => {
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
  // 유저 정보를 score 기준으로 내림차순 정렬함.

  let ints = req.params.interest;
  console.log(ints + typeof (ints));
  let ret = DB_profile.filter(e => Object.values(e.INTERESTS).includes(ints))
  ret = ret.map(e => e = {
    ID: e.ID,
    GITHUB: e.GITHUB,
    SCORE: e.SCORE,
    INTERESTS: e.INTERESTS,
    SKILLS: e.SKILLS,
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
  let ret = DB_profile.filter(e => Object.values(e.SKILLS).includes(ints))
  ret = ret.map(e => e = { //conceal password
    ID: e.ID,
    GITHUB: e.GITHUB,
    SCORE: e.SCORE,
    INTERESTS: e.INTERESTS,
    SKILLS: e.SKILLS,
  })
  ret = ret.sort((a, b) => {
    if (a.SCORE < b.SCORE) return 1;
    else if (a.SCORE === b.SCORE) return 0;
    else return -1;
  })
  //console.log(ret);
  res.status(200).json(ret);
})

router.post('/userpage/edit/:username', (req, res) => {
  //let uId=body.ID;
  //console.log(body);
  let uId = req.params.username;
  let profile = DB_profile.filter(e => e.ID === uId)[0];
  DB_profile = DB_profile.filter(e => e.ID !== uId);
  //let userInfo=DB_users.filter(e=>e.ID===uId);
  //DB_users=DB_users.filter(e=>e.ID!==uId);
  let body = req.body;

  profile.IMG = body.IMG;
  profile.INTERESTS = body.INTERESTS;
  profile.COMMENT = body.COMMENT;

  profile.SKILLS = body.SKILLS;
  profile.CONTACT = body.CONTACT;

  //유저 정보 수정.
  /* ID: body.ID, 
      PW: body.PW,
       GITHUB: body.GITHUB,
       SCORE: 0,
       INTERESTS:Object.values(body.INTERESTS), //리스트로 바꿔서 넣어줘야한다. 그냥 body.INTERESTS는 object임.
      SKILLS:Object.values(body.SKILLS) 
  */
  //userInfo.INTERESTS=body.INTERESTS;
  //userInfo.SKILLS=body.SKILLS;
  DB_profile.push(profile);
  //DB_users.push(userInfo);
  dbFuncs.saveDatas(false, true, DB_users, DB_profile);
  res.status(200).json({
    profile
  })

})
router.get('/userpage/:userID', (req, res) => {
  let uID = req.params.userID;
  console.log("userpage: " + uID);
  let ret = DB_profile.filter(e => e.ID === uID);

  if (ret.length == 0) {
    res.status(404).json({
      result: "error: No such user."
    })
  }
  else {
    res.status(200).json(ret[0]);
  }
})

router.get('/scoreGitAPI/:username', async (req, res) => {
  let username = req.params.username;

  let userPageInfo = DB_profile.filter(e => e.ID === username);
  if (userPageInfo.length === 0) {
    res.status(404).json({
      result: "error:no such user"
    })
  }
  else {
    let score = await gitFunc.getScore(userPageInfo[0].GITHUB);
    userPageInfo[0].SCORE = score;
    DB_profile = DB_profile.filter(e => e.ID !== username);
    DB_profile.push(userPageInfo[0]);
    dbFuncs.saveDatas(false, true, DB_users, DB_profile);
    res.status(200).json({
      gitscore: score
    });
  }


})
router.get('/score/:username', async (req, res) => {
  let username = req.params.username;

  let userPageInfo = DB_profile.filter(e => e.ID === username);
  if (userPageInfo.length === 0) {
    res.status(404).json({
      result: "error:no such user"
    })
  }
  else {
    //--------------------------

    https.get("https://ghchart.rshah.org/" + userPageInfo[0].GITHUB, (rrres) => {
      let data = "";
      rrres.on("data", (d) => {
        data += d;
      });
      rrres.on("end", () => {

        let retScore = 500; //base score
        let now = new Date()

        let root = parser.parse(data);
        //root=root.querySelector("svg");
        console.log(data)
        //   root.childNodes.forEach((e)=>{
        //     let arr = e.rawAttrs.split(" ");
        //     if(arr.length===7){


        //         let date=arr[2].match(dataRegex)[0].split("-");
        //         let year=Number.parseInt(date[0])
        //         let month=Number.parseInt(date[1])

        //         let score=Number.parseInt(arr[1].match(scoreRegex)[0])
        //         score=score*(now.getFullYear()===year?12-now.getMonth()+month:1)


        //         retScore+=score

        //     }
        // })
        userPageInfo[0].SCORE = retScore;
        DB_profile = DB_profile.filter(e => e.ID !== username);
        DB_profile.push(userPageInfo[0]);
        dbFuncs.saveDatas(false, true, DB_users, DB_profile);
        res.status(200).json({
          gitscore: retScore
        });

      })
    });


    //---------------------------
    // let score= await gitFunc.getScoreHTTP(userPageInfo[0].GITHUB);
    // userPageInfo[0].SCORE=score;
    // DB_profile=DB_profile.filter(e=>e.ID!==username);
    // DB_profile.push(userPageInfo[0]);
    // dbFuncs.saveDatas(false,true,DB_users,DB_profile);
    // res.status(200).json({
    //   gitscore:score
    // });
  }


})


router.get('/user/signin/:username/:password', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;
  let checkDB = getUserFromDBByUserName(username);
  if (session_login.includes(username)) {
    res.status(404).json({
      result: "error:already singedin"
    })
  }
  else if (checkDB == null) {
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

router.get('/user/contribution/score/:username', (req, res) => {

  let username = req.params.username;

  let userPageInfo = DB_profile.filter(e => e.ID === username);
  if (userPageInfo.length === 0) {
    res.status(404).json({
      result: "error:no such user"
    })
  }

  https.get('https://github.com/' + userPageInfo[0].GITHUB, rres => {
    let data = ""
    rres.on("data", d => {
      data += d;
    })
    rres.on('end', () => {
      let root = parser.parse(data);
      root = root.querySelector(".js-calendar-graph-svg");
      //console.log(root)
      //root=root.toString()
      let retScore = 500;
      root = root.querySelectorAll(".ContributionCalendar-day");
      let date = 0;
      root.forEach((e) => {
        let values = Object.values(e._attrs);
        let count = Number(values[7]);
        //console.log(count)
        retScore = retScore + (count * (parseInt(++date / 37)))

        //          Object.keys

      })
      //   root.childNodes.forEach((e)=>{
      //     let arr = e.rawAttrs.split(" ");
      //     if(arr.length===7){


      //         let date=arr[2].match(dataRegex)[0].split("-");
      //         let year=Number.parseInt(date[0])
      //         let month=Number.parseInt(date[1])

      //         let score=Number.parseInt(arr[1].match(scoreRegex)[0])
      //         score=score*(now.getFullYear()===year?12-now.getMonth()+month:1)


      //         retScore+=score

      //     }
      // })

      //console.log(retScore);
      //console.log(root.querySelector(".js-calendar-graph-svg"))


      userPageInfo[0].SCORE = retScore;
      DB_profile = DB_profile.filter(e => e.ID !== username);
      DB_profile.push(userPageInfo[0]);
      dbFuncs.saveDatas(false, true, DB_users, DB_profile);
      res.status(200).json({
        gitscore: retScore
      });
    })
  })

})
module.exports = router;