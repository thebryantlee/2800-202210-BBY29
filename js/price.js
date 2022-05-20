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
        item.setAttribute("class", "col-md-4");
        item.setAttribute("id", "article-" + response[j].ID);
        if(response[j].title != null) {
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
          '<div class="btn-group newsButtonLocation" id="card-' +
          response[j].ID +
          '">' +
          '<button class="btn btn-sm btn-light deleteNewsButton" onclick=""><img src="/img/icons/basic/trash_full.svg" alt="trash bin image"></button>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
          itemLocation.appendChild(item);
        }      
      }
    }
  };
  xhr.send();
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
  var wrapper = document.createElement("form");
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
      clearUrlForm();
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}