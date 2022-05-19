// Bryant's code below (start)
document.getElementById("submit").addEventListener("click", login);
document.getElementById("submit1").addEventListener("click", signup);

async function login() {
  const data = {
    user_name: document.getElementById("logname").value,
    password: document.getElementById("logpass").value,
  };
  try {
    let responseObject = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status === 200) {
      const userData = await responseObject.json();
      if (userData.admin) {
        window.location.href = `/profile/${userData.user_name}`;
      } else {
        window.location.href = `/profile/${userData.user_name}`;
      }
    } else {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "Your login credentials do not match an account in our system!" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }

      console.log(responseObject.status);
      console.log("Cannot log in with the credentials provided.");
    }
  } catch (error) {
    console.log(error);
    console.log("Cannot log in with the credentials provided.");
  }
}
// Bryant's code below (end)

// Gabriel's code below (start)
async function logout() {
  try {
    let responseObject = await fetch("/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (responseObject.status === 200) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}

async function signup() {
  const formData = {
    user_name: document.getElementById("logname1").value,
    first_name: document.getElementById("logfirst").value,
    last_name: document.getElementById("loglast").value,
    email: document.getElementById("logemail2").value,
    phone_number: document.getElementById("logtel").value,
    password: document.getElementById("logpass2").value,
  };
  try {
    let responseObject = await fetch("/add_user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (responseObject.status == 200) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}
