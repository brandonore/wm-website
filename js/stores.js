/*---------------------------------------
* Initial variables
* ---------------------------------------*/
let map,
    bluePin,
    shopName,
    data;
let latitude,
    longitude = null;
let wholesale = [];

/*========================= Edit/Add shops here =========================*/
/**/ let shops = [
/**/     {name: 'Allgreens', lat: 39.728782, lon: -104.999745},
/**/     {name: 'Trill Alternatives', lat: 40.019464, lon: -105.275255},
/**/     {name: 'Canna Botica', lat: 39.720963, lon: -105.013522},
/**/     {name: 'Elevations', lat: 38.951448, lon: -104.800673},
/**/     {name: 'Dankery', lat: 38.885426, lon: -104.830743},
/**/     {name: 'Top Shelf', lat: 39.714415, lon: -104.987909},
/**/     {name: 'Cannibicare', lat: 38.850572, lon: -104.686118}
/**/ ]
/*========================= Edit/Add shops here =========================*/

/*---------------------------------------
* Functions
* ---------------------------------------*/
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
        getAddress();
    });
}

// Loop through shops and set lat, lon
const findShop = (arr, val) => {
    for(let i = 0; i < shops.length; i++) {
        if(arr[i].name === val) {
            latitude = arr[i].lat;
            longitude = arr[i].lon;
        }
    }
}

// find address and store in data var
const getAddress = () => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCvOIYQw1uwP8uhE9SAhIObDgOIP2pTyXI`;
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            let str = obj.results[0].formatted_address;
            str = str.replace(',', '<br />');
            data = `<b>${shopName}</b><br />${str}`;
            updateMap();
        })
        .catch((err) => {
            console.log(err);
        });
}

// update map on click and place marker
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

// call funcs
populateStoreList();

// get wholesale list from google sheets
// fetch('https://sheets.googleapis.com/v4/spreadsheets/1MF6zwwG2CzQLC6CZKjLQlbjtKwo2xRg0RFHFuJXfn7Q/?key=AIzaSyCvOIYQw1uwP8uhE9SAhIObDgOIP2pTyXI&includeGridData=true')
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         // console.log(data.sheets[0].data[0].rowData[3].values);
//         for(let i = 3; i < 24; i++) {
//             for(let x = 0; x < 5; x++) {
//                 console.log(data.sheets[0].data[0].rowData[i].values[x].formattedValue)
//             } 
//         }
//         console.log(wholesale);
//     });