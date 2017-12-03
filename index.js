document.addEventListener("DOMContentLoaded", function (){

  function getBooks(){
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(displayBooks)

  }

  function displayBooks(books){
    let divList = document.getElementById('list')
    let divDetails = document.getElementById('details')

    divList.innerHTML = ""
    divDetails.innerHTML = ""

    books.forEach(book => {
      let newLi = document.createElement('li')

      newLi.id = book.isbn
      newLi.innerText = book.title

      newLi.addEventListener('click', () =>{
        divDetails.innerHTML = `
          <h3>${book.title}</h3>
          <h5>By: ${book.author}</h5>
          <textarea id='new-review-for-${book.isbn}'
          placeholder='Write a review...',
          rows="10", cols="50"></textarea><br>
          <button id='submit-review-${book.isbn}'>Submit Review</button>
          <br><br>
          <h4>Reviews For This Book:<h4>
          <ul class="box" id="reviews-for-${book.isbn}"></ul>
        `
        let revUl = document.getElementById(`reviews-for-${book.isbn}`)

        book.reviews.forEach(review => {
          let revLi = document.createElement('li')
          revLi.innerText = review.content
          revUl.append(revLi)
        })

        let revSubmit = document.getElementById(`submit-review-${book.isbn}`)
        let input = document.getElementById(`new-review-for-${book.isbn}`)

        revSubmit.addEventListener('click', () => {
          let submitLi = document.createElement('li')
          submitLi.innerText = input.value
          revUl.append(submitLi)

          fetch('http://localhost:3000/books/' + book._id.$oid, {
            method: 'put',
            headers: {
							'Content-Type': "application/json"},
            body: JSON.stringify( { isbn: book.isbn, content: input.value } )
          })
          .then(res => res.json())
        

          input.value= ""
        })
      })
      divList.appendChild(newLi)
    })
  }

  let booksButton = document.getElementById('see-books')
  booksButton.addEventListener("click", getBooks)
})
