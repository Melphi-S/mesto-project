const config = {
    url: "https://nomoreparties.co/v1/plus-cohort-13",
    headers: {
        "Content-type": "application/json",
        Authorization: "d90f9ef2-3b21-4d61-8241-cdaf11f1120f"
    }
}

function onResponce(res) {
    return res.ok ? res.json() : Promise.reject(res);
}

export function getUserInfo() {
    return fetch(`${config.url}/users/me`, {
        headers: config.headers
    })
        .then(onResponce)
}

export function getInitialCards() {
    return fetch(`${config.url}/cards`, {
        headers: config.headers
    })
        .then(onResponce)
}

export function editUserAvatar (userAvatar) {
    return fetch(`${config.url}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(userAvatar)
    })
        .then(onResponce)
}

export function editUserInfo(userInfo) {
    return fetch(`${config.url}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(userInfo)
    })
        .then(onResponce)
}

export function createNewCard(cardInfo) {
    return fetch(`${config.url}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(cardInfo)
    })
        .then(onResponce)
}

export function like(cardID) {
    return fetch(`${config.url}/cards/likes/${cardID}`, {
        method: "PUT",
        headers: config.headers,
        body: JSON.stringify(cardID)
    })
        .then(onResponce)
}