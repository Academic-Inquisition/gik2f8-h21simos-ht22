const DetailedBookListItem= (book) => { // Lambda-function which takes in a book.
  let image = book.coverImage;          // Grabs the coverImage string
  if (!image) {                         // If it doesnt exists then replace it with the wikimedia "No-Image-Placeholder.svg".
    image = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }
  // Finally returns a formatted HTML string structure for the item itself with some dynamic elements.
  // Grabbing from the book json element provided, the image (replaced by placeholder if missing), releaseDate, author, title, pages.
  // I've also added a section for "Description" content in-case the API supports this in the
  return `
    <section id="detailSection" class="border-slate-700 border-t py-2">
      <div class="flex flex-row divide-x divide-zinc-700">
        <a class="w-3/4 h-1/1 p-2 pr-5 pl-0" href="${image}"><img class="" src="${image}" alt="Book Cover Image"></a>
        <div class="flex flex-col">
          <p class="pl-2">Release Date: ${book.releaseDate}</p>
          <p class="pl-2">Author: ${book.author}</p>
          <p class="pl-2">Title: ${book.title}</p>
          <p class="pl-2">Pages: ${book.pages}</p>
          <p class="pl-2">Description: </p>
          <section class="rounded-md m-2 p-1 border-2 border-slate-400">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel bibendum est, quis imperdiet diam. Phasellus venenatis magna eu rhoncus commodo. Curabitur eu interdum dolor. Cras mattis quam ac tellus pulvinar, a porta lacus ultrices. Ut et nulla at tortor gravida efficitur. Quisque id leo mauris. Donec convallis tortor sit amet erat condimentum tempus. Sed ut augue at mauris commodo dictum. Vestibulum ut nibh arcu. Donec pellentesque malesuada nibh.</p>
            <p class="pt-1">Integer a pulvinar magna, sed porttitor ligula. Praesent vitae vulputate lorem. Cras mattis nisi vitae ultrices rutrum. In quis gravida orci. Aenean efficitur convallis nunc vel condimentum. Suspendisse quis ligula sed lorem hendrerit tristique. Suspendisse vitae vulputate lectus, sed iaculis lectus. Nullam consectetur a orci non fringilla. In tempor feugiat ipsum, nec tempor ante lacinia et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas leo massa, vehicula sed enim sed, consequat tempor velit. Nunc odio erat, suscipit semper vehicula a, pharetra eget turpis. Duis et elementum mauris, vel hendrerit sem. Vivamus convallis neque enim, eget consectetur tellus aliquam semper.</p>
          </section>
        </div>
      </div>
    </section>
  `
}