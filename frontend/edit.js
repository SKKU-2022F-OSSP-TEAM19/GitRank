let user;
let edit;
let done = document.getElementById("btn_done");
done.addEventListener("click", () => {
    let input_git = document.getElementById("my_github");
    user_git = input_git.value;
    if (user_git.length) {
        user.GITHUB = user_git;
    }

    let input_itr = document.getElementById("my_interests");
    user_itr = input_itr.value;
    if (user_itr.length) {
        user.INTERESTS = user_itr;
    }
    let input_con = document.getElementById("my_contact");
    user_con = input_con.value;

    let input_com = document.getElementById("comment");
    user_com = input_com.value;

    let img = document.getElementById("my_img");
    let img_src = img.src;


    edit = {
        "ID": user.ID,
        "PW": user.PW,
        "GITHUB": user.GITHUB,
        "INTERESTS": user.INTERESTS,
        "CONTACT": user_con,
        "COMMENT": user_com,
        "IMG": img_src,
        "SKILLS": user.SKILLS,
        "SCORE": 0
    }
    localStorage.setItem("signup", JSON.stringify(edit));
    localStorage.setItem("signin", JSON.stringify(edit));
    let link = 'myprofile.html';
    location.href = link;

})

window.onload = function () {
    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);
        let input_git = document.getElementById("my_github");
        input_git.value = user.GITHUB;

        let input_itr = document.getElementById("my_interests");
        input_itr.value = user.INTERESTS;

        let input_contact = document.getElementById("my_contact");
        input_contact.value = user.CONTACT;

        let input_comment = document.getElementById("comment");
        input_comment.value = user.COMMENT;

        let img = document.getElementById("my_img");
        img.src = user.IMG;
    }
    else {
        alert("My information is not being received.")
    }

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