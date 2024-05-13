class InteractiveChatbox {
  constructor(floatingButton, chatWindow, sendButton, icons) {
    this.floatingButton = floatingButton;
    this.chatWindow = chatWindow;
    this.sendButton = sendButton;
    this.icons = icons;
    this.openState = false;
  }

  init() {
    this.floatingButton.addEventListener("click", () => {
      this.toggleState(this.chatWindow);
    });

    const messageInput = this.chatWindow.querySelector("input[type='text']");

    // Add event listener for key press on message input
    messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        // Trigger click event on sendButton
        this.sendButton.click();
      }
    });

    this.sendButton.addEventListener("click", () => {
      const message = messageInput.value;
      if (message.trim() !== "") {
        this.displayVistorReply(message, "visitor");
        messageInput.value = ""; // Clear input field after sending message

        this.mockOperatorReply();
      }
    });
    this.scrollToBottom();
  }

  initOperatorMessage() {
    if (!this.isMessageListEmpty()) return;
    this.displayTypingMessage(); // Display typing indicator
    setTimeout(() => {
      this.displayOperatorReply("Hi, how can I help you?"); // Simulate operator's reply after a delay
    }, 1000); // Adjust the delay as needed
  }

  mockOperatorReply() {
    // Mock Operator Reply
    this.displayTypingMessage(); // Display typing indicator
    setTimeout(() => {
      this.displayOperatorReply("Operator's reply"); // Simulate operator's reply after a delay
    }, 1500); // Adjust the delay as needed
  }

  displayTypingMessage() {
    const typingMessage = { message: "", sender: "typing" };
    this.displayMessage(typingMessage);
  }

  displayOperatorReply(message) {
    // Find the typing message element
    const typingMessageElement = this.chatWindow.querySelector(
      ".messages__item--typing"
    );
    if (typingMessageElement) {
      // Remove the typing message element
      typingMessageElement.remove();
    }
    const operatorReply = { message, sender: "operator" };
    this.displayMessage(operatorReply);
  }

  displayVistorReply(message, sender) {
    const newMessage = { message, sender, timestamp: new Date().toISOString() };
    this.displayMessage(newMessage);
  }

  displayMessage(message) {
    const chatboxMessages = this.chatWindow.querySelector(".chatbox__messages");

    // Create a new message element
    const messageElement = document.createElement("div");
    messageElement.classList.add("messages__item");

    // Set the appropriate class based on the sender of the message
    if (message.sender === "visitor") {
      messageElement.classList.add("messages__item--visitor");
    } else if (message.sender === "operator") {
      messageElement.classList.add("messages__item--operator");
    } else if (message.sender === "typing") {
      messageElement.classList.add("messages__item--typing");
      // Add typing indicator dots
      messageElement.innerHTML = `
        <span class="messages__dot"></span>
        <span class="messages__dot"></span>
        <span class="messages__dot"></span>`;
    }

    // Set the content of the message element
    if (message.sender !== "typing") {
      messageElement.textContent = message.message;
    }

    setTimeout(() => {
      messageElement.style.opacity = 1;
    }, 100); // Adjust the delay as needed

    // Append the message element to the chatbox
    chatboxMessages.appendChild(messageElement);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatboxMessages = this.chatWindow.querySelector(".chatbox__messages");
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
  }

  toggleState(chatWindow) {
    this.openState = !this.openState;
    this.showOrHideChatBox(chatWindow, this.floatingButton);
  }

  isMessageListEmpty() {
    const chatboxMessages = this.chatWindow.querySelector(".chatbox__messages");
    return !chatboxMessages || !chatboxMessages.children.length;
  }

  showOrHideChatBox(chatWindow, floatingButton) {
    if (this.openState) {
      chatWindow.classList.add("chatbox--active");
      this.toggleIcon(true, floatingButton);
      this.initOperatorMessage();
    } else if (!this.openState) {
      chatWindow.classList.remove("chatbox--active");
      this.toggleIcon(false, floatingButton);
    }
  }

  toggleIcon(openState, floatingButton) {
    const { isClicked, isNotClicked } = this.icons;
    // let b = floatingButton.children[0].innerHTML;

    if (openState) {
      floatingButton.children[0].innerHTML = isClicked;
    } else if (!openState) {
      floatingButton.children[0].innerHTML = isNotClicked;
    }
  }
}
