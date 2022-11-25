let use;
let rank = 0;

window.onload = function () {
    if (localStorage.getItem("signin")) {
        user = JSON.parse(localStorage.getItem("signin"));

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row";
        th.textContent = (++rank).toString();
        tr.appendChild(th);
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.textContent = user.ID;
        tr.appendChild(td1);
        td2.textContent = user.INTERESTS.join(', ');
        tr.appendChild(td2);
        td3.textContent = user.SKILLS.join(', ');
        tr.appendChild(td3);

        let tbody = document.querySelector("#rank_table tbody");
        tbody.appendChild(tr);
    }
    fetch("http://localhost:3000/users/scoreDescOrder", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(data => data.json())
        .then(json => {
            use = json;
            console.log(json)
        });

}