$(document).ready(function() {
    $('.recalculate').focusout(populate_location);
})

function populate_location(){
    location_lat = document.getElementById("location_lat").value;
    location_long = document.getElementById("location_long").value;
    location_address = document.getElementById("location_address").value;

    if ((location_lat == "" || location_long == "") && location_address != ""){
        
        console.log("coordinates should be set here");
        url = "https://maps.googleapis.com/maps/api/geocode/json?address="+location_address;

        $.getJSON(url, function(data){
            location_lat = data.results[0].geometry.location.lat;
            location_long = data.results[0].geometry.location.lng;
            document.getElementById("location_lat").value = location_lat;
            document.getElementById("location_long").value = location_long;
        });
    }

    if ((location_lat != "" && location_long != "") && location_address == ""){
        console.log("address should be set here");
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+location_lat+","+location_long;
        $.getJSON(url, function(data){
            location_address = data.results[0].formatted_address;
            document.getElementById("location_address").value = location_address;
        });
    }

}

//Using code derived from google api
function initMap(){
    var myLatlng = {lat: 37.4220, lng: -122.0841};
    var myMap = new google.maps.Map(document.getElementById('formmap'), {
        zoom: 4,
        center: myLatlng
    });
    var haveMarker = false;
    var marker
    myMap.addListener('click', function(e){
        if (haveMarker){
            marker.setMap(null);
            haveMarker = false;
        }
        //console.log(map as google.maps.Map);
        marker = new google.maps.Marker({
          position: e.latLng.toJSON(),
          map: myMap,
          title: 'Selected position',
          visible: true
        });
        haveMarker = true;
        document.getElementById("location_lat").value = marker.getPosition().lat();
        document.getElementById("location_long").value = marker.getPosition().lng();
        populate_location();
    })
}

