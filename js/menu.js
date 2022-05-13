window.addEventListener("load", getCurrentUser);

function getCurrentUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/current_user`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      const avatarLocation = document.getElementById("avatarIcon");
      const userNameLocation = document.getElementById("placeUsernameHere");
      const fullNameLocation = document.getElementById("placeFullNameHere");
      const avatar = pickAvatar(response[0].avatar_path);

      avatarLocation.setAttribute("src", avatar);
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

function pickAvatar(index) {
  switch (index) {
    case 0:
      return "/img/avatars/user-black.svg";
      break;
    case 1:
      return "/img/avatars/user-orange.svg";
      break;
    case 2:
      return "/img/avatars/user-yellow.svg";
      break;
    case 3:
      return "/img/avatars/user-green.svg";
      break;
    case 4:
      return "/img/avatars/user-blue.svg";
      break;
    case 5:
      return "/img/avatars/user-purple.svg";
      break;
    case 6:
      return "/img/avatars/user-pink.svg";
      break;
    case 7:
      return "/img/avatars/user-white.svg";
      break;
  }
}
