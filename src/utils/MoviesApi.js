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

    getMovies = () => {
        return fetch(`${this.url}`)
            .then(this._getResponseData);
    }
}

//const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;