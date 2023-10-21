function createMessage(messageInfo) {
    let div = document.createElement('div')
    div.className = 'message'
    div.innerHTML = `
        <div class="message-date">[${formatDate(new Date(messageInfo.Date))}]</div>
        <div class="message-username">(${messageInfo.From})</div>
        <div class="message-content">${messageInfo.Text}</div>
    `;
    return div;
}

function addMessageToList(message) {
    document.querySelector('.messages-container').appendChild(message)
}

function scrollToEnd() {
    const messageDiv = document.querySelector('.messages-container')
    messageDiv.scrollTop = messageDiv.scrollHeight
}

function formatDate(date) {
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second

    return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
}