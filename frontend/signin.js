let user_id;
let user_pw;
// signin.html
// =========================================================================
let login = document.getElementById("btn_login");
login.addEventListener("click", () => {
    let input_id = document.getElementById("user_id");
    user_id = input_id.value;
    if (!user_id.length) {
        alert("Please Write your ID");
        return;
    }

    let input_pw = document.getElementById("user_pw");
    user_pw = input_pw.value;
    if (!user_pw.length) {
        alert("Please Write your PW");
        return;
    }

    // Test
    let user = {
        "ID": user_id,
        "PW": user_pw,
        "GITHUB": "",
        "INTERESTS": [],
        "SKILLS": [],
        "CONTACT": "",
        "IMG": "",
        "COMMENT": "",
        "SCORE": 0

    }
    /*if (localStorage.getItem("signup")) {
        user = JSON.parse(localStorage.getItem("signup"));
        if (user_id !== user.ID) {
            alert("Invalid ID")
            return;
        }
        if (user_pw !== user.PW) {
            alert("Invalid PW");
            return;
        }
    }*/
    let url = "http://localhost:3000/user/signin/" + user_id + "/" + user_pw;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(data => data.json())
        .then(json => {
            console.log(json.result)
        });
    // Move
    localStorage.setItem("signin", JSON.stringify(user));
    let link = 'rank.html';
    //location.href = link;
})

window.onload = function () {
    localStorage.removeItem("signin");
    if (localStorage.getItem("signup")) {
        console.log(localStorage.getItem("signup"));
    }
    fetch("http://localhost:3000/users/scoreDescOrder", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(data => data.json())
        .then(json => {
            console.log(json)
        });
}
// =========================================================================
