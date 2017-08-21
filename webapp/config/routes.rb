Rails.application.routes.draw do
  resources :locations
  root to: 'visitors#index'
  devise_for :users
  resources :users
end
