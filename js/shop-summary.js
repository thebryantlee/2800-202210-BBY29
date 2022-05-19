document.getElementById('checkout-button').addEventListener('click', checkout);

function recalculateCart() {
    const taxRate = 0.12;
    const shipping = 5.00;
    var subtotal = 0;

    $('.item').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    var tax = subtotal * taxRate;
    var total = subtotal + shipping + tax;

    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('.cart-total').html(total.toFixed(2));
});
}

function checkout() {
    location.href = "/shop-confirm.html";
}