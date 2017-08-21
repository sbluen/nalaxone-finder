json.extract! location, :id, :contents, :status, :lat, :long, :address, :posterid, :created_at, :updated_at
json.url location_url(location, format: :json)