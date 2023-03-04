console.log("socket io")

const username = document.getElementById("username")
const message = document.getElementById("text")
const actions = document.getElementById("actions")

message.addEventListener("keypress", function () {
    socket.emit('chat:typing', username.value);
});

const socket = io.connect();
const render = (data) => {
    const html = data.map((element, index) => {
        return (`
        <div class="message message-personal">
            <strong class="username">${element.author}</strong>:
            <i class="text-username">${element.text}</i>
        </div>
        `)
    }).join(' ')
    document.getElementById('messages').innerHTML = html
    actions.innerHTML = '';
}

socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

socket.on("chat:typing", function (data) {
    actions.innerHTML = `<p><span class="user-typing">${data}</span> esta escribiendo..</p>`
});

const addMessage = () => {
    const message = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    };
    socket.emit('new-message', message);
    return false
};

const element = document.getElementById('form')

element.addEventListener('click', (event) => {
    event.preventDefault();
    addMessage();
})