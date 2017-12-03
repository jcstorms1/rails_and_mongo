class BooksController < ApplicationController

  def index
    @books = Book.all.entries
    render json: @books
  end

  def custom_update(book_params)
    @book = Book.find_by(isbn: book_params[:isbn])
    @review = Review.new(content: book_params[:review])
    @book.reviews << @review
    if @book.save
      render json: @book
    else
      render json: {failures: @book.errors}
    end
  end

  private

  def book_params
    params.require(:book).permit(:isbn, :review)
  end
end
