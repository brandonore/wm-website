let map,
    bluePin,
    shopName,
    data;
let latitude,
    longitude = null;

// Array of stores and their google maps coordinates
var shops = [
    {name: 'Allgreens', lat: 39.728782, lon: -104.999745},
    {name: 'Trill Alternatives', lat: 40.019464, lon: -105.275255},
    {name: 'Canna Botica', lat: 39.720963, lon: -105.013522},
    {name: 'Elevations', lat: 38.951448, lon: -104.800673},
    {name: 'Dankery', lat: 38.885426, lon: -104.830743},
    {name: 'Top Shelf', lat: 38.850572, lon: -104.686118},
    {name: 'Cannibicare', lat: 38.850572, lon: -104.686118}
]

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.728782, lng: -104.999745},
        zoom: 8
    });
    bluePin = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/micons/blue-dot.png');
}

const populateStoreList = () => {
    // sort by name
    shops.sort((a, b) => {
        let nameA = a.name.toUpperCase(); 
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    for(let i = 0; i < shops.length; i++) {
        $('.store-list').append("<li><button>" + shops[i].name + "</button></li>");
    }
    // set shop name and call findShop()
    $('button').click(function() {
        shopName = $(this).text();
        console.log(shopName);
        findShop(shops, shopName);
        console.log(latitude, longitude);
        updateMap();
    });
}

// Loop through shops and set lat, lon based on which shop is clicked
const findShop = (arr, val) => {
    for(let i = 0; i < shops.length; i++) {
        if(arr[i].name === val) {
            latitude = arr[i].lat;
            longitude = arr[i].lon;
        }
    }
}

const updateMap = () => {
    const myLatLng = new google.maps.LatLng(latitude, longitude);
    console.log(myLatLng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 15
    });
    const marker = new google.maps.Marker({
        position: myLatLng,
        icon: bluePin,
        map: map
    });
    const infoWindow = new google.maps.InfoWindow();
    ((marker, data) => {
        google.maps.event.addListener(marker, 'click', (e) => {
            infoWindow.setContent(data);
            infoWindow.open(map, marker);
        });
    })(marker, data);
    google.maps.event.trigger(marker, 'click', {});
}

populateStoreList();
