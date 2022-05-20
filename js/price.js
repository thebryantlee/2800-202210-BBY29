window.addEventListener("load", getItems);
document.getElementById("addUrl").addEventListener("click", addUrl);

async function getItems() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/get_items`, true);
  xhr.onload = function() {  
    if(this.status == 200) {
      const response = JSON.parse(this.responseText);
      for(let i = 0; i < response.length; i++) { 
        updatePrices(response[i].url, response[i].ID);
      }
      const itemLocation = document.getElementById("items");
      for (let j = 0; j < response.length; j++) {
        var item = document.createElement("div");
        var temp = document.getElementById(response[j].ID);

        item.setAttribute("class", "col-md-4");
        item.setAttribute("id", "article-" + response[j].ID);
        if(response[j].title != null && !temp) {
           item.innerHTML =
          '<div class="card bg-dark text-white mb-4 box-shadow">' +
          '<div class="card-header cardCategory">' +
          '<h5 class="card-title newsTitle">' +
          response[j].title +
          "</h5>" +
          '<div class="card-body">' +
          '<p class="card-text">' +
          "Current Price: " + response[j].priceStr + 
          "</p>" +
          '<img src="' + response[j].imgUrl + '" alt="amazon-images" class="stock-image" />' +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="btn-group newsButtonLocation" id="' +
          response[j].ID +
          '">' +
          '<button class="btn btn-sm btn-light deleteItem"><img src="/img/icons/basic/trash_full.svg" alt="trash bin image"></button>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
          itemLocation.appendChild(item);

          let delete_records = document.querySelectorAll(
            "button[class='btn btn-sm btn-light deleteItem']"
          );
          for (let k = 0; k < delete_records.length; k++) {
            delete_records[k].addEventListener("click", deleteItem);
          }
        }    
      }
    }
  };
  xhr.send();
}

async function itemAlert() {
  var alertPlaceholder = document.getElementById("wait");
  var temp = document.getElementById("alert-created1");
  var wrapper = document.createElement("div");
  if(!temp) {
    wrapper.innerHTML =
          '<div id="alert-created1" class="alert alert-' +
          "success" +
          ' role="alert">' +
          "Please Wait Up To Five Minutes To See Changes In Your Table." +
          "</div>";
        alertPlaceholder.append(wrapper);
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

async function updatePrices(e, f) {
  const data = {
    url: e,
    id: f
  };
  try {
      let responseObject = await fetch("/get_item_details", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if(responseObject.status == 200) {

        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
}

async function clearUrlForm(){
  const fbody = document.getElementById("urlForm");
  fbody.innerHTML = "";
}

async function addUrl(e) {
  var formPlaceholder = document.getElementById("urlForm");
  var temp = document.getElementById("formid");
  var wrapper = document.createElement("div");
  wrapper.setAttribute("id", "formid");
  if(!temp) {
    wrapper.innerHTML =
    '<div class="row g-3 align-items-center">' +
    '<div class="col-auto">' +
    '<label for="inputUrl" class="col-form-label">Url</label>' +
    "</div>" +
    '<div class="col-auto">' +
    '<input type="text" id="inputUrl" class="form-control" aria-describedby="urlHelpInline"> ' +
    "</div>" +
    '<div class="col-auto">' +
    '<span id="urlHelpInline" class="form-text">' +
      "Must be a valid URL." +
    '</span>' +
    '<button type="submit" class="btn btn-primary" onclick="addItem()">Submit</button>' +
    '<button class="btn btn-primary" onclick="clearUrlForm()">Cancel</button>' +
    "</div>" +
    "</div>";
    formPlaceholder.append(wrapper);
  }
}

async function addItem() {
  let formData = {
    url: document.getElementById("inputUrl").value,
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
    if(responseObject.status == 200) {      
      itemAlert();
      clearUrlForm();

    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}