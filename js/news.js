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
          getCategory(response[i].category) +
          "</div>" +
          '<div class="card-body">' +
          '<p class="card-text">' +
          response[i].title +
          "</p>" +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="btn-group">' +
          '<button type="button" class="btn btn-sm btn-outline-light" onclick="viewNewsArticle(' +
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
    }
  };

  xhr.send();
  getCategoryIcons();
}

//'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>' +

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

function getCategoryIcons() {
  const targets = document.getElementsByClassName("cardCategory");
  for (let i = 0; i < targets.length; i++) {}
}
