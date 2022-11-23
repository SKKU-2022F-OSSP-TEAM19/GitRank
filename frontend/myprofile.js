window.onload = function () {
    let user;
    let edit;
    let span_git = document.getElementById("user_github");
    let span_itr = document.getElementById("user_interests");
    let span_con = document.getElementById("user_contact");
    let span_com = document.getElementById("user_comment");
    let span_contribution = document.getElementById("contribution");
    let img = document.getElementById("my_img");

    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);
    }
    if (localStorage.getItem("signup")) {
        user = JSON.parse(localStorage.getItem("signup"));
        console.log(user);

        span_git.innerHTML = user.user_git;

        span_itr.innerHTML = user.interests;

        span_contribution.innerHTML = user.skills;
    }
    if (localStorage.getItem("edit")) {
        edit = JSON.parse(localStorage.getItem("edit"));
        console.log(edit);
        if (edit.user_id === user.user_id) {
            user = edit;
            span_git.innerHTML = edit.user_git;
            span_itr.innerHTML = edit.interests;
            span_con.innerHTML = edit.contact;
            span_com.innerHTML = edit.comment;
            span_contribution.innerHTML = edit.skills;
            img.src = edit.img;
        }

    }
    localStorage.setItem("myprofile", JSON.stringify(user));

}