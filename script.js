let my;

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

  updateBookBtn.style.display = "none";
  addBookBtn.style.display = "block";

  displayBook();
  bookForms.reset();
  overlayOff();
  localStorage.setItem("book", JSON.stringify(myLibrary));
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

function delBookFromLibrary(e) {
  let bookDel = document.getElementById(getId(e));
  bookDel.remove();
  myLibrary.splice(getId(e), 1);
}

function toggleRead(e) {
  let book = document.getElementById(getId(e));
  let status = book.querySelector("#toggleRead");
  let readStatus = book.querySelector("#readStatus");

  if (myLibrary[getId(e)].isRead == "yes") {
    status.innerHTML = '<span class="mdi mdi-book-remove"></span>';
    readStatus.innerHTML = "Read ? : no";
    myLibrary[getId(e)].isRead = "no";
  } else {
    status.innerHTML = '<span class="mdi mdi-book-check"></span>';
    readStatus.innerHTML = "Read ? : yes";
    myLibrary[getId(e)].isRead = "yes";
  }
}

function editBook(e) {
  document.querySelector("#title").value = myLibrary[getId(e)].title;
  document.querySelector("#author").value = myLibrary[getId(e)].author;
  document.querySelector("#pages").value = myLibrary[getId(e)].pages;
  document.querySelector("#isRead").checked =
    myLibrary[getId(e)].isRead == "yes" ? true : false;

  updateBookBtn.style.display = "block";
  addBookBtn.style.display = "none";

  overlayOn();
  currentBookEdit = getId(e);
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
}

function displayBook() {
  let libContainer = document.querySelector(".lib-container");
  libContainer.innerHTML += `<div class="book" id="${bookId}">
          <ul>
            <li>Title : ${myLibrary[bookId].title}</li>
            <li>Author : ${myLibrary[bookId].author}</li>
            <li>Pages : ${myLibrary[bookId].pages}</li>
            <li id="readStatus">Read ? : ${myLibrary[bookId].isRead}</li>
            <li><button id="delBook" class="delBook"><span class="mdi mdi-delete"></span></button></li>
            <li><button id="toggleRead">${
              myLibrary[bookId].isRead == "yes"
                ? '<span class="mdi mdi-book-check"></span>'
                : '<span class="mdi mdi-book-remove"></span>'
            }</button></li>
           <li> <button id="editBook"><span class="mdi mdi-pencil"></span></button></li>
          </ul>
        </div>`;
}

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
  bookForms.reset();
}

function getId(e) {
  return e.target.parentNode.parentNode.parentElement.id;
}

function updateBookGrid() {
  libContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    libContainer.innerHTML += `<div class="book" id="${i}">
          <ul>
            <li>Title : ${myLibrary[i].title}</li>
            <li>Author : ${myLibrary[i].author}</li>
            <li>Pages : ${myLibrary[i].pages}</li>
            <li id="readStatus">Read ? : ${myLibrary[i].isRead}</li>
            <li><button id="delBook" class="delBook"><span class="mdi mdi-delete"></span></button></li>
            <li><button id="toggleRead">${
              myLibrary[i].isRead == "yes"
                ? '<span class="mdi mdi-book-check"></span>'
                : '<span class="mdi mdi-book-remove"></span>'
            }</button></li>
           <li> <button id="editBook"><span class="mdi mdi-pencil"></span></button></li>
          </ul>
        </div>`;
  }
}

updateBookGrid();

document.onclick = dynamicButton;
bookForms.onsubmit = addBookToLibrary;
updateBookBtn.onclick = updateBook;

localStorage.setItem("book", JSON.stringify(myLibrary));
let storedNames = JSON.parse(localStorage.getItem("names"));
