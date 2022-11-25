let user;
let server_users;
let num;
let rank = 0;

let btn_search = document.getElementById("btn_search");
btn_search.addEventListener("click", function () {
    let data = document.getElementById("data_searched").value;
    if (!data) {
        return;
    }
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
})

function loadTable(ID, INTERESTS, SKILLS) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.scope = "row";
    th.textContent = (++rank).toString();
    tr.appendChild(th);
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    td1.textContent = ID;
    tr.appendChild(td1);

    td2.textContent = INTERESTS
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

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row";
        th.textContent = (++rank).toString();
        tr.appendChild(th);
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.textContent = user.ID;
        tr.appendChild(td1);
        
        td2.textContent = user.INTERESTS
        tr.appendChild(td2);
        td3.textContent = user.SKILLS

        tr.appendChild(td3);

        let tbody = document.querySelector("#rank_table tbody");
        tbody.appendChild(tr);
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