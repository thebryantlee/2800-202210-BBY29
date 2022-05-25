window.addEventListener("load", getItems);
document.getElementById("addUrl").addEventListener("click", addUrl);
document.getElementById("updateTable").addEventListener("click", getItems);

async function getItems() {
  const itemLocation = document.getElementById("items");
  itemLocation.innerHTML = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/get_items`, true);
  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      if (response.length > 0 && !(response.length == 1 && response[0].priceStr == null)) {
        const messageLocation = document.getElementById("noTrackersMessage");
        messageLocation.innerHTML = "";
      }
      for (let i = 0; i < response.length; i++) {
        updatePrices(
          "/get_item_details_amazon",
          response[i].urlAmazon,
          response[i].ID
        );
        updatePrices(
          "/get_item_details_bestbuy",
          response[i].urlBestBuy,
          response[i].ID
        );
        updatePrices(
          "/get_item_details_newegg",
          response[i].urlNewEgg,
          response[i].ID
        );
      }
      for (let j = 0; j < response.length; j++) {
        var item = document.createElement("div");

        item.setAttribute("class", "col-md-4");
        item.setAttribute("id", "article-" + response[j].ID);
        if (response[j].priceAmazon != null && document.getElementById(response[j].ID) == null) {
          item.innerHTML =
            '<div class="card bg-dark text-white mb-4 box-shadow">' +
            '<div class="card-header">' +
            '<p class="card-title itemTitle">' +
            response[j].title +
            "</p>" +
            "</div>" +
            '<div class="card-body">' +
            '<h5 class="card-text">' +
            "Lowest Price (" +
            lowestSiteLocation(
              response[j].priceAmazon,
              response[j].priceBestBuy,
              response[j].priceNewEgg
            ) +
            "): $" +
            Math.min(
              response[j].priceAmazon,
              response[j].priceBestBuy,
              response[j].priceNewEgg
            ).toFixed(2) +
            "</h5>" +
            '<img src="' +
            response[j].imgUrl +
            '" alt="amazon-images" class="stock-image" />' +
            '<div class="d-flex justify-content-between align-items-center">' +
            '<div class="btn-group newsButtonLocation" id="' +
            response[j].ID +
            '">' +
            getUrlHref(response[j].urlAmazon, 0) +
            getUrlHref(response[j].urlBestBuy, 1) +
            getUrlHref(response[j].urlNewEgg, 2) +
            '<button class="btn btn-sm btn-light float-end deleteItem"><img src="/img/icons/basic/trash_full.svg" alt="trash bin image"></button>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
          itemLocation.appendChild(item);
        }

        let delete_records = document.querySelectorAll(
          "button[class='btn btn-sm btn-light float-end deleteItem']"
        );
        for (let k = 0; k < delete_records.length; k++) {
          delete_records[k].addEventListener("click", deleteItem);
        }
      }
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

function lowestSiteLocation(amazon, bestbuy, newegg) {
  const min = Math.min(amazon, bestbuy, newegg);
  switch (min) {
    case amazon:
      return "Amazon";
    case bestbuy:
      return "Best Buy";
    case newegg:
      return "Newegg";
  }
}

async function deleteItem(e) {
  const data = {
    id: e.target.parentNode.parentNode.id,
  };
  try {
    let responseObject = await fetch("/delete_item", {
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
      getItems();
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "success" +
          ' role="alert">' +
          "Item Has Been Deleted." +
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
            "There was problem deleting that item." +
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

async function updatePrices(path, e, f) {
  const appPath = path;
  const data = {
    url: e,
    id: f,
  };
  try {
    let responseObject = await fetch(appPath, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status == 200) {
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

async function clearUrlForm() {
  const fbody = document.getElementById("urlForm");
  fbody.innerHTML = "";
}

async function addUrl() {
  var formPlaceholder = document.getElementById("urlForm");
  var temp = document.getElementById("formid");
  var wrapper = document.createElement("div");
  wrapper.setAttribute("id", "formid");
  wrapper.setAttribute("class", "container bg-dark");
  if (!temp) {
    wrapper.innerHTML =
      '<div class="row g-3 mb-3 align-items-center">' +
      '<div class="col-11">' +
      '<label for="modelName" class="col-form-label">PC Component Name</label>' +
      "</div>" +
      '<div class="col-11">' +
      '<input type="text" id="modelName" class="form-control" aria-describedby="urlHelpInline"> ' +
      "</div>" +
      '<div class="col-11">' +
      '<label for="amazonUrl" class="col-form-label">Amazon URL</label>' +
      "</div>" +
      '<div class="col-11">' +
      '<input type="text" id="amazonUrl" class="form-control" aria-describedby="urlHelpInline"> ' +
      "</div>" +
      "</div>" +
      '<div class="row g-3 mb-3 align-items-center">' +
      '<div class="col-11">' +
      '<label for="bestBuyUrl" class="col-form-label">Best Buy URL</label>' +
      "</div>" +
      '<div class="col-11">' +
      '<input type="text" id="bestBuyUrl" class="form-control" aria-describedby="urlHelpInline"> ' +
      "</div>" +
      "</div>" +
      '<div class="row g-3 mb-3 align-items-center">' +
      '<div class="col-auto">' +
      '<label for="neweggUrl" class="col-form-label">Newegg URL</label>' +
      "</div>" +
      '<div class="col-11">' +
      '<input type="text" id="neweggUrl" class="form-control" aria-describedby="urlHelpInline"> ' +
      "</div>" +
      "</div>" +
      '<div class="col-auto">' +
      '<span id="urlHelpInline" class="form-text">' +
      "Must be a valid URL." +
      "</span>" +
      '<button class="btn btn-secondary formOptions" onclick="clearUrlForm()">Cancel</button>' +
      '<button type="submit" class="btn btn-primary formOptions" onclick="addItem()">Submit</button>' +
      "</div>" +
      "</div>";
    formPlaceholder.append(wrapper);
  }
}

async function addItem() {
  let formData = {
    modelName: document.getElementById("modelName").value,
    amazonUrl: document.getElementById("amazonUrl").value,
    bestBuyUrl: document.getElementById("bestBuyUrl").value,
    neweggUrl: document.getElementById("neweggUrl").value,
  };
  try {
    let responseObject = await fetch("/add_item", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (responseObject.status == 200) {
      itemAlert();
      clearUrlForm();
      const messageLocation = document.getElementById("noTrackersMessage");
      messageLocation.innerHTML = "";
      getItems();
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

async function itemAlert() {
  var alertPlaceholder = document.getElementById("wait");
  var temp = document.getElementById("alert-created1");
  var wrapper = document.createElement("div");
  if (!temp) {
    wrapper.innerHTML =
      '<div id="alert-created1" class="alert alert-' +
      "success" +
      ' role="alert">' +
      "Your item is successfully being tracked! Please wait up to five minutes to see your new tracker." +
      "</div>";
    alertPlaceholder.append(wrapper);
  }
}
