const floatingButton = document.querySelector(".chatbox__button");
const chatWindow = document.querySelector(".chatbox__support");
const sendButton = document.querySelector(".chatbox__send--footer");
const icons = {
  isClicked:
    '<img class="button-icon clicked-icon" src="./images/icons/icon-arrow-down.png" />',
  isNotClicked:
    '<img class="button-icon not-clicked-icon" src="./images/icons/icon-chat.png" />',
};
const chatbox = new InteractiveChatbox(
  floatingButton,
  chatWindow,
  sendButton,
  icons
);
// Run display to set the event listener in Chat.js
chatbox.init();
// Run toggleIcon to set the button icon
chatbox.toggleIcon(false, floatingButton);
