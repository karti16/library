if (localStorage.key("book") == null) {
  localStorage.setItem("book", JSON.stringify([]));
}

if (localStorage.key("book") == "book") {
  myLibrary = JSON.parse(localStorage.getItem("book"));
}

const libContainer = document.querySelector(".lib-container");
const bookForms = document.getElementById("bookForms");
const updateBookBtn = document.getElementById("updateBook");
const addBookBtn = document.getElementById("addBook");
let currentBookEdit = null;

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

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
  overlayOff();
  bookForms.reset();
}

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
function updateLocalStorage() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}
function delBookFromLibrary(e) {
  let bookDel = document.getElementById(getId(e));
  bookDel.remove();
  myLibrary.splice(getId(e), 1);
  updateLocalStorage();
  updateBookGrid();
}

function toggleRead(e) {
  let book = document.getElementById(getId(e));
  let status = book.querySelector("#toggleRead");
  if (myLibrary[getId(e)].isRead == "yes") {
    status.innerHTML = "Mark as Read";
    myLibrary[getId(e)].isRead = "no";
  } else {
    status.innerHTML = "Mark as Unread";
    myLibrary[getId(e)].isRead = "yes";
  }
  updateLocalStorage();
}

function editBook(e) {
  console.log(getId(e));
  document.querySelector("#title").value = myLibrary[getId(e)].title;
  document.querySelector("#author").value = myLibrary[getId(e)].author;
  document.querySelector("#pages").value = myLibrary[getId(e)].pages;
  document.querySelector("#isRead").checked =
    myLibrary[getId(e)].isRead == "yes" ? true : false;

  overlayOn();

  updateBookBtn.style.display = "block";
  addBookBtn.style.display = "none";

  currentBookEdit = getId(e);
  updateLocalStorage();
}

function updateBook(e) {
  myLibrary[currentBookEdit].title = document.getElementById("title").value;
  myLibrary[currentBookEdit].author = document.getElementById("author").value;
  myLibrary[currentBookEdit].pages = document.getElementById("pages").value;
  myLibrary[currentBookEdit].isRead = document.getElementById("isRead").checked
    ? "yes"
    : "no";

  updateBookGrid();
  overlayOff();
  updateLocalStorage();
}

function displayBook() {
  myLibrary = JSON.parse(localStorage.getItem("book"));
  let libContainer = document.querySelector(".lib-container");
  libContainer.innerHTML += `
    <div class="book" id="${bookId}">
        <div>Title : ${myLibrary[bookId].title}</div>
        <div>Author : ${myLibrary[bookId].author}</div>
        <div>Pages : ${myLibrary[bookId].pages}</div>
        <p id="toggleRead">
          ${
            myLibrary[bookId].isRead == "yes"
              ? "Mark as Unread"
              : "Mark as Read"
          }
        </p>
        <div id="delEditBtn">
          <i id="delBook" class="material-icons">delete</i>
          <i id="editBook" class="material-icons">edit</i>
        </div>
    </div>`;
}

function overlayOn() {
  updateBookBtn.style.display = "none";
  addBookBtn.style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
  bookForms.reset();
}

function getId(e) {
  return e.target.parentElement.id;
}

function updateBookGrid() {
  libContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    libContainer.innerHTML += `
    <div class="book" id="${i}">
        <div>Title : ${myLibrary[i].title}</div>
        <div>Author : ${myLibrary[i].author}</div>
        <div>Pages : ${myLibrary[i].pages}</div>
        <p id="toggleRead">
          ${myLibrary[i].isRead == "yes" ? "Mark as Unread" : "Mark as Read"}
        </p>
        <div id="delEditBtn">
          <i id="delBook" class="material-icons">delete</i>
          <i id="editBook" class="material-icons">edit</i>
        </div>
    </div>`;
  }
}

updateBookGrid();

document.onclick = dynamicButton;
bookForms.onsubmit = addBookToLibrary;
updateBookBtn.onclick = updateBook;
