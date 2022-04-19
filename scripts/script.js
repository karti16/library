if (localStorage.key("book") == null) {
  localStorage.setItem("book", JSON.stringify([]));
}

if (localStorage.key("book") == "book") {
  myLibrary = JSON.parse(localStorage.getItem("book"));
}
//container
const localLibContainer = document.querySelector("#local-container");

//newbook form
const bookForms = document.getElementById("book-form");
bookForms.onsubmit = addBookToLibrary;

//new book button
const newBookBtn = document.querySelector("#newbook-btn");
newBookBtn.onclick = function () {
  updateBookBtn.style.display = "none";
  addBookBtn.style.display = "block";
  formDisplay("book-form", "flex");
  overlayOn();
};

//signup form open
const signUpBtn = document.querySelector("#signup-btn");
signUpBtn.onclick = function () {
  formDisplay("signup-form", "flex");
  overlayOn();
};

//Login form open
const loginbtn = document.querySelector("#login-btn");
loginbtn.onclick = function () {
  formDisplay("login-form", "flex");
  overlayOn();
};

//login form declare
const loginForm = document.querySelector("#login-form");

//signup form declare
const signupForm = document.querySelector("#signup-form");

//update book button
const updateBookBtn = document.getElementById("updateBook");
updateBookBtn.onclick = updateBook;

//add book button
const addBookBtn = document.getElementById("addBook");

//dynamic button
document.onclick = dynamicButton;

// new book cancel button
const cancelBtns = document.querySelectorAll(".cancelbtn");
for (let i = 0; i < cancelBtns.length; i++) {
  cancelBtns[i].onclick = function () {
    formDisplay("book-form", "none");
    formDisplay("signup-form", "none");
    formDisplay("login-form", "none");
    signupForm.reset();
    bookForms.reset();
    loginForm.reset();

    overlayOff();
  };
}

// buttons to be shown while logged out , logged in
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const userName = document.querySelector("#user-name");

let currentBookEdit = null;

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//Add New book to library
function addBookToLibrary(e) {
  e.preventDefault();
  bookId = myLibrary.length;
  myLibrary.push(
    new Book(
      document.getElementById("title").value,
      document.getElementById("author").value,
      document.getElementById("pages").value,
      document.getElementById("isRead").checked ? "yes" : "no"
    )
  );
  updateLocalStorage();
  displayBook();
  formDisplay("book-form", "none");
  overlayOff();
  bookForms.reset();
}

//Event listener for buttons dynamically created inside the book cards
function dynamicButton(e) {
  if (e.target && e.target.id == "delBook") {
    delBookFromLibrary(e);
  }

  if (e.target && e.target.id == "toggleRead") {
    toggleRead(e);
  }

  if (e.target && e.target.id == "editBook") {
    editBook(e);
  }
}

//Update local storage
function updateLocalStorage() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}

//delete book from library and update local storage
function delBookFromLibrary(e) {
  let bookDel = document.getElementById(getId(e));
  bookDel.remove();
  myLibrary.splice(getId(e), 1);
  updateLocalStorage();
  updateBookGrid(myLibrary);
}

//Toggle read status
function toggleRead(e) {
  let book = document.getElementById(getId(e));
  let status = book.querySelector("#toggleRead");
  let readCircle = book.querySelector("#readCircle");
  if (myLibrary[getId(e)].isRead == "yes") {
    status.innerHTML = "Mark as Read";
    readCircle.classList.add("unread");
    myLibrary[getId(e)].isRead = "no";
  } else {
    status.innerHTML = "Mark as Unread";
    readCircle.classList.remove("unread");
    myLibrary[getId(e)].isRead = "yes";
  }
  updateLocalStorage();
}

//Edit and update Book
function editBook(e) {
  console.log(getId(e));
  document.querySelector("#title").value = myLibrary[getId(e)].title;
  document.querySelector("#author").value = myLibrary[getId(e)].author;
  document.querySelector("#pages").value = myLibrary[getId(e)].pages;
  document.querySelector("#isRead").checked =
    myLibrary[getId(e)].isRead == "yes" ? true : false;

  formDisplay("book-form", "flex");
  overlayOn();

  updateBookBtn.style.display = "block";
  addBookBtn.style.display = "none";

  currentBookEdit = getId(e);
  updateLocalStorage();
}

//Update Book
function updateBook(e) {
  myLibrary[currentBookEdit].title = document.getElementById("title").value;
  myLibrary[currentBookEdit].author = document.getElementById("author").value;
  myLibrary[currentBookEdit].pages = document.getElementById("pages").value;
  myLibrary[currentBookEdit].isRead = document.getElementById("isRead").checked
    ? "yes"
    : "no";

  updateBookGrid(myLibrary);
  formDisplay("book-form", "none");
  overlayOff();
  updateLocalStorage();
}

//display book at initial page load
function displayBook() {
  myLibrary = JSON.parse(localStorage.getItem("book"));
  let localLibContainer = document.querySelector("#local-container");
  localLibContainer.innerHTML += `
    <div class="book" id="${bookId}">
        <div id="readCircle" class="${
          myLibrary[bookId].isRead == "yes" ? "" : "unread"
        }"></div>
        <div>Title : ${myLibrary[bookId].title}</div>
        <div>Author : ${myLibrary[bookId].author}</div>
        <div>Pages : ${myLibrary[bookId].pages}</div>
        <div>
          <p id="toggleRead">
            ${
              myLibrary[bookId].isRead == "yes"
                ? "Mark as Unread"
                : "Mark as Read"
            }
          </p>
        </div>
        <div id="delEditBtn">
          <i id="delBook" class="material-icons">delete</i>
          <i id="editBook" class="material-icons">edit</i>
        </div>
    </div>`;
}

//Overlay behind the popups
function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

//Overlay behind the popups
function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

//Get id from event
function getId(e) {
  return e.target.parentNode.parentElement.id;
}

//Update book display after adding, deleting, editing the books
function updateBookGrid(library) {
  localLibContainer.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    localLibContainer.innerHTML += `
    <div class="book" id="${i}">
        <div id="readCircle" class="${
          library[i].isRead == "yes" ? "" : "unread"
        }"></div>
        <div>Title : ${library[i].title}</div>
        <div>Author : ${library[i].author}</div>
        <div>Pages : ${library[i].pages}</div>
        <div>
          <p id="toggleRead">
           ${library[i].isRead == "yes" ? "Mark as Unread" : "Mark as Read"}
          </p>
        </div>
        <div id="delEditBtn">
          <i id="delBook" class="material-icons">delete</i>
          <i id="editBook" class="material-icons">edit</i>
        </div>
    </div>`;
  }
}

//sign up function

function formDisplay(form, display) {
  document.getElementById(form).style.display = display;
}

function setupUi(user) {
  if (user) {
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    userName.innerHTML = user.email.split("@", 1).join("");
  } else {
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
}
