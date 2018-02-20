require 'open-uri'
require 'json'

#Returns the coordinates, given the address.
#Addresses automatically become url encoded in this function
def get_coords(address)
   file = open("https://maps.googleapis.com/maps/api/geocode/json?address=#{URI.escape(address)}&key=AIzaSyARfm-3M5KppQjgGnHK1DIYt-GmG4eJqCI")
   contents = file.read()
   hash = JSON.parse(contents)
   lat = hash["results"][0]["geometry"]["location"]["lat"].to_f
   lng = hash["results"][0]["geometry"]["location"]["lng"].to_f
   return [lat, lng]
end

def get_address(lat, lng)
   url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=#{URI.escape(lat.to_s)},#{URI.escape(lng.to_s)}&key=AIzaSyARfm-3M5KppQjgGnHK1DIYt-GmG4eJqCI"
   file = open("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{URI.escape(lat.to_s)},#{URI.escape(lng.to_s)}&key=AIzaSyARfm-3M5KppQjgGnHK1DIYt-GmG4eJqCI")
   contents = file.read()
   hash = JSON.parse(contents)
   if hash["results"].size == 0 then
       #The address field should be left empty for nonexistent addresses.
       return ""
   else
       address = hash["results"][0]["formatted_address"]
       return address
   end
end
