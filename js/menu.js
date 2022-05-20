window.addEventListener("load", getMenus);

function getMenus() {
  const menusLocation = document.getElementById("menus");
  menusLocation.innerHTML =
    '<div id="menus">' +
    '<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop">' +
    '<div class="offcanvas-body">' +
    '<ul class="list-group list-group-flush">' +
    '<li class="list-group-item menuList">' +
    '<a href="/" id="homeButton">' +
    '<img src="/img/icons/home/home_empty.svg" alt="House Icon" class="menuIcon"/>' +
    "Home</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="/tracker">' +
    '<img src="/img/icons/chart/stock_trend.svg" alt="Trending up Icon" class="menuIcon"/>' +
    "PC Part Price Tracker</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="/shop">' +
    '<img src="/img/icons/basic/shopping-cart.svg" alt="Shopping cart Icon" class="menuIcon"/>' +
    "Merchandise Store</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="/news">' +
    '<img src="/img/icons/basic/news.svg" alt="Compare arrows Icon" class="menuIcon"/>' +
    "Latest News</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="#" class="disabled-link">' +
    '<img src="/img/icons/basic/chatroom.svg" alt="Chat room Icon" class="menuIcon"/>' +
    "Community Boards</a>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    '<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight">' +
    '<div class="offcanvas-body">' +
    '<div class="profileHeader">' +
    '<img src="/img/icons/user/user_filled.svg" alt="Default User Icon" id="avatarIcon"/>' +
    '<div id="placeUsernameHere"></div>' +
    "</div>" +
    '<div class="profileItem">' +
    '<p class="menuLabel">Full Name</p>' +
    '<div id="placeFullNameHere"></div>' +
    "</div>" +
    '<ul class="list-group list-group-flush">' +
    '<li class="list-group-item menuList">' +
    '<a href="/account" id="accountLink">' +
    '<img src="/img/icons/user/user.svg" alt="User Account Icon" class="menuIcon"/>' +
    "Account</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="#" class="disabled-link">' +
    '<img src="/img/icons/basic/settings-grey.svg" alt="Settings Gear Icon" class="menuIcon"/>' +
    "Settings</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="#" class="disabled-link">' +
    '<img src="/img/icons/basic/bug.svg" alt="Bug Icon" class="menuIcon"/>' +
    "Bug Reports</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="#" class="disabled-link">' +
    '<img src="/img/icons/basic/update-log.svg" alt="Scroll/Update Log Icon" class="menuIcon"/>' +
    "Update Log</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="#" class="disabled-link">' +
    '<img src="/img/icons/basic/support.svg" alt="Question mark/Support Icon" class="menuIcon"/>' +
    "Support Queries</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<a href="#" class="disabled-link">' +
    '<img src="/img/icons/basic/book-outline.svg" alt="Book/Acknowledgements Icon" class="menuIcon"/>' +
    "Acknowledgements</a>" +
    "</li>" +
    '<li class="list-group-item menuList">' +
    '<img src="/img/icons/menu/sign-out.svg" alt="Signout Icon" class="menuIcon"/>' +
    '<button type="button" id="signOutButton" onclick="logout()">Sign out</button>' +
    "</li>" +
    "</ul>" +
    '<p id="appVersion">Version 0.0001</p>' +
    "</div>" +
    "</div>" +
    "</div>";
  getCurrentUser();
}

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
    case 1:
      return "/img/avatars/user-orange.svg";
    case 2:
      return "/img/avatars/user-yellow.svg";
    case 3:
      return "/img/avatars/user-green.svg";
    case 4:
      return "/img/avatars/user-blue.svg";
    case 5:
      return "/img/avatars/user-purple.svg";
    case 6:
      return "/img/avatars/user-pink.svg";
    case 7:
      return "/img/avatars/user-white.svg";
  }
}
