let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function saveLocal() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadLocal() {
  if(localStorage.getItem("library")) {
    myLibrary = JSON.parse(localStorage.getItem("library"));
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function editBook() {
  myLibrary[currentEditIndex].title = editForm.querySelector("#title").value;
  myLibrary[currentEditIndex].author = editForm.querySelector("#author").value;
  myLibrary[currentEditIndex].pages = editForm.querySelector("#pages").value;
  myLibrary[currentEditIndex].isRead = editForm.querySelector("#isRead").checked;
}

function removeBookFromLibrary(element) {
  myLibrary.splice(element.dataset.index, 1);
  saveLocal();
  displayBooks();
}

function getBook() {
  const title = addForm.querySelector("#title").value;
  const author = addForm.querySelector("#author").value;
  const pages = addForm.querySelector("#pages").value;
  const isRead = addForm.querySelector("#isRead").checked;
  return new Book(title, author, pages, isRead);
}

function createBookElement(book) {
  book.index = myLibrary.indexOf(book);
  tBody.innerHTML += `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="pages">${book.pages}</td>
      <td>${book.isRead ? "Read" : "Not Read"}</td>
      <td>
        <button data-index="${book.index}" onclick="openEditModal(this)">Edit</button>
        <button data-index="${book.index}" onclick="removeBookFromLibrary(this)">Delete</button>
      </td>
    </tr>
  `;
}

function displayBooks() {
  tBody.innerHTML = "";
  myLibrary.forEach(book => createBookElement(book));
}

function openEditModal(element) {
  modalsContainer.style.display = "block";
  editModal.style.display = "block";
  currentEditIndex = element.dataset.index;
  editForm.querySelector("#title").value = myLibrary[currentEditIndex].title;
  editForm.querySelector("#author").value = myLibrary[currentEditIndex].author;
  editForm.querySelector("#pages").value = myLibrary[currentEditIndex].pages;
  editForm.querySelector("#isRead").checked = myLibrary[currentEditIndex].isRead;
}

function openAddModal() {
  modalsContainer.style.display = "block";
  addModal.style.display = "block";
}

function closeModals() {
  forms.forEach(form => form.reset());
  modalsContainer.style.display = "none";
  addModal.style.display = "none";
  editModal.style.display = "none";
}

function handleAddSubmit(e) {
  e.preventDefault();
  const book = getBook();
  addBookToLibrary(book);
  closeModals();
  saveLocal();
  displayBooks();
}

function handleEditSubmit(e) {
  e.preventDefault();
  editBook();
  closeModals();
  saveLocal();
  displayBooks();
}

const tBody = document.querySelector("tbody");
const newBookBtn = document.querySelector(".newBookBtn");
const modalsContainer = document.querySelector(".modals-container");
const addModal = document.querySelector(".add-modal");
const addForm = document.querySelector("#add-form");
const editModal = document.querySelector(".edit-modal");
const editForm = document.querySelector("#edit-form");
const closeModalElements = document.querySelectorAll(".close");
const forms = document.querySelectorAll(".form");
let currentEditIndex;

newBookBtn.addEventListener("click", openAddModal);
closeModalElements.forEach(element => element.addEventListener("click", closeModals));
addForm.addEventListener("submit", e => handleAddSubmit(e));
editForm.addEventListener("submit", e => handleEditSubmit(e));

window.onload = () => {
  loadLocal();
  displayBooks();
}