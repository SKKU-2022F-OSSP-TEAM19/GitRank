let user;
let itr = [];

let skills = [];

let edit = {
    "ID": "",
    "PW": "",
    "GITHUB": "",
    "INTERESTS": "",
    "CONTACT": "",
    "COMMENT": "",
    "IMG": "",
    "SKILLS": "",
    "SCORE": 0
}
let done = document.getElementById("btn_done");
done.addEventListener("click", () => {
    user = JSON.parse(localStorage.getItem("signin"));

    let input_itr = document.getElementById("my_interests");
    // user_itr = input_itr.value;
    // if (user_itr.length) {
    //     edit.INTERESTS = user_itr;
    //     user.INTERESTS = user_itr;
    // }
    let input_con = document.getElementById("my_contact");
    user_con = input_con.value;

    let input_com = document.getElementById("comment");
    user_com = input_com.value;

    let img = document.getElementById("my_img");
    let img_src = img.src;
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
    edit = {
        "ID": user.ID,
        "PW": user.PW,
        "INTERESTS": itr,
        "CONTACT": user_con,
        "COMMENT": user_com,
        "IMG": img_src,
        "SKILLS": skills,
        "SCORE": 0
    }
    let url = "http://localhost:3000/userpage/edit/" + user.ID;
    console.log(url);
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit)
    }).then(data => (data.json()))
        .then(json => {
            if (json.result) {
                alert(json.result);
                return;
            }
            else {
                localStorage.setItem("signup", JSON.stringify(edit));
                localStorage.setItem("signin", JSON.stringify(edit));
                let link = 'myprofile.html';
                location.href = link;
            }
        })

    localStorage.setItem("signup", JSON.stringify(edit));
    localStorage.setItem("signin", JSON.stringify(edit));
    //let link = 'myprofile.html';
    //location.href = link;

})

window.onload = function () {
    let input_contact = document.getElementById("my_contact");
    let input_comment = document.getElementById("comment");
    let img = document.getElementById("my_img");
    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);
        // input_git.value = user.GITHUB;
        // input_itr.value = user.INTERESTS;
        // input_contact.value = user.CONTACT;
        // input_comment.value = user.COMMENT;
        // img.src = user.IMG;
    }
    else {
        alert("Connection has been terminated.");
        let link = 'signin.html';
        location.href = link;
    }
    let url = "http://localhost:3000/userpage/" + user.ID;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => (res.json()))
        .then(json => {
            user = JSON.stringify(json);
            console.log("1:" + user);
            user = JSON.parse(user);
            console.log(user);
            //input_itr.value = user.INTERESTS;
            if (user.CONTACT) {
                input_contact.value = user.CONTACT;
            }
            if (user.COMMENT) {
                input_comment.value = user.COMMENT;
            }
            if (user.IMG !== "none") {
                img.src = user.IMG;
            }
            itr = user.INTERESTS;
            skills = user.SKILLS;
            checkITR(itr);
            checkSK(skills);
        })

}
function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.getElementById("my_img")
            previewImage.src = e.target.result
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
    }
}
// input file에 change 이벤트 부여
const inputImage = document.getElementById("image_upload")
inputImage.addEventListener("change", e => {
    readImage(e.target)
})


function checkITR(interests) {
    let front = document.getElementById("itr_frontend");
    if (interests.includes("Frontend")) {
        front.checked = true;
    }
    let back = document.getElementById("itr_backend");
    if (interests.includes("Backend")) {
        back.checked = true;
    }
    let ai = document.getElementById("itr_ai");
    if (interests.includes("AI")) {
        ai.checked = true;
    }
    let db = document.getElementById("itr_database");
    if (interests.includes("Database")) {
        db.checked = true;
    }
    let npl = document.getElementById("itr_npl");
    if (interests.includes("NPL")) {
        npl.checked = true;
    }
    let ml = document.getElementById("itr_machine");
    if (interests.includes("Machine Learning")) {
        ml.checked = true;
    }
    let nn = document.getElementById("itr_neural");
    if (interests.includes("Neural Network")) {
        nn.checked = true;
    }
    let al = document.getElementById("itr_algorithm");
    if (interests.includes("Algorithm")) {
        al.checked = true;
    }
    let mining = document.getElementById("itr_mining");
    if (interests.includes("Data Mining")) {
        mining.checked = true;
    }
    let sec = document.getElementById("itr_security");
    if (interests.includes("Security")) {
        sec.checked = true;
    }
    let em = document.getElementById("itr_embeded");
    if (interests.includes("Embeded System")) {
        em.checked = true;
    }
    let mob = document.getElementById("itr_mobile");
    if (interests.includes("Mobile Application")) {
        mob.checked = true;
    }
    let web = document.getElementById("itr_web");
    if (interests.includes("Web Programming")) {
        web.checked = true;
    }
    let vr = document.getElementById("itr_vr");
    if (interests.includes("VR")) {
        vr.checked = true;
    }
    let ar = document.getElementById("itr_ar");
    if (interests.includes("AR")) {
        ar.checked = true;
    }
    let net = document.getElementById("itr_network");
    if (interests.includes("Network")) {
        net.checked = true;
    }
    let rev = document.getElementById("itr_reverse");
    if (interests.includes("Reverse Engineering")) {
        rev.checked = true;
    }
}

function checkSK(skills) {
    let py = document.getElementById("skill_python");
    if (skills.includes("Python")) {
        py.checked = true;
    }
    let java = document.getElementById("skill_java");
    if (skills.includes("Java")) {
        java.checked = true;
    }
    let js = document.getElementById("skill_js");
    if (skills.includes("JavaScript")) {
        js.checked = true;
    }
    let cpp = document.getElementById("skill_cpp");
    if (skills.includes("C++")) {
        cpp.checked = true;
    }
    let php = document.getElementById("skill_php");
    if (skills.includes("PHP")) {
        php.checked = true;
    }
    let ts = document.getElementById("skill_ts");
    if (skills.includes("TypeScript")) {
        ts.checked = true;
    }
    let c = document.getElementById("skill_c");
    if (skills.includes("C")) {
        c.checked = true;
    }
    let go = document.getElementById("skill_go");
    if (skills.includes("Go")) {
        go.checked = true;
    }
    let shell = document.getElementById("skill_shell");
    if (skills.includes("Shell")) {
        shell.checked = true;
    }
    let ruby = document.getElementById("skill_ruby");
    if (skills.includes("Ruby")) {
        ruby.checked = true;
    }
    let cs = document.getElementById("skill_c#");
    if (skills.includes("C#")) {
        cs.checked = true;
    }
}