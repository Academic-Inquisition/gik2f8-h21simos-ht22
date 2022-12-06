const BookListItem = (book) => { // Lambda-function which takes in a book.
  // sets a variable called 'html' with some default tailwind classes and a default raw HTML string of the book author name and book title, divided by a single dash and two spaces.
  let html = `
    <li id=listItem class="book-list__item mb-2 mx-2 last:mb-0 p-3 text-indigo-900 last:border-b-0 border-b border-indigo-700 cursor-pointer">
      <p class="pb-2">${book.author} - ${book.title}</p>
    </li>`;
  return html; // Returns the html string.
};
