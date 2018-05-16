$(document).ready(function() {
    $('.recalculate').focusout(populate_location);
})

var haveMarker;
var myInputMap;
var marker;

function populate_location(){
    console.log("populating locations");
    location_lat = document.getElementById("location_lat").value;
    location_lng = document.getElementById("location_long").value;
    location_address = document.getElementById("location_address").value;

    if ((location_lat == "" || location_lng == "") && location_address != ""){
        
        url = "https://maps.googleapis.com/maps/api/geocode/json?address="+location_address+"&key=AIzaSyDBLeP9o1BoS64HMhqozdAyEMYjADcxQNA";

        $.getJSON(url, function(data){
            if (data.results.length == 0){
                //no matching address
                console.log("no matching address");
                document.getElementById("location_lat").value = "";
                document.getElementById("location_long").value = "";
                return;
            };
            console.log("setting coordinates");
            location_lat = data.results[0].geometry.location.lat;
            location_lng = data.results[0].geometry.location.lng;
            document.getElementById("location_lat").value = location_lat;
            document.getElementById("location_long").value = location_lng;
        });
    }

    else if ((location_lat != "" && location_lng != "") && location_address == ""){
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
            +parseFloat(location_lat)+","+parseFloat(location_lng)
            +"&key=AIzaSyDBLeP9o1BoS64HMhqozdAyEMYjADcxQNA";
        $.getJSON(url, function(data){
            if (data.results.length == 0){
                //no matching address
                console.log("no matching address");
                document.getElementById("location_address").value = "";
                return;
            };
            location_address = data.results[0].formatted_address;
            document.getElementById("location_address").value = location_address;
        });
    }
    if (haveMarker){
        marker.setMap(null);
        haveMarker = false;
    }
    marker = new google.maps.Marker({
        position: {lat: parseFloat(location_lat), lng: parseFloat(location_lng)},
      map: myInputMap,
      title: 'Selected position',
    });
    haveMarker = true;
}

//Using code derived from google api
function initInputMap(){
    var myLatlng = {lat: 37.4220, lng: -122.0841};
    myInputMap = new google.maps.Map(document.getElementById('formMap'), {
        zoom: 4,
        center: myLatlng
    });
    haveMarker = false;
    myMap.addListener('click', function(e){
        if (haveMarker){
            marker.setMap(null);
            haveMarker = false;
        }
        marker = new google.maps.Marker({
          position: e.latLng.toJSON(),
          map: myInputMap,
          title: 'Selected position',
        });
        haveMarker = true;
        var location_lat = marker.getPosition().lat();
        var location_lng = marker.getPosition().lng();
        document.getElementById("location_lat").value = location_lat
        document.getElementById("location_long").value = location_lng
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+location_lat+","+location_lng+"&key=AIzaSyDBLeP9o1BoS64HMhqozdAyEMYjADcxQNA";
        $.getJSON(url, function(data){
            if (data.results.length == 0){
                //no valid results
                document.getElementById("location_address").value = "";
                return;
            }
            location_address = data.results[0].formatted_address;
            document.getElementById("location_address").value = location_address;
        });
    })
}

//Using code derived from google api
function initIndexMap(){
    var myLatlng = {lat: 37.4220, lng: -122.0841};
    var myIndexMap = new google.maps.Map(document.getElementById('indexMap'), {
        zoom: 4,
        center: myLatlng
    });
    url = "/locations.json";
    $.getJSON(url, function(data){
        if (data.length == 0){
            //no valid results
            document.getElementById("location_address").value = "";
            return;
        }
        for (var i=0; i<data.length; i++){
            var indexMarker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i]["lat"], data[i]["long"]),
                map: myIndexMap,
                title: data[i]["contents"],
            })
        }
    }); 
}

