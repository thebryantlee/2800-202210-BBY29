window.addEventListener("load", getShoppingCart);
window.addEventListener("load", getPurchaseHistory);

function getPurchaseHistory() {
  const historyLocation = document.getElementById("insertHistoryHere");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/get_purchase_history`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);

      if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {
          var cell = document.createElement("div");

          var date = new Date(response[i].purchaseDate).toDateString();

          cell.innerHTML =
            '<div class="card bg-dark text-white mb-4 box-shadow">' +
            '<div class="card-header cardCategory">' +
            '<div class="purchaseDateContainer">' +
            "ORDER PLACED<p>" +
            date +
            "</p></div>" +
            '<div class="totalContainer">' +
            "TOTAL<p>$" +
            response[i].total.toFixed(2) +
            "</p></div>" +
            '<div class="orderIDContainer">' +
            "<p>ORDER # " +
            response[i].ID +
            "</p>" +
            "</div>" +
            "</div>" +
            '<div class="card-body list-group historyGroup" id="insertQuantitiesHere">' +
            checkQuantity(response[i].quantityPopSocket, 1) +
            checkQuantity(response[i].quantityBottle, 2) +
            checkQuantity(response[i].quantityShirt, 3) +
            checkQuantity(response[i].quantityCase, 4) +
            checkQuantity(response[i].quantityMug, 5) +
            checkQuantity(response[i].quantityHat, 6) +
            "</div>" +
            "</div>";

          historyLocation.appendChild(cell);
        }
      } else {
        const messageLocation = document.getElementById("historyContainer");
        messageLocation.innerHTML =
          "You have no purchase history yet. Purchase something from our store to see the history here!";
      }
    }
  };

  xhr.send();
}

function checkQuantity(quantity, itemID) {
  if (quantity === 0) {
    return "";
  } else {
    var output =
      '<div class="list-group-item bg-dark text-light">' +
      '<img class="historyImage float-start" src="' +
      getProductImage(itemID) +
      '" alt="' +
      getProductAlt(itemID) +
      '"/>' +
      "<div>" +
      '<small class="float-end"> x' +
      quantity +
      "</small>" +
      '<h6 class="mb-1 float-end historyLabel">   ' +
      getProductName(itemID) +
      "</h6>" +
      "</div>" +
      "</div>";

    return output;
  }
}

function getProductImage(id) {
  switch (id) {
    case 0:
      return error;
    case 1:
      return "/img/images/TTTM_Pop_Socket.png";
    case 2:
      return "/img/images/TTTM_Water_Bottle.png";
    case 3:
      return "/img/images/TTTM_T-Shirt.png";
    case 4:
      return "/img/images/TTTM_Phone_Case.png";
    case 5:
      return "/img/images/TTTM_Mug.png";
    case 6:
      return "/img/images/TTTM_Hat.png";
  }
}

function getProductAlt(id) {
  switch (id) {
    case 0:
      return error;
    case 1:
      return "Image of a pop socket with the TTTM logo";
    case 2:
      return "Image of a water bottle with the TTTM logo";
    case 3:
      return "Image of a t-shirt with the TTTM logo";
    case 4:
      return "Image of a phone case with the TTTM logo";
    case 5:
      return "Image of a mug with the TTTM logo";
    case 6:
      return "Image of a hat with the TTTM logo";
  }
}

function getShoppingCart() {
  const shoppingMenu = document.getElementById("shoppingCartMenu");
  shoppingMenu.innerHTML =
    '<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasShoppingCart" aria-labelledby="offcanvasShoppingCart">' +
    '<div class="offcanvas-header">' +
    '<h5 id="offcanvasRightLabel">Shopping Cart</h5>' +
    '<button type="button" class="btn-close text-reset btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
    "</div>" +
    '<div class="offcanvas-body" id="shoppingCartBody">' +
    "..." +
    '<div id="insertCartItemsHere"></div>' +
    "</div>" +
    "</div>";
  getShoppingSessionItems();
}

function getShoppingSessionItems() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/getShoppingSessionItems`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      if (response.length > 0) {
        const checkoutLocation = document.getElementById("shoppingCartBody");
        checkoutLocation.innerHTML =
          '<div id="cartItemContainer">' +
          '<ul class="list-group list-group-flush" id="insertCartItemsHere">' +
          "</ul>" +
          "</div>" +
          '<button class="btn btn-light" id="deleteCartButton" onclick="deleteShoppingCart()">' +
          "Delete all" +
          '<img src="/img/icons/basic/trash_full.svg" alt="trash bin image">' +
          "</button>" +
          '<a href="/summary" class="btn btn-success float-end" id="summaryShop">Checkout</a>';

        const itemLocation = document.getElementById("insertCartItemsHere");
        var subtotal = 0;
        for (let i = 0; i < response.length; i++) {
          var cell = document.createElement("li");
          cell.setAttribute("class", "list-group-item menuList text-light");
          cell.setAttribute("id", "card-item-" + response[i].ID);

          cell.innerHTML =
            '<div class="ms-2 me-auto">' +
            '<button type="button" class="btn-close btn-close-white float-end" onclick="deleteCartItem(' +
            response[i].ID +
            ')"></button>' +
            '<div class="fw-bold">' +
            getProductName(response[i].productID) +
            "</div>" +
            "x " +
            response[i].quantity +
            "</div>" +
            '<span class="float-end">$' +
            (
              getProductPrice(response[i].productID) * response[i].quantity
            ).toFixed(2) +
            "</span>";
          subtotal +=
            getProductPrice(response[i].productID) * response[i].quantity;
          itemLocation.appendChild(cell);
        }
        document.getElementById("insertCartItemsHere").innerHTML +=
          '<li class="fs-5 list-group-item menuList text-light">' +
          "Subtotal" +
          '<span class="fw-bold float-end">$' +
          subtotal.toFixed(2) +
          "</span>" +
          "</li>";
      } else {
        const checkoutLocation = document.getElementById("shoppingCartBody");
        checkoutLocation.innerHTML =
          "There are no items currently in your shopping cart!";
      }
    }
  };

  xhr.send();
}

