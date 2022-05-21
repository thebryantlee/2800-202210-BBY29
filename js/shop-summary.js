window.addEventListener("load", loadItems);
document.getElementById('checkout-button').addEventListener('click', uploadShoppingCart);

async function loadItems() {
    try {
        let responseObject = await fetch('/currentCart', {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            }
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-5-button').onclick = function() {
    const quantity = document.getElementById('product-5-quantity').value;
    console.log(quantity);
    const putObj = {
        quantity
    };
    try {
        let responseObject = fetch('/updateItem5', {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(putObj)
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
            loadItems();
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-6-button').onclick = function() {
    const quantity = document.getElementById('product-6-quantity').value;
    console.log(quantity);
    const putObj = {
        quantity
    };
    try {
        let responseObject = fetch('/updateItem6', {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(putObj)
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
            loadItems();
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-1-button').onclick = function() {
    const quantity = document.getElementById('product-1-quantity').value;
    console.log(quantity);
    const putObj = {
        quantity
    };
    try {
        let responseObject = fetch('/updateItem1', {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(putObj)
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
            loadItems();
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-2-button').onclick = function() {
    const quantity = document.getElementById('product-2-quantity').value;
    console.log(quantity);
    const putObj = {
        quantity
    };
    try {
        let responseObject = fetch('/updateItem2', {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(putObj)
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
            loadItems();
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-3-button').onclick = function() {
    const quantity = document.getElementById('product-3-quantity').value;
    console.log(quantity);
    const putObj = {
        quantity
    };
    try {
        let responseObject = fetch('/updateItem3', {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(putObj)
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
            loadItems();
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-4-button').onclick = function() {
    const quantity = document.getElementById('product-4-quantity').value;
    console.log(quantity);
    const putObj = {
        quantity
    };
    try {
        let responseObject = fetch('/updateItem4', {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(putObj)
        });
        if (responseObject.status === 200) {
            console.log(responseObject)
            loadItems();
        }
    } catch (error) {
        console.log(error);
    }
}

setInterval(function() {
    const quantityPopSocket = document.getElementById('product-5-quantity').value;
    const quantityBottle = document.getElementById('product-6-quantity').value;
    const quantityShirt = document.getElementById('product-1-quantity').value;
    const quantityCase = document.getElementById('product-2-quantity').value;
    const quantityMug = document.getElementById('product-3-quantity').value;
    const quantityHat = document.getElementById('product-4-quantity').value;
    const subtotalLocation = document.getElementById('subtotalLocation');
    const tax = document.getElementById('taxLocation');
    const totalLocation = document.getElementById('totalLocation');

    const pricePop = 14.99;
    const priceBottle = 24.99;
    const priceShirt = 19.99;
    const priceCase = 24.99;
    const priceMug = 9.99;
    const priceHat = 17.99;
    
    const subtotal = ((pricePop * quantityPopSocket) + (priceBottle * quantityBottle) + (priceShirt * quantityShirt) + (priceCase * quantityCase) + (priceMug * quantityMug) + (priceHat * quantityHat)).toFixed(2);
    subtotalLocation.innerHTML = subtotal;

    const subtotalValue = (pricePop * quantityPopSocket) + (priceBottle * quantityBottle) + (priceShirt * quantityShirt) + (priceCase * quantityCase) + (priceMug * quantityMug) + (priceHat * quantityHat);
    const taxValue = subtotal * 0.12;
    const shippingPrice = 5.00;
    const taxPrice = (subtotal * 0.12).toFixed(2);
    const total = (subtotalValue + shippingPrice + taxValue).toFixed(2);
    const totalValue = (subtotalValue + shippingPrice + taxValue);
    tax.innerHTML = taxPrice;
    totalLocation.innerHTML = total;

  }, 1000);

  async function uploadShoppingCart() {
    const totalVal = document.getElementById("totalLocation").innerHTML;
    const currentDatetime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const data = {
      quantityPopSocket: document.getElementById("product-5-quantity").value,
      quantityBottle: document.getElementById("product-6-quantity").value,
      quantityShirt: document.getElementById("product-1-quantity").value,
      quantityCase: document.getElementById("product-2-quantity").value,
      quantityMug: document.getElementById("product-3-quantity").value,
      quantityHat: document.getElementById("product-4-quantity").value,
      total: totalVal,
      purchaseDate: currentDatetime
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
