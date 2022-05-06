// Bryant's code below (start)
document.getElementById('submit').addEventListener('click', login);
// document.getElementById('signOutButton').addEventListener('click', logout);

async function login() {
    const data = {
        user_name: document.getElementById('logname').value,
        password: document.getElementById('logpass').value
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
            console.log("Cannot log in with the credentials provided.")
        }
    } catch (error) {
        console.log(error);
        console.log("Cannot log in with the credentials provided.")
    }
}
// Bryant's code below (end)

// Gabriel's code below (start)
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
        user_name: document.getElementById("logname").value,
        // first_name: document.getElementById("firstName").value,
        // last_name: document.getElementById("lastName").value,
        email: document.getElementById("logemail2").value,
        // phone_number: document.getElementById("phoneNumber").value,
        // admin: document.getElementById("admin").value,
        password: document.getElementById("logpass2").value
    };

    document.getElementById("logname").value = "";
    // document.getElementById("firstName").value = "";
    // document.getElementById("lastName").value = "";
    document.getElementById("logemail2").value = "";
    // document.getElementById("phoneNumber").value = "";
    // document.getElementById("admin").value = "";
    document.getElementById("logpass2").value = "";

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {
                // console.log(results);
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
    xhr.send("user_name=" + formData.user_name + "&email=" + formData.email + "&password=" + formData.password);

})
// Gabriel's code below (end)
