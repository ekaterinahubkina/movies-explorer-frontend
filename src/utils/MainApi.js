class MainApi {
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

    register({ name, password, email }) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, password, email })
        })
            .then(this._getResponseData);
    }

    login({ password, email }) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
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
                email: data.email
            })
        })
            .then(this._getResponseData)
            .catch(err => console.log(err))
    }

    getSavedMovies() {
        return fetch(`${this.url}/movies`, {
            headers: {
                authorization: this.getToken()
            }
        })
            .then(this._getResponseData);
    }

    addMovieToSaved(data) {
        return fetch(`${this.url}/movies`, {
            method: 'POST',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: data.country || 'Не указано',
                director: data.director || 'Не указано',
                duration: data.duration || 'Не указано',
                year: data.year || 'Не указано',
                description: data.description || 'Не указано',
                image: `https://api.nomoreparties.co${data.image.url}` || 'Не указано',
                trailerLink: data.trailerLink || 'Не указано',
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` || 'Не указано',
                movieId: data.id,
                nameRU: data.nameRU || 'Не указано',
                nameEN: data.nameEN || 'Не указано',
            })
        })
            .then(this._getResponseData);
    }

    deleteFromSaved(data) {
        return fetch(`${this.url}/movies/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData);
    }

    tokenCheck() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        })
            .then(this._getResponseData)
    }
}

//const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
const mainApi = new MainApi({
    url: 'https://api.movies.hubkina.nomoredomains.work',
});

export default mainApi;