function deleteShoppingCart() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/delete_cart`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      getShoppingSessionItems();
    }
  };

  xhr.send();
}

async function deleteCartItem(id) {
  const data = {
    itemID: id,
  };
  try {
    let responseObject = await fetch("/delete_cart_item", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status == 200) {
      getShoppingSessionItems();
    }
  } catch (error) {
    console.log(error);
  }
}

function getProductName(id) {
  switch (id) {
    case 0:
      return error;
    case 1:
      return "TTTM Popsocket";
    case 2:
      return "TTTM Bottle";
    case 3:
      return "TTTM T-Shirt";
    case 4:
      return "TTTM Phone Case";
    case 5:
      return "TTTM Mug";
    case 6:
      return "TTTM Hat";
  }
}

function getProductPrice(id) {
  switch (id) {
    case 0:
      return error;
    case 1:
      return 14.99;
    case 2:
      return 24.99;
    case 3:
      return 19.99;
    case 4:
      return 24.99;
    case 5:
      return 9.99;
    case 6:
      return 17.99;
  }
}

async function addItemToCart(ID, num) {
  const itemID = ID;
  const quantity = num;
  console.log(itemID);
  console.log(quantity);
  const data = {
    itemID,
    quantity,
  };
  try {
    let responseObject = await fetch("/addCartItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (responseObject.status === 200) {
      console.log("Item added to cart!");
      getShoppingSessionItems();
    }
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("add-popsocket-button").onclick = function () {
  const itemID = 1;
  const quantity = document.getElementById("popsocket-quantity").value;
  addItemToCart(itemID, quantity);
};

document.getElementById("add-water-bottle-button").onclick = function () {
  const itemID = 2;
  const quantity = document.getElementById("water-bottle-quantity").value;
  addItemToCart(itemID, quantity);
};

document.getElementById("add-t-shirt-button").onclick = function () {
  const itemID = 3;
  const quantity = document.getElementById("t-shirt-quantity").value;
  addItemToCart(itemID, quantity);
};

document.getElementById("add-phone-case-button").onclick = function () {
  const itemID = 4;
  const quantity = document.getElementById("phone-case-quantity").value;
  addItemToCart(itemID, quantity);
};

document.getElementById("add-mug-button").onclick = function () {
  const itemID = 5;
  const quantity = document.getElementById("mug-quantity").value;
  addItemToCart(itemID, quantity);
};

document.getElementById("add-hat-button").onclick = function () {
  const itemID = 6;
  const quantity = document.getElementById("hat-quantity").value;
  addItemToCart(itemID, quantity);
};
