// Book object constructor
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = `by ${author}`;
    this.pages = `${pages} pgs`;
    this.read = read;
    this.id = id;
}

// Display read status of Book object
Book.prototype.readStatus = function() {
    return this.read ? 'Read' : 'Not Read';
};

// Incrementing id variable to set unique property for each Book object
let globalId = 0;

// Library array
let myLibrary = [];

// Dummy books to add to library
addBookToLibrary('The Lightning Thief', 'Rick Riordan', 333, true, globalId);
addBookToLibrary('The Alchemist', 'Paulo Coelho', 274, true, globalId);
addBookToLibrary('Of Mice and Men', 'John Steinbeck', 107, false, globalId);
addBookToLibrary('In Cold Blood', 'Truman Capote', 187, false, globalId);

// Get DOM elements
const content = document.querySelector('.content');
const newBook = document.querySelector('#new-book');
const formContainer = document.querySelector('.form-container');

// New Book form elements
const cancelNewBook = document.querySelector('.cancel');
const submitNewBook = document.querySelector('.submit');

// Loop through myLibrary and add cards to .content
loadBooks();

// Add click event to delete buttons
addDeleteEL();

// Add click event to read buttons
addReadEL();

// Add click event to #new-book button
newBook.addEventListener('click', () => showForm()); // instead, toggle a show class

// Add click event to .submit button
submitNewBook.addEventListener('click', () => {
    createBookCard();
    hideForm();
    resetForm();
})

// Add click event to .cancel button
cancelNewBook.addEventListener('click', () => {
    hideForm();
    resetForm();
});

// Take user info, create a Book object, add object to myLibrary array
function addBookToLibrary(title, author, pages, read, id) {
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  globalId ++;
}

// Display book info in card
function populateCard(book, id) {
    const cardDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const deleteBook = document.createElement('div');
    const readButton = document.createElement('button');

    cardDiv.classList.add('book-card');
    deleteBook.classList.add('delete-book');
    deleteBook.dataset.id = id;
    deleteBook.dataset.event = false;
    deleteBook.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>';
    readButton.classList.add('read-status');
    readButton.dataset.id = id;
    readButton.dataset.event = false;
    readButton.innerText = 'Change read status';

    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;
    read.innerText = book.readStatus();

    textDiv.append(title, author, pages, read);
    cardDiv.append(deleteBook, textDiv, readButton);
    content.appendChild(cardDiv);
}

// Display books from myLibrary in .content section
function loadBooks() {
    myLibrary.forEach((book) => populateCard(book, book.id));
}

// Delete button event listener
function addDeleteEL() {
    const deleteButtons = document.querySelectorAll('.delete-book');
    deleteButtons.forEach(button => button.dataset.event === 'false' ? 
            (button.addEventListener('click', () => removeBook(button)),
            button.dataset.event = 'true') : null);
}

// Remove book from myLibrary and .content section
function removeBook(button) {
    const index = myLibrary.map(book => book.id).indexOf(parseInt(button.dataset.id));
    myLibrary.splice(index, 1);
    content.removeChild(button.parentElement);
}

// Change read status button event listener
function addReadEL() {
    const readButtons = document.querySelectorAll('.read-status');
    readButtons.forEach(button => button.dataset.event === 'false' ?
            (button.addEventListener('click', () => toggleReadStatus(button)),
            button.dataset.event = 'true') : null);
}

// Change read status for given book
function toggleReadStatus(button) {
    const index = myLibrary.map(book => book.id).indexOf(parseInt(button.dataset.id));
    myLibrary[index].read = myLibrary[index].read === true ? false : true;
    const readStatus = button.previousElementSibling.childNodes.item(3);
    readStatus.innerText = myLibrary[index].readStatus();
}

// Place new book data on page and in myLibrary
function createBookCard() {
    const titleField = document.querySelector('#title');
    const authorField = document.querySelector('#author');
    const pagesField = document.querySelector('#pages');
    let readStatus = document.querySelector('input[name=read-status]:checked').value;
    readStatus = readStatus === 'true';

    addBookToLibrary(titleField.value, authorField.value, pagesField.value, readStatus, globalId);
    populateCard(myLibrary.at(-1), myLibrary.at(-1).id);
    addDeleteEL();
    addReadEL();
}

function removeForm() {
    formContainer.classList.toggle('no-display');
}

function showForm() {
    formContainer.classList.remove('hide');
    formContainer.classList.add('show');
}

function hideForm() {
    formContainer.classList.remove('show');
    formContainer.classList.add('hide');
}

function resetForm() {
    const inputFields = document.querySelectorAll('input[type=text]');
    inputFields.forEach(field => field.value = null);
    document.querySelector('#read').checked = true;
}

// Remove all children from element
function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
