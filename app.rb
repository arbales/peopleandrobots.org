require 'rubygems'
require 'sinatra'
require 'json'
require 'maruku'

load 'models.rb'

get '/' do
  erb :welcome
end

get '/projects' do
 erb :projects
end

get '/admin/person/add' do
  erb :person_add
end

get '/sponsors' do
  erb :sponsors
end

get '/people' do
  @people = Person.all
  erb :people
end

get '/admin/person/:person' do
  @person = Person.get(params[:person])
  erb :edit_person
end

post '/admin/person/add' do
  person = Person.new(:full_name => params[:full_name], :email => params[:email], :affiliation => params[:affiliation], :bio => params[:bio])
  if person.save
    content_type :json
    {:id => person.id}.to_json()
  else
    error('409', 'The user was not created correctly.')
  end
end

post '/affiliations/search' do
  @a = Affiliation.all(:name.like => params[:name])
  erb :affiliations_search
end

get '/md' do
  doc = Maruku.new("# Hello World
  How are you?")
  doc.to_html
end

get '/:route' do 
  erb :notfound
end