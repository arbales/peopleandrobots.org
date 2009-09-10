require 'dm-core'
require 'dm-validations'
require 'dm-timestamps'
require 'dm-aggregates'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3:///#{Dir.pwd}/ppr.db")
##DataMapper.setup(:search, :adapter)

class Person
  include DataMapper::Resource
  property :id,         Serial
  property :full_name,  String, :nullable => false
  property :email,      String
  property :affiliation, String
  property :bio,          Text
end

DataMapper.auto_upgrade!