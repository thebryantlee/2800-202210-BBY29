window.addEventListener("load", getRecentNews);
window.addEventListener("load", getStockSamples);
document
  .getElementById("easterEggStonks")
  .addEventListener("click", stonkFunction);

function getRecentNews() {
  const newsLocation = document.getElementById("insertRecentNewsHere");
  newsLocation.innerHTML =
    '<div class="p-4 p-md-5 mb-4 text-dark rounded bg-white">' +
    '<div class="col-md-6 px-0">' +
    '<h1 class="display-4 fst-italic" id="primaryRecentNewsTitle">Title of a longer featured blog post</h1>' +
    '<p class="lead my-3" id="primaryRecentNewsSample">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>' +
    '<p class="lead mb-0"><button class="btn btn-outline-primary fw-bold" id="primaryRecentNewsLink">Continue reading &#8811;</button></p>' +
    "</div>" +
    "</div>";
  newsLocation.innerHTML +=
    '<div class="row mb-2">' +
    '<div class="col-md-6">' +
    '<div class="row g-0 border-dark rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">' +
    '<div class="col p-4 d-flex flex-column position-static bg-dark featureTextBox">' +
    '<strong class="d-inline-block mb-2 text-primary" id="secondaryNews1Category" >World</strong>' +
    '<h3 class="mb-0" id="secondaryNews1Title">Featured post</h3>' +
    '<div class="mb-1 text-muted" id="secondaryNews1Datetime">Nov 12</div>' +
    '<p class="card-text mb-auto" id="secondaryNews1Sample">This is a wider card with supporting text below as a natural lead-in to additional content.</p>' +
    '<button class="btn btn-sm btn-outline-primary fw-semibold" id="secondaryNews1Link">Continue reading &#8811;</button>' +
    "</div>" +
    '<div class="col-6 d-none d-lg-block">' +
    '<img src="/img/images/homeFeature1.png" alt="Picturing highlighting the title of this feature" class="homeFeatureImage col-12"/>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-md-6">' +
    '<div class="row g-0 border-dark rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">' +
    '<div class="col p-4 d-flex flex-column position-static bg-dark featureTextBox">' +
    '<strong class="d-inline-block mb-2 text-primary" id="secondaryNews2Category">Design</strong>' +
    '<h3 class="mb-0" id="secondaryNews2Title">Post title</h3>' +
    '<div class="mb-1 text-muted" id="secondaryNews2Datetime">Nov 11</div>' +
    '<p class="mb-auto" id="secondaryNews2Sample">This is a wider card with supporting text below as a natural lead-in to additional content.</p>' +
    '<button class="btn btn-sm btn-outline-primary fw-semibold" id="secondaryNews2Link">Continue reading &#8811;</button>' +
    "</div>" +
    '<div class="col-6 d-none d-lg-block">' +
    '<img src="/img/images/homeFeature2.png" alt="Picturing highlighting the title of this feature" class="homeFeatureImage col-12"/>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/recent_news`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      const primaryTitle = document.getElementById("primaryRecentNewsTitle");
      const primarySample = document.getElementById("primaryRecentNewsSample");
      const primaryLink = document.getElementById("primaryRecentNewsLink");
      primaryTitle.innerHTML = response[0].title;
      primarySample.innerHTML = getSampleText(response[0].full_article);
      primaryLink.setAttribute(
        "onclick",
        "viewNewsArticle(" + response[0].ID + ")"
      );

      const secondary1Category = document.getElementById(
        "secondaryNews1Category"
      );
      const secondary1Title = document.getElementById("secondaryNews1Title");
      const secondary1Datetime = document.getElementById(
        "secondaryNews1Datetime"
      );
      const secondary1Sample = document.getElementById("secondaryNews1Sample");
      const secondary1Link = document.getElementById("secondaryNews1Link");
      secondary1Category.innerHTML = getCategory(response[1].category);
      secondary1Title.innerHTML = response[1].title;
      const date1 = new Date(response[1].post_datetime).toDateString();
      secondary1Datetime.innerHTML = date1;
      secondary1Sample.innerHTML = getSampleText(response[1].full_article);
      secondary1Link.setAttribute(
        "onclick",
        "viewNewsArticle(" + response[1].ID + ")"
      );

      const secondary2Category = document.getElementById(
        "secondaryNews2Category"
      );
      const secondary2Title = document.getElementById("secondaryNews2Title");
      const secondary2Datetime = document.getElementById(
        "secondaryNews2Datetime"
      );
      const secondary2Sample = document.getElementById("secondaryNews2Sample");
      const secondary2Link = document.getElementById("secondaryNews2Link");
      secondary2Category.innerHTML = getCategory(response[2].category);
      secondary2Title.innerHTML = response[2].title;
      const date2 = new Date(response[2].post_datetime).toDateString();
      secondary2Datetime.innerHTML = date2;
      secondary2Sample.innerHTML = getSampleText(response[2].full_article);
      secondary2Link.setAttribute(
        "onclick",
        "viewNewsArticle(" + response[2].ID + ")"
      );
    }
  };

  xhr.send();
}

