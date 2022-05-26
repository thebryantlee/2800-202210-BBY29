function getBotResponse(input) {
    // Hello response
    if (input == "Hello") {
        return "Hello there!";
    } else if (input == "hello") {
        return "Hello there!";
    } else if (input == "Hi") {
        return "Hello there!";
    } else if (input == "hi") {
        return "Hello there!";
    } else if (input == "Goodbye") {
        return "Talk to you later!";
    } else if (input == "Good bye") {
        return "Talk to you later!";
    } else if (input == "Bye") {
        return "Talk to you later!";
    } else if (input == "bye") {
        return "Talk to you later!";
    } else if (input == "shop") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "store") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "merch") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "I want to visit the shop") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "I want to visit the store") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "I want to buy merchandise") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "I want to buy merch") {
        return "Buy our merch " + '<a href="/shop.html">here!</a>';
    } else if (input == "news") {
        return "View the news feed " + '<a href="/news.html">here.</a>';
    } else if (input == "I want to visit the news feed") {
        return "View the news feed " + '<a href="/news.html">here.</a>';
    } else if (input == "I want to visit the news") {
        return "View the news feed " + '<a href="/news.html">here.</a>';
    } else if (input == "I want to see the news feed") {
        return "View the news feed " + '<a href="/news.html">here.</a>';
    } else if (input == "I want to see the news") {
        return "View the news feed " + '<a href="/news.html">here.</a>';
    } else if (input == "prices") {
        return "View the price tracker " + '<a href="/tracker.html">here.</a>';
    } else if (input == "I want to compare prices") {
        return "View the price tracker " + '<a href="/tracker.html">here.</a>';
    } else if (input == "I want to track prices") {
        return "View the price tracker " + '<a href="/tracker.html">here.</a>';
    } else if (input == "Thanks") {
        return "You're welcome!";
    } else if (input == "Thank you") {
        return "You're welcome!";
    } else if (input == "thanks") {
        return "You're welcome!";
    } else if (input == "thank you") {
        return "You're welcome!";
    } else {
        return "Please enter another message.";
    }
}
