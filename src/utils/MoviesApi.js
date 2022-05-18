class MoviesApi {
    constructor({ url }) {
        this.url = url;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

    }

    getToken = () => {
        return `Bearer ${localStorage.getItem('token')}`;
    }

    getMovies = () => {
        return fetch(`${this.url}`)
            .then(this._getResponseData);
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.getToken()
            }
        })
            .then(this._getResponseData);
    }

    editUserData(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData);
    }

    addNewCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData);
    }

    deleteMyCard(data) {
        return fetch(`${this.url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData);
    }

    changeLikeCardStatus(data, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this.url}/cards/${data._id}/likes`, {
            method,
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData);
    }

    editUserAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData);
    }
}

//const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;