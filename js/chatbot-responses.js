function getBotResponse(input) {
    // Hello response
    if (input == "Hello" || "hello") {
        return "Hello there!";
    } else if (input == "Goodbye" || "goodbye" || "bye") {
        return "Talk to you later!";
    } else {
        return "Please enter another message."
    }
}