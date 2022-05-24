window.addEventListener("load", getQuantities);
document
  .getElementById("checkout-button")
  .addEventListener("click", uploadShoppingCart);

function getQuantities() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/getShoppingQuantities`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      if (response.length > 0) {
        const popSocketLocation = document.getElementById(
          "insertPopSocketQuantity"
        );
        const waterBottleLocation = document.getElementById(
          "insertWaterBottleQuantity"
        );
        const tShirtLocation = document.getElementById("insertTShirtQuantity");
        const phoneCaseLocation = document.getElementById(
          "insertPhoneCaseQuantity"
        );
        const mugLocation = document.getElementById("insertMugQuantity");
        const hatLocation = document.getElementById("insertHatQuantity");

        var subtotal = 0;

        for (let i = 0; i < response.length; i++) {
          var itemID = response[i].productID;

          switch (itemID) {
            case 1:
              popSocketLocation.innerHTML = response[i].count;
              subtotal += 14.99 * response[i].count;
              break;
            case 2:
              waterBottleLocation.innerHTML = response[i].count;
              subtotal += 24.99 * response[i].count;
              break;
            case 3:
              tShirtLocation.innerHTML = response[i].count;
              subtotal += 19.99 * response[i].count;
              break;
            case 4:
              phoneCaseLocation.innerHTML = response[i].count;
              subtotal += 24.99 * response[i].count;
              break;
            case 5:
              mugLocation.innerHTML = response[i].count;
              subtotal += 9.99 * response[i].count;
              break;
            case 6:
              hatLocation.innerHTML = response[i].count;
              subtotal += 17.99 * response[i].count;
              break;
          }
        }

        const shippingCost = 5.0;
        var tax = subtotal * 0.12;

        const total = subtotal + shippingCost + tax;

        const subtotalLocation = document.getElementById("subtotalLocation");
        const taxLocation = document.getElementById("taxLocation");
        const totalLocation = document.getElementById("totalLocation");

        subtotalLocation.innerHTML = subtotal.toFixed(2);
        taxLocation.innerHTML = tax.toFixed(2);
        totalLocation.innerHTML = total.toFixed(2);
      }
    }
  };

  xhr.send();
}

async function uploadShoppingCart() {
  const totalVal = document.getElementById("totalLocation").innerHTML;
  const currentDatetime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const data = {
    quantityPopSocket: document.getElementById("insertPopSocketQuantity")
      .innerHTML,
    quantityBottle: document.getElementById("insertWaterBottleQuantity")
      .innerHTML,
    quantityShirt: document.getElementById("insertTShirtQuantity").innerHTML,
    quantityCase: document.getElementById("insertPhoneCaseQuantity").innerHTML,
    quantityMug: document.getElementById("insertMugQuantity").innerHTML,
    quantityHat: document.getElementById("insertHatQuantity").innerHTML,
    total: totalVal,
    purchaseDate: currentDatetime,
  };
  try {
    let responseObject = await fetch("/upload_cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status === 200) {
      deleteShoppingCart();
      window.location.href = "/checkout";
    } else {
      var alertPlaceholder = document.getElementById("tempAlert");
      var temp = document.getElementById("alert-created");
      var wrapper = document.createElement("div");
      if (!temp) {
        wrapper.innerHTML =
          '<div id="alert-created" class="alert alert-' +
          "danger" +
          ' role="alert">' +
          "There was a problem with submitting your order!" +
          "</div>";
        alertPlaceholder.append(wrapper);
      }
      console.log(responseObject.status);
    }
  } catch (error) {
    console.log(error);
  }
}

function deleteShoppingCart() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/delete_cart`, true);

  xhr.onload = function () {
    if (this.status == 200) {
    }
  };

  xhr.send();
}
