document.getElementById('submit').addEventListener('click', login);
document.getElementById('logout').addEventListener('click', logout);

async function login() {
    const data = {
        user_name: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    try {
        let responseObject = await fetch('/login', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (responseObject.status === 200) {
            const userData = await responseObject.json();
            if (userData.admin) {
                window.location.href = `/admin/${userData.user_name}`;
            } else {
                window.location.href = `/profile/${userData.user_name}`;
            }
        } else {
            console.log(responseObject.status);
            // TODO: unsuccessful error message
        }
    } catch (error) {
        // TODO: server error message
        console.log(error);
    }
}

async function logout() {
    try {
        let responseObject = await fetch('/logout', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            }
        });
        if (responseObject.status === 200) {
            window.location.href = '/';
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("submit1").addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {
        user_name: document.getElementById("userName").value,
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phoneNumber").value,
        admin: document.getElementById("admin").value,
        password: document.getElementById("password").value
    };

    document.getElementById("userName").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("admin").value = "";
    document.getElementById("password").value = "";

    // BL: Fetch?
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {

            // BL: create function getCustomers?
                getCustomers();
                document.getElementById("status").innerHTML = "DB updated.";

            } else {

                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);

            }

        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("POST", "/add-user");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("user_name=" + formData.user_name + "&first_name=" + formData.first_name + "&last_name=" + formData.last_name + "&email=" + formData.email + "&phone_number=" + formData.phone_number + "&password=" + formData.password);

})