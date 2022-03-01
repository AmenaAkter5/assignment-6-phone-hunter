
// no-result message is hidden by default
const noResult = document.getElementById('no-result');
noResult.style.display = 'none';


// search Phone

const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    // console.log(searchText);

    // clear the search box
    // searchBox.value = '';

    // get the API data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // load data

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}


// display search result

const displaySearchResult = (phones) => {
    // console.log(phones);

    const searchResultDiv = document.getElementById('search-result');

    // clear previous result
    searchResultDiv.textContent = '';

    // for-each
    phones.forEach(phone => {
        console.log(phone);
    })
}
