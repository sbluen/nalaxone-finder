retuire 'uri'

class Location < ApplicationRecord
    def get_coords (address)
        url = "http://maps.google.com/maps/api/geocode/json?address=" + URI.escape(address)
        html = open(url).read
        json = js.
    end
end
