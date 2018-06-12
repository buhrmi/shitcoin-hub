Rails.application.routes.draw do
  
  get 'me', to: 'users#show'

  resources :authorizations
  resources :users
  resources :assets

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
