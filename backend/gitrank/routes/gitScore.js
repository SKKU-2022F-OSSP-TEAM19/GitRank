var privateInfo=require('./privateInfo');
let Octo=require('octokit');

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