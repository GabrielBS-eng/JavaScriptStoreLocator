window.onload = () => {
    displayStores();
}

var map;
var markers = [];
var infoWindow;

function initMap() {
    var la =
    {
        lat: 34.063380,
        lng: -118.358080
    };
    var sydney =
    {
        lat: -33.863276,
        lng: 151.107977
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: la,
        zoom: 11,
        mapTypeId: 'roadmap',
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
    setOnClickListener();  
//    google.maps.event.trigger(markers[0], 'click');
}

function searchStores() {
    console.log("searching");
}

function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function (elem, index){
        elem.addEventListener('click', function (){
             google.maps.event.trigger(markers[index], 'click');
        })  
    })
}

function displayStores() {
    //stores.map(function(store,index))

    var storesHtml = '';

    for (var [index, store] of stores.entries()) {
        var address = store['addressLines'];
        var phone = store['phoneNumber'];

        storesHtml += ` 
            <div class="store-container">
                    <div class="store-info-container">

                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">
                            ${++index}
                        </div>
                    </div>

                </div>
            </div>
        `

        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

function showStoresMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for (var [index, store] of stores.entries()) {

        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]['longitude']);

        var name = store["name"];
        var address = store["addressLines"][0];
        var openStatusText = store["openStatusText"];
        var phoneNumber = store["phoneNumber"];

        bounds.extend(latlng);
        createMarker(latlng, name, address, openStatusText, phoneNumber, ++index)
    }
    map.fitBounds(bounds);

}

function createMarker(latlng, name, address, openStatusText, phoneNumber, index) {
    var html = `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-status">
                ${openStatusText}
            </div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-location-arrow"></i>
                </div>
                ${address}
            </div>
            <div class="store-info-phone">
                <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                </div>
                ${phoneNumber}
            </div>
        </div>
    `;

     //   "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}
