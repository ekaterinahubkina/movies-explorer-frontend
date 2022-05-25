const filterMovies = (arr, str) => {
    const filteredMovies = arr.filter((item) => {
        const nameRuToLowerCase = item.nameRU.toLowerCase();
        const searchMessageToLowerCase = str.toLowerCase();
        return nameRuToLowerCase.includes(searchMessageToLowerCase);
    })
    return filteredMovies;
    // const filteredShortMovies = filteredMovies.filter((item) => item.duration <= 40);
    // return checkboxStatus ? filteredShortMovies : filteredMovies;
}



export default filterMovies;