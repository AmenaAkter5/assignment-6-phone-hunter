
// "no-result" message is hidden by default

const noResult = document.getElementById('no-result');
noResult.style.display = 'none';


// search Phone

const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;

    // clear the search box
    // searchBox.value = '';

    // get the API data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // load phones data

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}


// display search result

const displaySearchResult = (phones) => {
    const searchResultDiv = document.getElementById('search-result');
    // clear previous result
    searchResultDiv.textContent = '';

    // for-each
    phones.forEach(phone => {
        // console.log(phone);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                    <h5 class="card-title">Brand: <span class="fw-bold">${phone.brand}</span></h5>
                    <button class="mt-3 mb-1" onclick="loadPhoneDetail('${phone.slug}')">Details</button>
                </div>
            </div>
        `;
        searchResultDiv.appendChild(div);
    })
}


// load Phone Detail

const loadPhoneDetail = phoneId => {
    // console.log(phoneId);

    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    // get phone data
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneById(data.data))
}



// Display Phone Detail

const displayPhoneById = (phone, features) => {
    console.log(phone.mainFeatures);

    const phoneDetails = document.getElementById('phn-details');
    // clear previous phone Details
    phoneDetails.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="row">
            <div class="col col-lg-8 mx-auto">
                <img src="${phone.image}" class="card-img-top" alt="...">
            </div>
        </div>
            <div class="card-body">
                <h5 class="card-title fw-bold text-center">${phone.name}</h5>
                <h6 class="card-text text-center">${phone.releaseDate}</h6>
                <h6 class="card-text">Brand: <span class="fw-bold">${phone.brand}</span></h6>
                <p><span class="fw-bold">Main Features:</span></p>
                <ul id="features"></ul>
            </div>
    `;
    phoneDetails.appendChild(div);

    const mainFeaturesUl = document.getElementById('features');
    features = phone.mainFeatures;
    for (const feature in features) {
        // console.log(feature, features[feature]);

        const li = document.createElement('li');
        li.innerText = `${feature}- ${features[feature]}`;
        mainFeaturesUl.appendChild(li);
    }
}