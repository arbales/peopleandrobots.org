require 'rubygems'
require 'sinatra'
require 'json'
require 'maruku'   
require 'haml'

# load 'models.rb'

helpers do
  def paper_link(caption, name)
    if (name != nil)
    "<a href='http://hcii.s3.amazonaws.com/ppr/papers/#{name}.pdf'>#{caption}</a>"
    else
      caption
    end
  end
end

get '/' do
  haml :welcome
end

get '/projects' do
 haml :projects
end

get '/people' do
  haml :static_people
end

get '/sponsors' do
  haml :sponsors
end

not_found do
  erb :notfound
end