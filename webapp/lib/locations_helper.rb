require 'open-uri'
require 'json'

#Returns the coordinates, given the address.
#Addresses automatically become url encoded in this function
def get_coords(address)
   file = open("https://maps.googleapis.com/maps/api/geocode/json?address=#{URI.escape(address)}")
   contents = file.read()
   hash = JSON.parse(contents)
   lat = hash["results"][0]["geometry"]["location"]["lat"]
   lng = hash["results"][0]["geometry"]["location"]["lng"]
   return [lat, lng]
end

