class Book
  include Mongoid::Document
  embeds_many :reviews
  field :title, type: String
  field :author, type: String
  field :description, type: String
  field :genre, type: String
  field :isbn, type: String
  field :publisher, type: String
end
