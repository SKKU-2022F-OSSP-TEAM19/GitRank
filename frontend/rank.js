let use;
window.onload = function () {
    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));
        console.log(user);
    }
    // fetch("http://localhost:3000/users/scoreDescOrder", {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }).then(data => data.json())
    //     .then(json => {
    //         use = json;
    //         console.log(json)
    //     });

}