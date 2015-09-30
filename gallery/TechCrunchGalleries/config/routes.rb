Rails.application.routes.draw do

    
  # Gallery Index
  get '/', :to => 'gallery#index'
  
  # Gallery Page
  get '/gallery/:gallery_slug/', :to => 'gallery#show'
  get '/gallery/:gallery_slug', :to => 'gallery#show'

end
