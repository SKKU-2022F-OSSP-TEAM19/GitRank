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
            })
    }

}