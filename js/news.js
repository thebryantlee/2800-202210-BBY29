window.addEventListener("load", getNews);

function getNews() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/getNews`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      const newsLocation = document.getElementById("insertNewsHere");
      for (let i = 0; i < response.length; i++) {
        var cell = document.createElement("div");
        cell.setAttribute("class", "col-md-4");
        cell.setAttribute("id", "article-" + response[i].ID);

        var dateEdit = response[i].post_datetime.split(/[- :]/);
        var date = new Date(response[i].post_datetime).toDateString();

        cell.innerHTML =
          '<div class="card bg-dark text-white mb-4 box-shadow">' +
          '<div class="card-header cardCategory">' +
          '<img src="' +
          getCategoryIcon(response[i].category) +
          '" alt="' +
          getCategoryAlt(response[i].category) +
          '" class="newsCategoryIcon">' +
          getCategory(response[i].category) +
          "</div>" +
          '<div class="card-body">' +
          '<h5 class="card-title newsTitle">' +
          response[i].title +
          "</h5>" +
          '<p class="card-text">' +
          getSampleText(response[i].full_article) +
          "</p>" +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="btn-group newsButtonLocation" id="card-' +
          response[i].ID +
          '">' +
          '<button class="btn btn-sm btn-outline-light align-bottom viewArticleButton" onclick="viewNewsArticle(' +
          response[i].ID +
          ')">View</button>' +
          "</div>" +
          '<small class="text-muted">' +
          date +
          "</small>" +
          "</div>" +
          "</div>" +
          "</div>";

        newsLocation.appendChild(cell);
      }
      adminButtonCheck();
    }
  };

  xhr.send();
}

function getCategory(num) {
  switch (num) {
    case 0:
      return error;
    case 1:
      return "New Release";
    case 2:
      return "Tech Company";
    case 3:
      return "Major Update";
    case 4:
      return "Event";
    case 5:
      return "Random";
  }
}

function getCategoryIcon(num) {
  switch (num) {
    case 0:
      return error;
    case 1:
      return "../img/icons/basic/newBadge.svg";
    case 2:
      return "../img/icons/basic/techCompany.svg";
    case 3:
      return "../img/icons/basic/updatePaper.svg";
    case 4:
      return "../img/icons/basic/eventCalendar.svg";
    case 5:
      return "../img/icons/basic/randomDice.svg";
  }
}

function getCategoryAlt(num) {
  switch (num) {
    case 0:
      return error;
    case 1:
      return "A emoji with the word new";
    case 2:
      return "An office building emoji";
    case 3:
      return "A newspaper emoji";
    case 4:
      return "A calendar emoji";
    case 5:
      return "A dice emoji";
  }
}

function getSampleText(text) {
  var output = text.slice(0, 200);
  if (output.length == 200) {
    output = output + "...";
  }
  return output;
}

function adminButtonCheck() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/current_user`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      if (response[0].admin) {
        var targetLocation =
          document.getElementsByClassName("newsButtonLocation");
        for (let i = 0; i < targetLocation.length; i++) {
          var deleteButton = document.createElement("button");
          var cardIDArr = targetLocation[i].id.split("-");
          var articleID = cardIDArr[1];
          deleteButton.setAttribute(
            "class",
            "btn btn-sm btn-light deleteNewsButton"
          );
          deleteButton.setAttribute(
            "onclick",
            "deleteArticle(" + articleID + ")"
          );
          var deleteImage = document.createElement("img");
          deleteImage.setAttribute("src", "/img/icons/basic/trash_full.svg");
          deleteImage.setAttribute("alt", "trash bin image");
          deleteButton.appendChild(deleteImage);
          targetLocation[i].appendChild(deleteButton);
        }
      }
    }
  };

  xhr.send();
}

function viewNewsArticle(articleID) {
  const path = "/article/" + articleID;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      const newsTitleLocation = document.getElementById("newsFocusedTitle");
      const newsDatetimeLocation = document.getElementById("newsFocusedDate");
      const newsTextLocation = document.getElementById("newsFocusedText");
      const date = new Date(response[0].post_datetime).toDateString();

      newsTitleLocation.innerHTML = response[0].title;
      newsDatetimeLocation.innerHTML = date;
      newsTextLocation.innerHTML = response[0].full_article;
      grabArticleAuthor(response[0].user_id);
    } else {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "There was a problem getting this news article!" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }
      console.log(response.status);
    }
  };
  xhr.send();
}

function grabArticleAuthor(userID) {
  const path = "/get_user/" + userID;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      const newsAuthorLocation = document.getElementById("newsFocusedAuthor");

      newsAuthorLocation.innerHTML =
        response[0].first_name + " " + response[0].last_name;
      openNewsArticle();
    } else {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "There was a problem getting the author of this news article!" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }
      console.log(response.status);
    }
  };
  xhr.send();
}

function openNewsArticle() {
  const modal = new bootstrap.Modal(
    document.getElementById("newsFocusedModal")
  );

  modal.show();
}

async function deleteArticle(articleID) {
  const data = {
    id: articleID,
  };
  try {
    let responseObject = await fetch("/delete_news", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status == 200) {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      refreshNews();
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "success" +
          ' role="alert">' +
          "Article " +
          articleID +
          " Has Been Deleted." +
          "</div>";
        alertPlaceholder.append(wrapper);
      } else {
        var alertPlaceholder = document.getElementById("tempAlert");
        var temp = document.getElementById("alert-created");
        var wrapper = document.createElement("div");
        if (!temp) {
          wrapper.innerHTML =
            '<div id="alert-created" class="alert alert-' +
            "danger" +
            ' role="alert">' +
            "There was problem deleting that news article." +
            "</div>";
          alertPlaceholder.append(wrapper);
        }
        console.log(responseObject.status);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function refreshNews() {
  const newsLocation = document.getElementById("insertNewsHere");
  newsLocation.innerHTML = "";
  getNews();
}
