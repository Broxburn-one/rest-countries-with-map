var zoom = 6;

window.onload = function () {
    var url = 'https://restcountries.eu/rest/v1'
    var request = new XMLHttpRequest();
           //--------------------------------------------new
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            main(countries);
        }
    }
        request.send(null);
};

var main = function (countries) {
    populateSelect(countries);
    var cached = localStorage.getItem("selectedCountry");
    var selected = countries[0];
    if(cached){
        selected = JSON.parse(cached);
        document.querySelector('#countries').selectedIndex = selected.index;
    }
    updateDisplay(selected); 
    displayMap(selected);           //---------------------------- new
    document.querySelector('#info').style.display = 'block';
}

var populateSelect = function (countries) {
    var parent = document.querySelector('#countries');
    countries.forEach(function (item, index) {
        item.index = index;
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (e) {
        var index = this.options[this.selectedIndex].value;
        var country = countries[index];
// country here has the whole whack, incl lat and long ------------------
        updateDisplay(country);
        displayMap(country);   //--------------------------------------------------------new
        localStorage.setItem("selectedCountry",JSON.stringify(country));
        
    }, false);
}

var updateDisplay = function (country) {
    var tags = document.querySelectorAll('#info p');
    tags[0].innerText = "Country:    " + country.name;
    tags[1].innerText = "Population: " + country.population;
    tags[2].innerText = "Capital:    " + country.capital;
}

var displayMap = function(country) {
    var lat = country.latlng[0];
    var lng = country.latlng[1];
    var info = "Region: " + country.region;
    var center = {lat: lat, lng: lng};
    var map = new Map(center, zoom);
    map.addMarker( { lat:lat, lng: lng }) ;
    map.bindClick();
    map.addInfoWindow( center, info); 
}

//  "region": "Europe",

// map.addInfoWindow( center, 'My Info Window');