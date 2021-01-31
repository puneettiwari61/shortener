Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/links/:slug' => "links#show"
  patch '/links/:slug' => "links#update"
  resources :links, only: %i[index create]
  root "home#index"
  get "*path", to: "home#index", via: :all
end
