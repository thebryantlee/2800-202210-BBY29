window.addEventListener("load", getCurrentUser);

function getCurrentUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/current_user`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      const userNameLocation = document.getElementById("placeUsernameHere");
      const fullNameLocation = document.getElementById("placeFullNameHere");

      var usernameEl = document.createElement("p");
      var fullNameEl = document.createElement("p");
      var text1 = document.createTextNode(response[0].user_name);
      var text2 = document.createTextNode(
        response[0].first_name + " " + response[0].last_name
      );
      usernameEl.appendChild(text1);
      fullNameEl.appendChild(text2);
      userNameLocation.appendChild(usernameEl);
      fullNameLocation.appendChild(fullNameEl);
    }
  };

  xhr.send();
}
