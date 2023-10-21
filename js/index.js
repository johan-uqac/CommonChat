let token;
let username;

async function init() {
    await login().then(response => response.json()).then(json => {
        token = json.Token
        username = json.Name
    });

    document.querySelector('.username').textContent = username

    const messages = await getMessages(token).then(response => response.json())
    messages.forEach(message => {
        addMessageToList(createMessage(message))
    })
    scrollToEnd()
    console.log("Loaded from server")
    console.table(messages)
}

init()

let websocket = new WebSocket("ws://" + API_URL + WS_ENDPOINT)

websocket.onopen = function () {
    websocket.send(JSON.stringify({
        auth: token
    }))
}

websocket.onmessage = function (event) {
    const message = JSON.parse(event.data)
    addMessageToList(createMessage(message))
    scrollToEnd()
    console.table(message, "received from server")
}

websocket.onclose = function () {
    addMessageToList(createMessage({
        From: 'Server',
        Text: 'La connexion avec le serveur a été perdue !',
        Date: new Date()
    }))
    alert('La connexion avec le serveur a été perdue !')
    console.log("Connection closed")
}

$(document).ready(function () {
    $('.message-input').keydown(function (event) {
        if (event.keyCode === 13) {
            sendMessage()
        }
    })

})

function sendMessage() {
    const textInput = document.querySelector('.message-input')
    const value = textInput.value

    if (value === '') {
        alert('Vous ne pouvez pas envoyer un message vide !')
        return
    }
    websocket.send(JSON.stringify({
        message: value
    }))
    console.log(value, "sent to server")
    textInput.value = ''
    scrollToEnd()
}