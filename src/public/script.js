// Socket io on client side
const socket = io();

// Refer to chatbox.html & open it in browser to know what they represent
const usersList = document.querySelector(".users-name");
const chatForm = document.getElementById("message-form");
const messageInput = document.querySelector("#msg");
const messages = document.querySelector(".messages");

// Getting username from index.html, here qs is a library to parse querystring in url 
const {username} = Qs.parse(location.search, {ignoreQueryPrefix: true});

/////////////////////// IMPLEMENT BELOW STEPS //////////////////////

// Send username about "userJoin" to server 
socket.emit("userJoin", username);

// Listen for "updateUsers" from server and update usersList with new list of users, each user should be a li element containing username.
socket.on("updateUsers", (arr) => {
    usersList.innerHTML = arr.map(user => `<li>${user}</li>`).join("");
})
// Listen for "message" from server and add new msg to messages, each message is a div element with class "message" 
// containing 2 paragraphs, one with class "meta" containing username & other with class "text" containing message.
socket.on("message",(data) => {
    const newdiv = document.createElement('div');
    newdiv.classList.add("message");
    newdiv.innerHTML = `<p class="meta">${data.username}</p><p class="text">${data.message}</p>`;
    messages.appendChild(newdiv);
} )

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("chatMessage", {username, message: messageInput.value});
    messageInput.value = "";
})
// When a user submit a message in chatForm send {username: username, message: messageInput.value } about chatMessage to server 