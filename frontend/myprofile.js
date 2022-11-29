let user;
let profile;
window.onload = function () {
    let span_id = document.getElementById("user_id");
    let span_git = document.getElementById("user_github");
    let span_itr = document.getElementById("user_interests");
    let span_con = document.getElementById("user_contact");
    let span_com = document.getElementById("user_comment");
    let span_skills = document.getElementById("user_skills");
    let span_contribution = document.getElementById("contribution");
    let img = document.getElementById("my_img");
    let span_rank = document.getElementById("user_rank");

    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);

        let url = "http://localhost:3000/userpage/" + user.ID;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                //alert("Hi");
                console.log(json);
                span_id.innerHTML = json.ID;
                span_git.innerHTML = json.GITHUB;
                span_itr.innerHTML = json.INTERESTS;
                span_skills.innerHTML = json.SKILLS;
                if (json.CONTACT) {
                    span_con.innerHTML = json.CONTACT;
                    span_con.href = "mailto:" + json.CONTACT;
                }
                if (json.COMMENT) {
                    span_com.innerHTML = json.COMMENT;
                }
                span_contribution.innerHTML = json.SKILLS;
                span_contribution.src = "https://ghchart.rshah.org/" + json.GITHUB;
                if (json.IMG !== "none") {
                    img.src = json.IMG;
                }
                span_rank.innerHTML = json.SCORE;
            })
    }

}

let refresh = document.getElementById("refresh");
refresh.addEventListener("click", () => {
    fetch("http://localhost:3000/score/" + user.ID, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => (res.json()))
        .then(json => {
            if (json.gitscore) {
                console.log(json.gitsocre);
            }
        })

    let url = "http://localhost:3000/userpage/" + user.ID;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(json => {
            //alert("Hi");
            let span_rank = document.getElementById("user_rank");
            span_rank.innerHTML = 1000;
        })

})