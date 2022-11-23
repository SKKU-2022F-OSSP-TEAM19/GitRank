window.onload = function () {
    let user;
    let span_git = document.getElementById("user_github");
    let span_itr = document.getElementById("user_interests");
    let span_con = document.getElementById("user_contact");
    let span_com = document.getElementById("user_comment");
    let span_contribution = document.getElementById("contribution");
    let img = document.getElementById("my_img");

    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);

        span_git.innerHTML = user.user_git;
        span_itr.innerHTML = user.interests;
        span_con.innerHTML = user.contact;
        span_com.innerHTML = user.comment;
        span_contribution.innerHTML = user.skills;
        img.src = user.img;


    }

}