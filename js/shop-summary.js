document.getElementById('checkout-button').addEventListener('click', checkout);

// Recalculate the shopping cart
function recalculateCart() {
    const taxRate = 0.12;
    const shipping = 5.00;
    var subtotal = 0;

    // Subtotals
    $('.item').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    // Forumlas for tax and total amounts
    var tax = subtotal * taxRate;
    var total = subtotal + shipping + tax;

    // Updating the displayed total
    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('.cart-total').html(total.toFixed(2));
    });
}

// Update quantity
function updateQuantity(quantityInput) {
    // Calculate line price
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    // Update line price display and recalc cart totals
    productRow.children('.product-line-price').each(function () {
        // What goes into fadeOut?
        $(this).fadeOut(function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
        });
    });
}

// Remove item from cart
function removeItem(removeButton) {
    // Remove row from DOM and recalculate cart total
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}

function checkout() {
    location.href = "/shop-confirm.html";
}