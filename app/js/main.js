document.getElementById('submit').addEventListener('click', login);

async function login() {
    console.log("Calling login function.");
    const data = {
        user_name: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    try {
        let responseObject = await fetch('/login', {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (responseObject.status === 200) {
            console.log("Response object", responseObject);
            let parsedJSON = await responseObject.json();
            console.log("From the server", parsedJSON);
            // TODO: on successful login code
        } else {
            console.log(responseObject.status);
            // TODO: unsuccessful error message
        }
    } catch(error) {
        // TODO: server error message
        console.log(error);
    }
}
