let sign_user;
let server_users;
let num;
window.onload = function () {
    if (localStorage.getItem("signin")) {
        sign_user = JSON.parse(localStorage.getItem("signin"));
        console.log(sign_user);
    }
    fetch("http://localhost:3000/users/scoreDescOrder", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(data => data.json())
        .then(json => {
            server_users = json;
            num = json.length
            console.log(server_users)
            console.log(num);
            localStorage.setItem("users", json);
            for (let i = 0; i < num; i++) {
                console.log(json[i]);
                if (json[i].ID === sign_user.ID) {
                    console.log(json[i]);
                }
            }
        });

}