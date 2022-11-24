window.onload = function () {
    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);
    }

}