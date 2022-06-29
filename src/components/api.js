const config = {
    url: "https://nomoreparties.co/v1/plus-cohort-13",
    headers: {
        "Content-type": "application/json",
        Authorization: "d90f9ef2-3b21-4d61-8241-cdaf11f1120f"
    }
}

function checkResponce(res) {
    return res.ok ? res.json() : Promise.reject(res);
}

export function getUserInfo() {
    return fetch(`${config.url}/users/me`, {
        headers: config.headers
    })
        .then(checkResponce)
}

export function getInitialCards() {
    return fetch(`${config.url}/cards`, {
        headers: config.headers
    })
        .then(checkResponce)
}

export function patchUserAvatar (userAvatar) {
    return fetch(`${config.url}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(userAvatar)
    })
        .then(checkResponce)
}

export function patchUserInfo(userInfo) {
    return fetch(`${config.url}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(userInfo)
    })
        .then(checkResponce)
}

export function postNewCard(cardInfo) {
    return fetch(`${config.url}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(cardInfo)
    })
        .then(checkResponce)
}

export function putLike(cardId) {
    return fetch(`${config.url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
        .then(checkResponce)
}

export function deleteLike(cardId) {
    return fetch(`${config.url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(checkResponce)
}

export function deleteCard(cardId) {
    return fetch(`${config.url}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(checkResponce) 
}