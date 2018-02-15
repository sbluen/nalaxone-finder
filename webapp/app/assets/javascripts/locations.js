$(document).ready(function() {
    $.getScript("https://maps.googleapis.com/maps/api/js");
    $('.recalculate').focusout(populate_location);
})

function populate_location(){
    location_lat = document.getElementById("location_lat").value;
    location_long = document.getElementById("location_long").value;
    location_address = document.getElementById("location_address").value;

    if ((location_lat == "" || location_long == "") && location_address != ""){
        
        console.log("coordinates should be set here")
    }

    if ((location_lat != "" && location_long != "") && location_address == ""){
        console.log("address should be set here");   
    }

}


//Using code derived from google api
function initMap(){
    var myLatlng = {lat: 37.4220, lng: -122.0841};
    var map = new google.maps.Map(document.getElementById('formmap'), {
        zoom: 4,
        center: myLatlng
    });
    var haveMarker = false;
    var marker
    map.addListener('click', function(e){
        if (haveMarker){
            marker.setMap(null);
        }
        marker = new google.maps.Marker({
          position: e.latLng,
          map: map,
          title: 'Selected position'
        });
    })
}

