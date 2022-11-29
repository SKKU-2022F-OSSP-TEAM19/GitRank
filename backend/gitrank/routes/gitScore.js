var privateInfo=require('./privateInfo');
let Octo=require('octokit');
const https=require('https');
const parser=require('node-html-parser');
const { resolve } = require('path');
const { rejects } = require('assert');
const baseUrl="https://ghchart.rshah.org/"

const dataRegex= new RegExp(`[0-9]+-[0-9]+-[0-9]+`)
const scoreRegex= new RegExp(`[0-9]+`)
let getScoreHTTP=async (githubId)=>{
    let retScore=0;
    console.log(githubId);
    retScore=await ff(githubId);
    console.log(retScore);
    return retScore;
    //console.log("new Score of "+githubID+": "+retScore);
    return 0;
}
let ff= async (githubID)=> {


    let promise = new Promise((resolve,reject)=>{
        let data="";
        https.get(baseUrl+githubID,(res)=>{
            res.on("data",(d)=>{
                data+=d;
        });
            res.on("end",()=>{
                //console.log(data)
                resolve(data);
            })
        });

        
    })
    let data=await promise;
    let root=parser.parse( promise);
     let to=root.querySelector("svg");
    console.log(to)
    let now=new Date()
    let ret =500;
    // to.childNodes.forEach((e)=>{
    //     let arr = e.rawAttrs.split(" ");
    //     if(arr.length===7){
    //         //console.log(arr[1].match(scoreRegex)[0]);
            
    //         let date=arr[2].match(dataRegex)[0].split("-");
    //         let year=Number.parseInt(date[0])
    //         let month=Number.parseInt(date[1])
    //         //console.log(arr[2].match(dataRegex)[0]);
    //         let score=Number.parseInt(arr[1].match(scoreRegex)[0])
    //         score=score*(now.getFullYear()===year?12-now.getMonth()+month:1)
    //         //console.log(score);
            
    //         ret+=score
    //         //console.log(retScore)
    //         //console.log(year+"-"+month+": "+score);
    //     }
    // })
    return ret;
    // https.get(baseUrl+githubID,(res)=>{
    // let ret=0;
    // let data="";
    // res.on("data",(d)=>{
    //     data+=d;
    // });
    // res.on("end",()=>{
        

    //     let root=parser.parse(data);

 
    //     let to=root.querySelector("svg");

    //     let now=new Date()
       
    //     to.childNodes.forEach((e)=>{
    //         let arr = e.rawAttrs.split(" ");
    //         if(arr.length===7){
    //             //console.log(arr[1].match(scoreRegex)[0]);
                
    //             let date=arr[2].match(dataRegex)[0].split("-");
    //             let year=Number.parseInt(date[0])
    //             let month=Number.parseInt(date[1])
    //             //console.log(arr[2].match(dataRegex)[0]);
    //             let score=Number.parseInt(arr[1].match(scoreRegex)[0])
    //             score=score*(now.getFullYear()===year?12-now.getMonth()+month:1)
    //             //console.log(score);
                
    //             ret+=score
    //             //console.log(retScore)
    //             //console.log(year+"-"+month+": "+score);
    //         }
    //     })
        

    // })
    // return ret;
}
const octokit = new Octo.Octokit({
    auth: privateInfo.APIKEY
  })

let getScoreByRepo = async(owner,repo,bias,div)=>{
    let res = await octokit.request(`GET /repos/${owner}/${repo}/stats/commit_activity`, {
        owner: owner,
        repo: repo
    })
    if(res.data==null){
        return 0;
    }
    //console.log(ret);
    let cnt=0;
    let score=0;

    Object.values(res.data).forEach(
        e=>score=score+e.total*(bias+parseInt(++cnt/div))
    );
    //console.log("score: "+score);

    return score;
}

let getScore=async (username)=>{
    let res=await octokit.request(`GET /users/${username}/repos{?type,sort,direction,per_page,page}`, {
        username: username
      })
    let score=0;
    let cnt=0;
    // Object.values(res.data).forEach(e=>
        
    //     score=score+getScoreByRepo(username,e.name,5,13)
    //     //console.log(e.name);
    // )

    //5개의 레포로 리미트.
    //console.log("github data",res.data);
    for(let i=0;i<10&&i<Object.values(res.data).length;i++){
        let e=Object.values(res.data)[i];
        console.log("Data::")
        console.log(res.data[i]['name']);
        //score=score+getScoreByRepo(username,e.name,5,13);
        let tmpScore=await getScoreByRepo(username,e.name,5,13);
        score=score+tmpScore;
    }
    
    console.log(score);
    return score;
}

module.exports.getScore=getScore;
module.exports.getScoreHTTP=getScoreHTTP;