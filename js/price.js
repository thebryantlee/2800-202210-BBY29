window.addEventListener("load", getItems);
document.getElementById("addUrl").addEventListener("click", addUrl);

async function getItems() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/get_items`, true);
  xhr.onload = function() {  
    if(this.status == 200) {
      const response = JSON.parse(this.responseText);
      for(let i = 0; i < response.length; i++) { 
        updatePrices(response[i].url);
      }
    }
  };
  xhr.open("GET", `/get_items`, true);
  xhr.send(); 
}

async function updatePrices(e) {
  const data = {
    url: e
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
      // clearUrlForm();
      console.log("got to here.");
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}