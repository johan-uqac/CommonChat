const API_URL = 'kevin-chapron.fr:8080'
const LOGIN_ENDPOINT = '/login'
const MESSAGES_ENDPOINT = '/messages'
const WS_ENDPOINT = '/ws'
const MY_UQAC_CODE = 'CHRJ14030300'

function request(endpoint, method, header, body) {
    return fetch(
        "http://" + API_URL + endpoint,
        {
            method: method,
            headers: header,
            body: body
        }
    )
}

async function login() {
    const body = JSON.stringify({
        Code: MY_UQAC_CODE,
    })

    const header = {
        'Content-Type': 'application/json'
    }

    return request(LOGIN_ENDPOINT, 'POST', header, body)
}

async function getMessages(token) {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + token
    }

    return request(MESSAGES_ENDPOINT, 'GET', header, null)
}