var map;
var service;
var infowindow;
var request;
var tempe;
var placedmarkers = [];
var placesList;

function initMap() {
    tempe = new google.maps.LatLng(33.427204, -111.939896);
    infowindow = new google.maps.InfoWindow();
    placesList = document.getElementById("places");

    map = new google.maps.Map(
        document.getElementById('map'), {center: tempe, zoom: 15});

    request = {
        keyword: 'pizza',
        location: tempe,
        radius: '500',
        type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log(results.length);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(place);
        }
    }
}



function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    var li = document.createElement("li");
    var placeName = "<img src='"+place.icon+"'width='20' height='20'>"+
        place.name + "</br> Rating:"+place.rating+" <br/>";

    li.innerHTML = placeName;
    li.className = "list-group-item";
    li.style.height = 50;
    //li.addEventListener("mouseout", markermouseout(marker, li, place.name));
    placesList.appendChild(li);
    placedmarkers.push(marker);

    google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
        li.style.backgroundColor = "lightblue";
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.setContent(place.name);
        infowindow.close(map, this);
        li.style.backgroundColor = "white";
    });

    li.addEventListener("mouseover", function () {
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
        li.style.backgroundColor = "lightblue";
    });
    li.addEventListener("mouseout", function () {
        infowindow.setContent(place.name);
        infowindow.close(map, marker);
        li.style.backgroundColor = "white";
    });

}


function searchNewQuery() {
    var x = document.forms["searchBar"]["queryString"].value;
    clearMarkers();
    request = {
        keyword: x,
        location: tempe,
        radius: '500',
        type: ['restaurant']
    };
    service.nearbySearch(request, callback);

}

function clearMarkers() {
    for (var i = 0; i < placedmarkers.length; i++) {
        placedmarkers[i].setMap(null);
    }
    placesList.innerHTML = "";
    placedmarkers = [];
}