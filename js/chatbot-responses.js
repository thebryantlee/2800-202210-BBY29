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
  } else if (input == "goodbye") {
    return "Talk to you later!";
  } else if (input == "Bye") {
    return "Talk to you later!";
  } else if (input == "bye") {
    return "Talk to you later!";
  } else if (input == "shop") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "store") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "merch") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "I want to visit the shop") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "I want to visit the store") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "I want to buy merchandise") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "I want to buy merch") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "I want to shop") {
    return "Buy our merch " + '<a class="chat-link" href="/shop">here!</a>';
  } else if (input == "news") {
    return (
      "View the news feed " + '<a class="chat-link" href="/news">here.</a>'
    );
  } else if (input == "I want to visit the news feed") {
    return (
      "View the news feed " + '<a class="chat-link" href="/news">here.</a>'
    );
  } else if (input == "I want to visit the news") {
    return (
      "View the news feed " + '<a class="chat-link" href="/news">here.</a>'
    );
  } else if (input == "I want to see the news feed") {
    return (
      "View the news feed " + '<a class="chat-link" href="/news">here.</a>'
    );
  } else if (input == "I want to see the news") {
    return (
      "View the news feed " + '<a class="chat-link" href="/news">here.</a>'
    );
  } else if (input == "prices") {
    return (
      "View the price tracker " +
      '<a class="chat-link" href="/tracker">here.</a>'
    );
  } else if (input == "I want to compare prices") {
    return (
      "View the price tracker " +
      '<a class="chat-link" href="/tracker">here.</a>'
    );
  } else if (input == "I want to track prices") {
    return (
      "View the price tracker " +
      '<a class="chat-link" href="/tracker">here.</a>'
    );
  } else if (input == "Thanks") {
    return "You're welcome!";
  } else if (input == "Thank you") {
    return "You're welcome!";
  } else if (input == "thanks") {
    return "You're welcome!";
  } else if (input == "thank you") {
    return "You're welcome!";
  } else if (input == "best app") {
    return "Tech to the Moon!";
  } else {
    return "I'm sorry, I don't understand your question.";
  }
}
