class Review
  include Mongoid::Document
  embedded_in :books
  field :content, type: String
end
