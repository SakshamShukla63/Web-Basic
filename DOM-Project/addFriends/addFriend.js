var istatus = document.querySelector('h5');
var btn = document.querySelector("#add");
var check = 0;

btn.addEventListener("click", function () {
    if (check == 0) {
        istatus.innerHTML = "Friends";
        istatus.style.color = "green";
        btn.textContent = "Remove Friend";
        btn.style.backgroundColor = "#f44336"; // Optional: turns button red for removal
        check = 1;
    } else {
        istatus.innerHTML = "Stranger";
        istatus.style.color = "red";
        btn.textContent = "Add Friend";
        btn.style.backgroundColor = "cadetblue"; // Reverts button color back
        check = 0;
    }
});