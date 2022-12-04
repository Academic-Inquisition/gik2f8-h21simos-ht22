const BookList = (bookList) => {              // Lambda-function which takes in an array of books.
  let html = `<ul id=search-list class="book-list rounded-md border-2 border-blue-400 bg-white w-full mx-auto">`; // Creates the opening portion of the HTML string as an ul element with some default tailwind classes.
  for (let i = 0; i < bookList.length; i++) { // Loops over all of the elements in the passed bookList array. 
    html += BookListItem(bookList[i]);        // Adds on the HTML for the BookListItem to the HTML string.
  }
  html += `</ul>`;                            // Closes out the HTML string with </ul>
  return html;                                // Returns the finished HTML string.
};
