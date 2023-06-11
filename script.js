let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function editBook(e) {
  myLibrary[currentEditIndex].title = editForm.querySelector("#title").value;
  myLibrary[currentEditIndex].author = editForm.querySelector("#author").value;
  myLibrary[currentEditIndex].pages = editForm.querySelector("#pages").value;
  myLibrary[currentEditIndex].isRead = editForm.querySelector("#isRead").checked;
}

function removeBookFromLibrary(e) {
  myLibrary.splice(e.target.dataset.index, 1);
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
  const tr = document.createElement("tr");
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  pages.classList.add("pages");
  const isRead = document.createElement("td");
  const actionsTd = document.createElement("td");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.dataset.index = book.index;
  editBtn.addEventListener("click", e => openEditModal(e));
  deleteBtn.innerHTML = "Delete";
  deleteBtn.dataset.index = book.index;
  deleteBtn.addEventListener("click", e => removeBookFromLibrary(e));
  title.innerHTML = book.title;
  author.innerHTML = book.author;
  pages.innerHTML = book.pages;
  isRead.innerHTML = book.isRead ? "Read" : "Not Read";
  actionsTd.appendChild(editBtn);
  actionsTd.appendChild(deleteBtn);
  tr.appendChild(title);
  tr.appendChild(author);
  tr.appendChild(pages);
  tr.appendChild(isRead);
  tr.appendChild(actionsTd);
  table.appendChild(tr);
}

function displayBooks() {
  table.innerHTML = "";
  myLibrary.forEach(book => createBookElement(book));
}

function openEditModal(e) {
  modalsContainer.style.display = "block";
  editModal.style.display = "block";
  currentEditIndex = e.target.dataset.index;
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
  displayBooks();
}

function handleEditSubmit(e) {
  e.preventDefault();
  editBook();
  closeModals();
  displayBooks();
}

const table = document.querySelector("tbody");
const newBookBtn = document.querySelector(".newBookBtn");
const modalsContainer = document.querySelector(".modals-container");
const addModal = document.querySelector(".add-modal");
const addForm = document.querySelector("#add-form");
const editModal = document.querySelector(".edit-modal");
const editForm = document.querySelector("#edit-form");
const closeModalElements = document.querySelectorAll(".close");
const forms = document.querySelectorAll(".form");
let currentEditIndex = 0;

newBookBtn.addEventListener("click", openAddModal);
closeModalElements.forEach(element => element.addEventListener("click", closeModals));
addForm.addEventListener("submit", e => handleAddSubmit(e));
editForm.addEventListener("submit", e => handleEditSubmit(e));