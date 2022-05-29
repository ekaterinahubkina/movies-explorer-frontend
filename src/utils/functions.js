const filterMovies = (arr, str) => {
    const filteredMovies = arr.filter((item) => {
        const nameRuToLowerCase = item.nameRU.toLowerCase();
        const searchMessageToLowerCase = str.toLowerCase();
        return nameRuToLowerCase.includes(searchMessageToLowerCase);
    })
    return filteredMovies;
}



export default filterMovies;