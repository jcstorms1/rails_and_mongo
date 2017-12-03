200.times do
  book = Book.new(title: Faker::Book.title,
            author: Faker::Book.author,
            description: Faker::Company.catch_phrase,
            genre: Faker::Book.genre,
            isbn: Faker::Code.isbn,
            publisher:  Faker::Book.publisher)


      book.reviews << Review.new(content: Faker::Hipster.sentence)
      book.save
end
