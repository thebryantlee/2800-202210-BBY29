window.addEventListener("load", getCurrentUser);
document.getElementById("cancelForm").addEventListener("click", getCurrentUser);

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
