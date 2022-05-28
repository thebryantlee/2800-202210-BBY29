
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

async function checkUserName(user_name) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/get_all_users`, true);
  xhr.onload = function () {
    if(this.status == 200) {  
      const response = JSON.parse(this.responseText);
      if (response.length > 0) {
        
      } else {
        const messageLocation = document.getElementById("noTrackersMessage");
        messageLocation.innerHTML =
          '<h5 class="text-muted">' +
          "No Users currently in the database!" +
          "</h5>";
      }
       for(let i = 0; i < response.length; i++) {          
        if(response[i].user_name == user_name) {
          sendAlert();
        }
      }
    }
  };  
  xhr.send();   
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
  // await checkUserName(formData.user_name);
    try {
      let responseObject = await fetch("/add_user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(responseObject.status);
      if (responseObject.status == 200) {
        window.location.href = "/index.html";
      } else {
        sendAlert();
      }
    } catch (error) {

    }
    }


async function sendAlert() {
  let count = Math.floor(Math.random() * 1000);
  var alertPlaceholder = document.getElementById("tempAlert2");
      var temp = document.getElementById("alert-created " + count);
      var wrapper = document.createElement("div");
      wrapper.setAttribute("class", "alerts");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created1" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "Username Taken Please Try Again." +
          '<button type="button" class="btn-close float-end" id="closebtn' +
          count +
          '"aria-label="Close" ></button>' +
          "</div>";
        alertPlaceholder.append(wrapper);
        document
          .getElementById("closebtn" + count)
          .setAttribute("onclick", "this.parentElement.style.display='none'");
      } else {
        var alertPlaceholder = document.getElementById("tempAlert2");
        var temp = document.getElementById("alert-created " + count);
        var wrapper = document.createElement("div");
        if (!temp) {
          wrapper.innerHTML =
            '<div id="alert-created" class="alert alert-' +
            "danger" +
            ' role="alert">' +
            "There was problem finding the alert" +
            '<button type="button" class="btn-close float-end" id="closebtn' +
            count +
            '"aria-label="Close" ></button>' +
            "</div>";
          alertPlaceholder.append(wrapper);
          document
            .getElementById("closebtn" + count)
            .setAttribute("onclick", "this.parentElement.style.display='none'");
        }
      }
}
