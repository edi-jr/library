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

function getBook() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;
  return new Book(title, author, pages, isRead);
}

function createBookElement(book) {
  const tr = document.createElement("tr");
  const title = document.createElement("td");
  const author = document.createElement("td");
  const pages = document.createElement("td");
  pages.classList.add("pages");
  const isRead = document.createElement("td");
  const editTd = document.createElement("td");
  const deleteTd = document.createElement("td");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  deleteBtn.innerHTML = "Delete";
  title.innerHTML = book.title;
  author.innerHTML = book.author;
  pages.innerHTML = book.pages;
  isRead.innerHTML = book.isRead ? "Read" : "Not Read";
  editTd.appendChild(editBtn);
  deleteTd.appendChild(deleteBtn);
  tr.appendChild(title);
  tr.appendChild(author);
  tr.appendChild(pages);
  tr.appendChild(isRead);
  tr.appendChild(editTd);
  tr.appendChild(deleteTd);
  table.appendChild(tr);
}

function displayBooks() {
  table.innerHTML = "";
  myLibrary.forEach(book => createBookElement(book));
}

function openModal() {
  modalContainer.style.display = "block";
}

function closeModal() {
  form.reset();
  modalContainer.style.display = "none";  
}

function handleSubmit(e) {
  e.preventDefault();
  const book = getBook();
  addBookToLibrary(book);
  closeModal();
  displayBooks();
}

const table = document.querySelector("tbody");
const newBookBtn = document.querySelector(".newBookBtn");
const modalContainer = document.querySelector(".modal-container");
const closeModalElements = document.querySelectorAll(".close");
const form = document.querySelector("#form");

newBookBtn.addEventListener("click", openModal);
closeModalElements.forEach(element => element.addEventListener("click", closeModal));
window.addEventListener("click", e => e.target === modalContainer ? closeModal() : "");
form.addEventListener("submit", e => handleSubmit(e));