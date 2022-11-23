let user;
let edit;
let done = document.getElementById("btn_done");
done.addEventListener("click", () => {
    let input_git = document.getElementById("my_github");
    user_git = input_git.value;
    if (user_git.length) {
        user.user_git = user_git;
    }

    let input_itr = document.getElementById("my_interests");
    user_itr = input_itr.value;
    if (user_itr.length) {
        user.interests = user_itr;
    }
    let input_con = document.getElementById("my_contact");
    user_con = input_con.value;

    let input_com = document.getElementById("comment");
    user_com = input_com.value;

    let img = document.getElementById("my_img");
    let img_src = img.src;


    edit = {
        "user_id": user.user_id,
        "user_pw": user.user_pw,
        "user_git": user.user_git,
        "interests": user.interests,
        "contact": user_con,
        "comment": user_com,
        "img": img_src,
        "skills": user.skills

    }
    console.log(edit);
    localStorage.setItem("edit", JSON.stringify(edit));
    console.log(edit);
    let link = 'myprofile.html';
    location.href = link;

})

window.onload = function () {
    if (localStorage.getItem("myprofile")) {
        user = JSON.parse(localStorage.getItem("myprofile"));
        console.log(user);
        let input_git = document.getElementById("my_github");
        input_git.value = user.user_git;

        let input_itr = document.getElementById("my_interests");
        input_itr.value = user.interests;

        let input_contact = document.getElementById("my_contact");
        input_contact.value = user.contact;

        let input_comment = document.getElementById("comment");
        input_comment.value = user.comment;

        let img = document.getElementById("my_img");
        img.src = user.img;
        console.log(img.src);
    }
    else if (localStorage.getItem("signup")) {
        user = JSON.parse(localStorage.getItem("signup"));
        console.log(user);
        let input_git = document.getElementById("my_github");
        input_git.value = user.user_git;
        let input_itr = document.getElementById("my_interests");
        input_itr.value = user.interests;
    }
    else if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);

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