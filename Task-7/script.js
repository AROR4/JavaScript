const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

const autoReplies = [
  "Hello! How are you?",
  "That sounds good.",
  "Can you tell me more?",
  "Nice to hear from you."
];


chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();

  if (!message) {
    return;
  }

  addMessage(message, "sent");
  messageInput.value = "";

  setTimeout(() => {
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    addMessage(randomReply, "received");
  }, 1000);
});

function addMessage(text, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);

  const messageText = document.createElement("p");
  messageText.classList.add("message-text");
  messageText.textContent = text;

  const messageTime = document.createElement("span");
  messageTime.classList.add("message-time");
  messageTime.textContent = getCurrentTime();

  messageElement.appendChild(messageText);
  messageElement.appendChild(messageTime);
  chatWindow.appendChild(messageElement);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
