"use strict";

////////////////////////////////////////////////////////////////////
//                                                                //
//                   Variable Initialization                      //
//                                                                //
////////////////////////////////////////////////////////////////////

let bookList = [];                                                            // Array used to store the list of books that's acquired from the API.
let bookData = {};                                                            // Dictionary used to store the Data of a specific book.
let filteredList = [];                                                        // Array used to store the filtered book list.

////////////////////////////////////////////////////////////////////
//                                                                //
//            Static BookList API-Call & Event Setup              //
//                                                                //
////////////////////////////////////////////////////////////////////

/**
 * Statically calls getAll() on script load.
 * This will make it so when the script initializes, it grabs the books provided by the api and stores them to the "bookList" variable.
 */
getBooksFromAPI().then((apiBooks) => (bookList = apiBooks));                  // Attempts to grab the full set of books from the API, if it succeeds then store it to the "bookList" Array.

/**
 * Whenever the window loads / reloads, update the list of books from the API to the variable.
 */
window.addEventListener("load", () => {
  getBooksFromAPI().then((apiBooks) => (bookList = apiBooks));                // Attempts to grab the full set of books from the API, if it succeeds then store it to the "bookList" Array.
});

////////////////////////////////////////////////////////////////////
//                                                                //
//          Render Function + Search Field Updater                //
//                                                                //
////////////////////////////////////////////////////////////////////

/**
 * This method takes in the filtered books, it uses this list of books to handle removal and creation of the search-list object.
 * Providing our site with a new rendered view of the books filtered by the user inputs.
 * 
 * @param {*} books         The passed list of books to render. 
 */
function renderBookList(books) {
  filteredList = books;                                                       // Sets the stored filteredList to the passed in filtered booklist.
  const root = document.getElementById("root");                               // Gets the element in the document with the id 'root'.
  const existingBookList = document.getElementById("search-list");            // Gets the element in the document with the id 'search-list'.
  if (existingBookList) {                                                     // Checks if the search-list element already exists.
    root.removeChild(existingBookList);                                       // If it does then remove it.
  }
  if (books.length > 0 && searchField.value) {                                // If the filtered list has elements and search field isn't empty.
    root.insertAdjacentHTML("beforeend", BookList(books));                    // Then insert a new BookList into the root html.
  }
}

/**
 * Grabs the searchField Element Node from the document by usign the id of 'searchField'
 */
const searchField = document.getElementById("searchField");                   // Grabs the Element Node for the element tagged with the id 'searchField'

/**
 * Sets up the Search Field handling.
 * Checking the currently acquired API book list so that either the title or author's name contains the current search string. 
 */
searchField.addEventListener("keyup", (e) =>
  renderBookList(                                                             // Calls "renderBookList" passing in a filtered list based on the below.
    bookList.filter(({ title, author }) => {                                  // Filters the currently stored bookList.
      const searchTerm = e.target.value.toLowerCase();                        // Grabs the searchTerm into Lower-Case from the searchField.
      return (                                                                // Returns true for the filter-check if:
        title.toLowerCase().indexOf(searchTerm) >= 0 ||                       //    - The Title contains the searchTerm at any position.
        author.toLowerCase().indexOf(searchTerm) >= 0                         //    - The Authors Name contains the searchTerm at any position.
      );
    })
  )
);

////////////////////////////////////////////////////////////////////
//                                                                //
//                    Book Detail Handling                        //
//                                                                //
////////////////////////////////////////////////////////////////////

/**
 * Adds an EventListener for if you mouse-over a book list element to display detailed information.
 */
document.body.addEventListener("mouseover", (e) => {
  renderBookDetails(e.target, filteredList);                                  // Calls the renderBookDetails with the event target and the filteredList.
});

/**
 * Method used to render the details of the hovered book.
 * 
 * @param {*} element       The passed event target element.
 * @param {*} filteredList  The passed stored filtered list of books. 
 */
async function renderBookDetails(element, filteredList) {
  if (element.id === "listItem") {                                            // Checks if the id of the hovered element is 'listItem' indicating it's a book in the list.
    let details = document.createElement("li");                               // Create a new 'details' element of type '<li></li>'
    let index = Array.from(element.parentElement.children).indexOf(element);  // Grabs the index of the book in the list, for later use.
    element.appendChild(details);                                             // Appends the "details" child to the list element.
    for (let i = 0; i < bookList.length; i++) {                               // For each i in range 0 to the length of the bookList.
      if (bookList[i]["title"] === filteredList[index]["title"]) {            // If the titels bettween the i acquired Book and the indexed position Book match:
        await getBookByID(i + 1).then((apiData) => (bookData = apiData));     //    - Then grab the book by ID from the API [Incrementing the ID by 1 since the book IDs start at 1 in the API]
        details.innerHTML = DetailedBookListItem(bookData);                   //    - Sets the 'details' elements innerHTML to the DetailedBookListItem components return.
      }
    }
    root.addEventListener("mouseout", (e) => {                                // Creates a 'mouseout' bubbling EventListener.
      let element = e.target;                                                 // Grabs the event target element.
      if (element.id === "listItem") {                                        // If the elements id is 'listItem' indicating it's a book in the list.
        let details = element.children[0];                                    // Grab the first internal child element
        if (details) {                                                        // If it exists: 
          element.removeChild(details);                                       //    - Remove the child element.
        }
      }
    });
  }
}
