$(document).ready(function() {
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
