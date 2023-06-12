const socket = io('http://localhost:8000');

const form = document.getElementById('send-form');
const msgInput = document.getElementById('MassageInput');
const messageContainer = document.querySelector(".chat-container");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right-message')
    socket.emit('send', message);
    msgInput.value = ""
})

const append = (message, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement);

}


const Username = prompt("Enter your Name to join");
socket.emit('new-user-joined', Username);

socket.on('user-Joined', Username => {
    append(`${Username} Joined the Chat`, 'rightMessage_black');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left-message');
});

socket.on('left', uName => {
    append(`${uName} Left the Chat`, 'left-message_black');
})