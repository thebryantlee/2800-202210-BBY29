window.addEventListener("load", getCurrentUser);

function getCurrentUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/current_user`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      const userNameLocation = document.getElementById("placeUsernameHere");
      const fullNameLocation = document.getElementById("placeFullNameHere");
      const emailLocation = document.getElementById("placeEmailHere");
      const phoneNumberLocation = document.getElementById("placePhoneNumHere");

      var usernameEl = document.createElement("p");
      var fullNameEl = document.createElement("p");
      var emailEl = document.createElement("p");
      var pNumEl = document.createElement("p");
      var text1 = document.createTextNode(response[0].user_name);
      var text2 = document.createTextNode(
        response[0].first_name + " " + response[0].last_name
      );
      var text3 = document.createTextNode(response[0].email);
      var text4 = document.createTextNode(response[0].phone_number);
      usernameEl.appendChild(text1);
      fullNameEl.appendChild(text2);
      emailEl.appendChild(text3);
      pNumEl.appendChild(text4);
      userNameLocation.appendChild(usernameEl);
      fullNameLocation.appendChild(fullNameEl);
      emailLocation.appendChild(emailEl);
      phoneNumberLocation.appendChild(pNumEl);
    }
  };

  xhr.send();
}
