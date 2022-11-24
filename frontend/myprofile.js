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

        span_git.innerHTML = user.GITHUB;
        span_itr.innerHTML = user.INTERESTS;
        span_con.innerHTML = user.CONTACT;
        span_com.innerHTML = user.COMMENT;
        span_contribution.innerHTML = user.SKILLS;
        img.src = user.IMG;


    }

}