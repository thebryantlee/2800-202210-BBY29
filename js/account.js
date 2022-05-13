window.addEventListener("load", loadModal);
document
  .getElementById("verifyButton")
  .addEventListener("click", verifyPassword);
document.getElementById("cancelForm").addEventListener("click", getCurrentUser);
document
  .getElementById("confirmEditButton")
  .addEventListener("click", submitChanges);

function getCurrentUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/current_user`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      const userNameLocation = document.getElementById("usernameInput");
      const emailLocation = document.getElementById("emailInput");
      const phoneNumLocation = document.getElementById("phoneNumInput");
      const fNameLocation = document.getElementById("fNameInput");
      const lNameLocation = document.getElementById("lNameInput");

      userNameLocation.setAttribute("value", response[0].user_name);
      emailLocation.setAttribute("value", response[0].email);
      phoneNumLocation.setAttribute("value", response[0].phone_number);
      fNameLocation.setAttribute("value", response[0].first_name);
      lNameLocation.setAttribute("value", response[0].last_name);
    }
  };

  xhr.send();
}

function loadModal() {
  var modal = new bootstrap.Modal(document.getElementById("passModal"), {
    backdrop: "static",
    keyboard: false,
  });
  modal.show();
}

function hideModal() {
  var modal = document.getElementById("passModal");
  var instance = bootstrap.Modal.getInstance(modal);
  instance.hide();
}

function hideConfirmModal() {
  var modal = document.getElementById("confirmModal");
  var instance = bootstrap.Modal.getInstance(modal);
  instance.hide();
}

function showSaveButton() {
  const form = document.getElementById("editAccountForm");
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-primary float-end formOptions");
  button.setAttribute("id", "confirmChangeButton");
  button.setAttribute("onclick", "verifyForm()");

  var text = document.createTextNode("Save");
  button.appendChild(text);
  form.appendChild(button);
}

function verifyForm() {
  //TODO: Fix form validation method
  const pass1 = document.getElementById("newPasswordInput").value;
  const pass2 = document.getElementById("confirmPasswordInput").value;

  if (pass1 === pass2) {
    var confirmModal = new bootstrap.Modal(
      document.getElementById("confirmModal")
    );
    confirmModal.show();
  }
}

async function verifyPassword() {
  const data = {
    password: document.getElementById("passwordInput").value,
  };
  try {
    let responseObject = await fetch("/passwordCheck", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status === 200) {
      //Hide the modal and populate the menu
      hideModal();
      getCurrentUser();
      showSaveButton();
    } else {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "The password you have entered is incorrect!" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }

      console.log(responseObject.status);
      console.log("The user has entered an incorrect password.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function submitChanges() {
  const data = {
    user_name: document.getElementById("usernameInput").value,
    first_name: document.getElementById("fNameInput").value,
    last_name: document.getElementById("lNameInput").value,
    email: document.getElementById("emailInput").value,
    phone_number: document.getElementById("phoneNumInput").value,
    password: document.getElementById("newPasswordInput").value,
  };
  try {
    let responseObject = await fetch("/updateData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status === 200) {
      //Produce alert message telling user it worked
      var alertLocation = document.getElementById("alertLocation");
      var tempPass = document.getElementById("alert-pass");
      var container = document.createElement("div");
      if (!tempPass) {
        container.innerHTML =
          '<div id="alert-pass" class="alert alert-' +
          "success" +
          ' role="alert">' +
          "Your account has successfully been updated." +
          "</div>";
        alertLocation.append(container);
      }
      getCurrentUser();
      hideConfirmModal();
    } else {
      var alertPlaceholder = document.getElementById("alertLocation");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "An error occurred while updating your account." +
          "</div>";
        alertPlaceholder.append(wrapper);
      }
      hideConfirmModal();
      console.log(responseObject.status);
    }
  } catch (error) {
    console.log(error);
    console.log("There was a problem with updating your account.");
  }
}
