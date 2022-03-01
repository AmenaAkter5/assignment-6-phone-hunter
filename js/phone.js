

// 1. search Phone function

const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;

    // clear the search box
    // searchBox.value = '';

    // get the API as Search Text
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;


    // load phones data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}


// 2. display search result function

const displaySearchResult = (phones) => {
    // clear previous search result
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.textContent = '';

    // clear previous phone Details
    const phoneDetails = document.getElementById('phn-details');
    phoneDetails.textContent = '';

    // if no result is shown
    if (phones.length === 0) {
        const noResult = document.getElementById('no-result');
        noResult.style.display = 'block';
        return;
    }

    // to get the search result will not more than 20
    const phoneSliced = phones.slice(0, 20);

    // for-each
    phoneSliced.forEach(phone => {

        // create card for phone results
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top p-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                    <h5 class="card-title">Brand: <span class="fw-bold">${phone.brand}</span></h5>
                    <button class="mt-3 mb-1 btn btn-success fw-bold" onclick="loadPhoneDetail('${phone.slug}')">Details</button>
                </div>
            </div>
        `;

        searchResultDiv.appendChild(div);
    })
}


// 3. Load Phone Detail function

const loadPhoneDetail = phoneId => {
    // get the API by click on single phone button
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    // get phone data
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneById(data.data))
}



// 4. Display Phone Detail function

const displayPhoneById = (phone) => {
    console.log(phone);
    const phoneDetails = document.getElementById('phn-details');

    // clear previous phone Details
    phoneDetails.textContent = '';

    // create card for phone details
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="row">
            <div class="col col-lg-8 mx-auto">
                <img src="${phone.image}" class="card-img-top p-2" alt="...">
            </div>
        </div>
            <div class="card-body">
                <h5 class="card-title fw-bold text-center">${phone.name}</h5>
                <h6 id="release-date" class="card-text text-center">${phone.releaseDate}</h6>
                <h6 class="card-text text-center mb-4">Brand: <span class="text-success fw-bold">${phone.brand}</span></h6>
                <h6 class="card-text fw-bold">Main Features:</h6>
                <ul id="main-features"></ul>
                <h6 class="card-text fw-bold">Others:</h6>
                <ul id="others"><span id="li-text"></span></ul>
            </div>
    `;
    phoneDetails.appendChild(div);

    // if release date is not available
    const releaseDate = document.getElementById('release-date');
    if (phone.releaseDate === "") {
        releaseDate.innerText = 'Release date is not available';
        releaseDate.style.color = 'red';
    }

    // create main features list
    const mainFeaturesUl = document.getElementById('main-features');
    const features = phone.mainFeatures;
    for (const feature in features) {
        const li = document.createElement('li');
        li.innerText = `${feature}- ${features[feature]}`;
        mainFeaturesUl.appendChild(li);
    }

    // create others list
    const othersUl = document.getElementById('others');
    const others = phone.others;
    for (const other in others) {
        const li = document.createElement('li');
        li.innerText = `${other}- ${others[other]}`;
        othersUl.appendChild(li);
    }
}

