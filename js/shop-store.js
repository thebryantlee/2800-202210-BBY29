document.getElementById('product-5-button').onclick = function () {
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
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-6-button').onclick = function () {
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
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-1-button').onclick = function () {
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
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-2-button').onclick = function () {
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
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-3-button').onclick = function () {
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
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('product-4-button').onclick = function () {
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
        }
    } catch (error) {
        console.log(error);
    }
}