function getSampleText(text) {
  var output = text.slice(0, 200);
  if (output.length == 200) {
    output = output + "...";
  }
  return output;
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
  console.log("Reached here!");
  const modal = new bootstrap.Modal(
    document.getElementById("newsFocusedModal")
  );

  modal.show();
}

function stonkFunction() {
  const location = document.getElementById("easterEggStonks");
  location.innerHTML =
    "STONKS" +
    '<div class="container">' +
    "<img" +
    ' src="/img/images/stonks.png"' +
    ' alt="Stonks image"' +
    ' class="easterEggImage"' +
    "/>" +
    "</div>";
}

function getStockSamples() {
  const path = "/get_stock_samples";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      const stockLocation = document.getElementById("stockFavourites");

      for (let i = 0; i < response.length; i++) {
        var cell = document.createElement("div");
        cell.setAttribute("class", "col-md-4");
        cell.setAttribute("id", "stock-tracker-" + response[i].ID);

        cell.innerHTML =
          '<div class="card bg-dark text-white mb-4 box-shadow">' +
          '<div class="card-header cardCategory">' +
          '<img src="/img/icons/basic/stock-icon.svg" alt="' +
          "Stock prices icon" +
          '" class="stocksIcon">' +
          '<span class="card-title stockTitle"> ' +
          response[i].title +
          "</span>" +
          "</div>" +
          '<div class="card-body stockBody">' +
          '<p class="card-text stockPrice"> Amazon: $' +
          response[i].priceAmazon.toFixed(2) +
          "</p>" +
          '<p class="card-text stockPrice"> Best Buy: $' +
          response[i].priceBestBuy.toFixed(2) +
          "</p>" +
          '<p class="card-text stockPrice"> Newegg: $' +
          response[i].priceNewEgg.toFixed(2) +
          "</p>" +
          '<img src="' +
          response[i].imgUrl +
          '" alt="amazon-images" class="stockSampleImage col-6" />' +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="btn-group" id="card-' +
          response[i].ID +
          '">' +
          getUrlHref(response[i].urlAmazon, 0) +
          getUrlHref(response[i].urlBestBuy, 1) +
          getUrlHref(response[i].urlNewEgg, 2) +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";

        stockLocation.appendChild(cell);
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
          "There was a problem getting your tracked components!" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }
      console.log(response.status);
    }
  };
  xhr.send();
}

function getUrlHref(link, type) {
  if (!link) {
    return "";
  } else {
    switch (type) {
      case 0:
        var output =
          '<a class="btn btn-sm btn-dark" target="_blank" href="' +
          link +
          '"><img src="/img/icons/brand/amazon-logo.svg" alt="amazon icon image"></a>';
        return output;
      case 1:
        var output =
          '<a class="btn btn-sm btn-dark" target="_blank" href="' +
          link +
          '"><img src="/img/icons/brand/best-buy-logo.svg" alt="best buy icon image"></a>';
        return output;
      case 2:
        var output =
          '<a class="btn btn-sm btn-dark" target="_blank" href="' +
          link +
          '"><img src="/img/icons/brand/newegg-logo.svg" alt="newegg icon image"></a>';
        return output;
    }
  }
}
