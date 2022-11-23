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
    // Move
    let user = {
        "user_id": user_id,
        "user_pw": user_pw,
        "user_git": "",
        "interests": [],
        "skills": [],
        "contact": "",
        "img": "",
        "comment": "",

    }
    localStorage.setItem("signin", JSON.stringify(user));
    let link = 'rank.html';
    location.href = link;
})
// =========================================================================
