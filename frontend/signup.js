let user_id;
let user_pw;
let user_git;
let itr = [];
let skills = [];

// Signup.html
// =========================================================================
let signup = document.getElementById("btn_signup");
signup.addEventListener("click", () => {
    // 1. Read the text signup_id
    let input_id = document.getElementById("signup_id");
    user_id = input_id.value;

    if (!user_id.length) {
        alert("Write your ID");
        return;
    }

    // 2. Read the text signup_pw
    let input_pw = document.getElementById("signup_pw");
    user_pw = input_pw.value;

    if (!user_pw.length) {
        alert("Write your PW");
        return;
    }

    // 3. Read the text signup_github
    let input_git = document.getElementById("signup_github");
    user_git = input_git.value;

    if (!user_git.length) {
        alert("Write your Gitbut ID");
        return;
    }

    // 4. Read Intersts
    itr = [];

    let front = document.getElementById("itr_frontend");
    if (front.checked) {
        itr.push("Frontend");
    }
    let back = document.getElementById("itr_backend");
    if (back.checked) {
        itr.push("Backend");
    }
    let ai = document.getElementById("itr_ai");
    if (ai.checked) {
        itr.push("AI");
    }
    let db = document.getElementById("itr_database");
    if (db.checked) {
        itr.push("Database");
    }
    let npl = document.getElementById("itr_npl");
    if (npl.checked) {
        itr.push("NPL");
    }
    let ml = document.getElementById("itr_machine");
    if (ml.checked) {
        itr.push("Machine Learning");
    }
    let nn = document.getElementById("itr_neural");
    if (nn.checked) {
        itr.push("Neural Network");
    }
    let al = document.getElementById("itr_algorithm");
    if (al.checked) {
        itr.push("Algorithm");
    }
    let mining = document.getElementById("itr_mining");
    if (mining.checked) {
        itr.push("Data Mining");
    }
    let sec = document.getElementById("itr_security");
    if (sec.checked) {
        itr.push("Security");
    }
    let em = document.getElementById("itr_embeded");
    if (em.checked) {
        itr.push("Embeded System");
    }
    let mob = document.getElementById("itr_mobile");
    if (mob.checked) {
        itr.push("Mobile Application");
    }
    let web = document.getElementById("itr_web");
    if (web.checked) {
        itr.push("Web Programming");
    }
    let vr = document.getElementById("itr_vr");
    if (vr.checked) {
        itr.push("VR");
    }
    let ar = document.getElementById("itr_ar");
    if (ar.checked) {
        itr.push("AR");
    }
    let net = document.getElementById("itr_network");
    if (net.checked) {
        itr.push("Network");
    }
    let rev = document.getElementById("itr_reverse");
    if (rev.checked) {
        itr.push("Reverse Engineering");
    }

    if (itr.length < 1) {
        alert("Please Check interests");
        return;
    }

    // 5. Read skills
    skills = [];
    let py = document.getElementById("skill_python");
    if (py.checked) {
        skills.push("Python");
    }
    let java = document.getElementById("skill_java");
    if (java.checked) {
        skills.push("Java");
    }
    let js = document.getElementById("skill_js");
    if (js.checked) {
        skills.push("JavaScript");
    }
    let cpp = document.getElementById("skill_cpp");
    if (cpp.checked) {
        skills.push("C++");
    }
    let php = document.getElementById("skill_php");
    if (php.checked) {
        skills.push("PHP");
    }
    let ts = document.getElementById("skill_ts");
    if (ts.checked) {
        skills.push("TypeScript");
    }
    let c = document.getElementById("skill_c");
    if (c.checked) {
        skills.push("C");
    }
    let go = document.getElementById("skill_go");
    if (go.checked) {
        skills.push("Go");
    }
    let shell = document.getElementById("skill_shell");
    if (shell.checked) {
        skills.push("Shell");
    }
    let ruby = document.getElementById("skill_ruby");
    if (ruby.checked) {
        skills.push("Ruby");
    }
    let cs = document.getElementById("skill_c#");
    if (cs.checked) {
        skills.push("C#");
    }
    if (skills.length < 1) {
        alert("Please Check your Programming Language");
        return;
    }

    let user = {
        "ID": user_id,
        "PW": user_pw,
        "GITHUB": user_git,
        "INTERESTS": itr,
        "SKILLS": skills,
        "CONTACT": "test@gmail.com",
        "COMMENT": "I wanna be a good developer!",
        "IMG": "file:///C:/%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4/Open_Project/GitRank/frontend/image/github.png",
        "SCORE": 0
    }
    localStorage.setItem("signup", JSON.stringify(user));
    localStorage.setItem("signin", JSON.stringify(user));

    // POST to /user/signup
    fetch('http://localhost:3000/user/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(res => (res.json()))
        .then(json => {
            let state = json.result;
            if (state === "result: success") {
                localStorage.setItem("signin", JSON.stringify(user));
                let link = "rank.html";
                location.href = link;
            }
            else if (state === "error: same ID") {
                alert(state);
                return;
            }
            else if (state === "error: same GITHUB") {
                alert(state)
                return;
            }
        })


})
// =========================================================================


