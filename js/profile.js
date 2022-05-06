document.getElementById('signOutButton').addEventListener('click', logout);

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