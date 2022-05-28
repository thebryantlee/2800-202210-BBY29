// Collapsible
window.addEventListener("load", getChatbot);

function getChatbot() {
  const chatbotLocation = document.getElementById("insertChatbot");
  chatbotLocation.innerHTML =
    '<div class="chat-bar-collapsible">' +
    '<button id="chat-button" type="button" class="collapsible">Help Bot ' +
    '<i id="chat-icon" style="color: #fff;" class="fa fa-fw fa-comments-o"></i>' +
    "</button>" +
    '<div class="content">' +
    '<div class="full-chat-block">' +
    '<div class="outer-container">' +
    '<div class="chat-container">' +
    '<div id="chatbox">' +
    '<h5 id="chat-timestamp"></h5>' +
    '<p id="botStarterMessage" class="botText"><span>Loading...</span></p>' +
    "</div>" +
    '<div class="chat-bar-input-block">' +
    '<div id="userInput">' +
    '<input id="textInput" class="input-box" type="text" name="msg"' +
    "placeholder=\"Tap 'Enter' to send a message\">" +
    "<p></p>" +
    "</div>" +
    '<div class="chat-bar-icons">' +
    '<i id="chat-icon" style="color: crimson;" class="fa fa-fw fa-heart"' +
    'onclick="heartButton()"></i>' +
    '<i id="chat-icon" style="color: #333;" class="fa fa-fw fa-send"' +
    'onclick="sendButton()"></i>' +
    "</div>" +
    "</div>" +
    '<div id="chat-bar-bottom">' +
    "<p></p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  firstBotMessage();
  var coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

  // Press enter to send a message
  $("#textInput").keypress(function (e) {
    if (e.which == 13) {
      getResponse();
    }
  });
}

function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  return time;
}

// Gets the first message
function firstBotMessage() {
  let firstMessage = "Welcome to Tech to the Moon. How can I help you today?";
  document.getElementById("botStarterMessage").innerHTML =
    '<p class="botText"><span>' + firstMessage + "</span></p>";

  let time = getTime();

  $("#chat-timestamp").append(time);
  document.getElementById("userInput").scrollIntoView(false);
}

// Retrieves the response
function getHardResponse(userText) {
  let botResponse = getBotResponse(userText);
  let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";
  $("#chatbox").append(botHtml);

  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
  let userText = $("#textInput").val();

  if (userText == "") {
    userText = "Please enter in a message.";
  }

  let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  setTimeout(() => {
    getHardResponse(userText);
  }, 1000);
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
  let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  //Uncomment this if you want the bot to respond to this buttonSendText event
  // setTimeout(() => {
  //     getHardResponse(sampleText);
  // }, 1000)
}

function sendButton() {
  getResponse();
}

function heartButton() {
  buttonSendText("❤");
}
