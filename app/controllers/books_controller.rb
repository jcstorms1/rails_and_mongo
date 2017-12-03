class BooksController < ApplicationController

  def index
    @books = Book.all.entries
    render json: @books
  end

  def update
    @book = Book.find_by(isbn: book_params[:isbn])
    @review = Review.new(content: params[:content])
    @book.reviews << @review
    if @book.save
      render json: @book
    else
      render json: {failures: @book.errors}
    end
  end

  private

  def book_params
    params.require(:book).permit(:isbn, :content)
  end
end
