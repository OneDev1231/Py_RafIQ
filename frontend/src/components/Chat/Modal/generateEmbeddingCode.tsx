export const generateHTML = () => {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Chat System</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div id="chatButton">Open ChatBot</div>
  <div id="chatWindow">
    <div id="chatHeader">
      <span>Chat</span>
      <button id="closeButton">X</button>
    </div>
    <div id="chatLog"></div>
    <div id="chatBody">
      <div id="chatInput">
        <input type="text" id="messageInput" placeholder="Type your message" />
        <button id="sendButton">Send</button>
      </div>
    </div>
  </div>
  <script src="./script.js"></script>
</body>
</html>`;
};

export const generateCSS = () => {
  return `#chatButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0095ff;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
}

#chatWindow {
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: #fff;
  font-size: 16px;
  /* padding: 20px;  */
  border-radius: 20px 20px 10px 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  display: none;
}

#chatBody {
  margin: 20px
}

#chatHeader {
  display: flex;
  justify-content: space-between;
  background-color: #0095ff;
  border-radius: 20px 20px 0px 0px;
  color: white;
  padding: 20px;
  align-items: center;
  margin-bottom: 10px;
}

#chatHeader span {
  font-weight: bold;
}

#closeButton {
  font-size: 16px;
  color: white;
  padding: 0;
  border: none;
  background-color: #0095ff;
  outline: none;
  cursor: pointer;
}

#chatLog {
  height: 200px;
  overflow-y: auto;
  padding: 4px 12px;
  margin-bottom: 10px;
}

#chatInput {
  display: flex;
  border-radius: 5px;
  box-shadow: 2px 2px rgb(184, 184, 184);
}

#chatInput input {
  width: calc(100% - 80px);
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

#chatInput button {
  background-color: #0095ff;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.query {
  display: flex;
  flex-direction: row-reverse;
}
.query p {
  background-color: #0095ff;
  font-size: 14px;
  padding: 4px 10px;
  max-width: 180px;
  word-wrap: normal;
  color: white;
  border-radius: 5px;
}

.respond {
  display: flex;
  flex-direction: row;
}

.respond p {
  background-color: #ececec;
  max-width: 180px;
  word-wrap: normal;
  font-size: 14px;
  padding: 4px 10px;
  color: rgb(41, 41, 41);
  border-radius: 5px;
}`;
};

export const generateJavscript = ({
  roomId,
  token,
}: {
  roomId: string;
  token: string | null;
}) => {
  return `const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const chatHeader = document.getElementById("chatHeader");
const chatLog = document.getElementById("chatLog");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const closeButton = document.getElementById("closeButton");

let typing = undefined;

const appendRespond = (msg) => {
  if (typing) {
    chatLog.removeChild(typing);
    typing = undefined;
  }
  const chatBubble = document.createElement("div");
  chatBubble.className = "respond";

  const msgBox = document.createElement("p");
  msgBox.textContent = msg;
  chatBubble.appendChild(msgBox);
  chatLog.appendChild(chatBubble);

  return chatBubble;
};

const appendMyMessage = (msg) => {
  const chatBubble = document.createElement("div");
  chatBubble.className = "query";

  const msgBox = document.createElement("p");
  msgBox.textContent = msg;
  chatBubble.appendChild(msgBox);
  chatLog.appendChild(chatBubble);

  typing = appendRespond("...");
};

let isChatOpen = false;

function toggleChat() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatWindow.style.display = "block";
    messageInput.focus();
  } else {
    chatWindow.style.display = "none";
  }
}

let conversationId = undefined;

function sendMessage() {
  const message = messageInput.value.trim();
  if (message === "") {
    return;
  }
  const bot_id = ${roomId};
  const url =
    "https://rafiq.ai/api/message/?bot-id=" +
    bot_id +
    (conversationId ? "&conversation-id=" + conversationId : "");
  const token = "${token ?? ""}";
  const headers = {
    Authorization: "Token " + token,
  };
  const fd = new FormData();
  fd.append("query", message);

  appendMyMessage(message);

  messageInput.value = "";
  fetch(url, {
    method: "POST",
    headers: headers,
    body: fd,
  })
    .then((response) => response.json())
    .then((data) => {
      conversationId = data.conversation_id;
      appendRespond(data.data.response);
    })
    .catch((error) => console.error(error));
}

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
closeButton.addEventListener("click", toggleChat);
chatButton.addEventListener("click", toggleChat);`;
};
