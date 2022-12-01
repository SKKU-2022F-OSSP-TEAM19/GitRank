let user;
let server_users;
let num;
let rank = 0;
let target = 1;

let btn_search = document.getElementById("btn_search");
btn_search.addEventListener("click", function () {
    let data = document.getElementById("data_searched").value;
    let tbody = document.querySelector("#rank_table tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    rank = 0;
    let url = "http://localhost:3000/";
    if (!data) {
        url += "users/scoreDescOrder";
    }
    else {
        if (target === 1) {
            url += "userpage/";
            url += data;
        }
        else if (target === 2) {
            url += "users/interests/";
            url += data;
        }
        else if (target === 3) {
            url += "users/skills/"
            url += data;
        }
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(data => data.json())
        .then(json => {

            server_users = json;
            num = json.length
            console.log(server_users)
            console.log(num);
            localStorage.setItem("users", json);
            if (num) {
                for (let i = 0; i < num; i++) {
                    console.log(json[i]);
                    loadTable(json[i].ID, json[i].INTERESTS, json[i].SKILLS)
                }
            }
            else {
                if (json.ID) {
                    loadTable(json.ID, json.INTERESTS, json.SKILLS)
                }
                else {
                    alert("Please check your words.")
                }
            }
        });

    /*
    let url = "http://localhost:3000/userpage/" + data;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => (res.json()))
        .then(json => {
            console.log(json);
            if (json.result === "error: No such user.") {
                alert("error: No such user.");
                return;
            }
            else {
                let profile = {
                    "ID": json.ID,
                    "PW": json.PW,
                    "GITHUB": json.GITHUB,
                    "INTERESTS": json.INTERESTS,
                    "CONTACT": json.CONTACT,
                    "COMMENT": json.COMMENT,
                    "IMG": json.IMG,
                    "SKILLS": json.SKILLS,
                    "SCORE": json.SCORE
                }
                localStorage.setItem("profile", JSON.stringify(profile));
                let link = "profile.html"
                location.href = link;
            }
        })
        */
})

let search_item = document.getElementById("search_item");
let btn_id = document.getElementById("ID");
let btn_interests = document.getElementById("INTERESTS");
let btn_skills = document.getElementById("SKILLS");

btn_id.addEventListener("click", function () {
    search_item.innerHTML = "ID";
    target = 1;
})

btn_interests.addEventListener("click", function () {
    search_item.innerHTML = "IN";
    target = 2;
})

btn_skills.addEventListener("click", function () {
    search_item.innerHTML = "SK";
    target = 3;
})

function loadTable(ID, INTERESTS, SKILLS) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.scope = "row";
    th.textContent = (++rank).toString();
    tr.appendChild(th);
    let td1 = document.createElement("td");
    let btn = document.createElement("button");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    //td1.textContent = ID;
    btn.className += "btn"
    btn.textContent = ID;
    btn.id = ID;
    btn.addEventListener("click", () => {

        let url = "http://localhost:3000/userpage/" + ID;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => (res.json()))
            .then(json => {
                console.log(json);
                if (json.result === "error: No such user.") {
                    alert("error: No such user.");
                    return;
                }
                else {
                    let profile = {
                        "ID": json.ID,
                        "PW": json.PW,
                        "GITHUB": json.GITHUB,
                        "INTERESTS": json.INTERESTS,
                        "CONTACT": json.CONTACT,
                        "COMMENT": json.COMMENT,
                        "IMG": json.IMG,
                        "SKILLS": json.SKILLS,
                        "SCORE": json.SCORE
                    }
                    localStorage.setItem("profile", JSON.stringify(profile));
                    let link = "profile.html"
                    location.href = link;
                }
            })
    })

    td1.appendChild(btn);
    tr.appendChild(td1);
    let itr = "";
    for (let i = 0; i < INTERESTS.length; i++) {
        itr += INTERESTS[i]
        itr += ", ";
    }
    //td2.textContent = INTERESTS
    td2.textContent = itr;

    tr.appendChild(td2);
    td3.textContent = SKILLS

    tr.appendChild(td3);

    let tbody = document.querySelector("#rank_table tbody");
    tbody.appendChild(tr);
}
window.onload = function () {
    let tbody = document.querySelector("#rank_table tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));

    }
    else {
        alert("Connection has been terminated.");
        let link = 'signin.html';
        location.href = link;
    }
    fetch("http://localhost:3000/users/scoreDescOrder", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(data => data.json())
        .then(json => {

            server_users = json;
            num = json.length
            console.log(server_users)
            console.log(num);
            localStorage.setItem("users", json);
            for (let i = 0; i < num; i++) {
                console.log(json[i]);
                loadTable(json[i].ID, json[i].INTERESTS, json[i].SKILLS)
            }
        });

}