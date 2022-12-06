////////////////////////////////////////////////////////////////////
//                                                                //
//                   Variable Initialization                      //
//                                                                //
////////////////////////////////////////////////////////////////////

const url = 'https://gik2f8-labs.herokuapp.com/books';                      // The URL for the HerokuApp API for the book list.


////////////////////////////////////////////////////////////////////
//                                                                //
//                     API Handling Methods                       //
//                                                                //
////////////////////////////////////////////////////////////////////

/**
 * Grabs the full list of books from the API.
 * 
 * @returns Returns the full list of books provided by the API
 */
async function getBooksFromAPI() {                                        
  const result = await fetch(url)                                           // Attempts to fetch the data from the API.
    .then((result) => result.json())                                        // If the fetch was successful then return the data in JSON-format.
    .catch((e) => console.log(e));                                          // If it errors then catch it and log it.
  return result;                                                            // Returns the result.
}

/**
 * Grabs a book from the API by using the Book ID.
 * 
 * @param {*} id The ID of the book represented as an Integer.
 * @returns Returns the JSON-formatted Data from the API for the given Book ID.
 */
async function getBookByID(id) {
    var baseURL = url + ('/' + id.toString());                             // Adds on the id to create a request url to get the data for that specific book.
    return await fetch(baseURL).then((result) => result.json());;           // Attempts to fetch the data, if successful it returns the JSON-formatted data for the book.
}
