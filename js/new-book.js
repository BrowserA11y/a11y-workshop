
import { create } from "./books-store.js";

const form = document.getElementById("new-book-form");
const isbn = document.getElementById("isbn");
const title = document.getElementById("title");
const submit = document.getElementById("submit-book");
const isbnError = document.getElementById("isbn-error");
const titleError = document.getElementById("title-error");

const touched = { isbn: false, title: false };

function isbnErrors(value) {
  const errors = [];
  if (!value) errors.push("Please insert an ISBN (international standard book number).");
  else if (!/^\d+$/.test(value)) errors.push("ISBN must contain digits only.");
  else if (value.length > 13) errors.push("ISBN must be at most 13 characters.");
  return errors;
}

function titleErrors(value) {
  return value.trim() ? [] : ["Please insert a title."];
}

function validate() {
  const iErrs = isbnErrors(isbn.value.trim());
  const tErrs = titleErrors(title.value);
  const valid = iErrs.length === 0 && tErrs.length === 0;
  submit.disabled = !valid;

  if (touched.isbn) {
    isbn.classList.toggle("is-invalid", iErrs.length > 0);
    isbn.setAttribute("aria-invalid", iErrs.length ? "true" : "false");
    if (iErrs.length) {
      isbn.setAttribute("aria-errormessage", "isbn-error");
      isbnError.hidden = false;
      isbnError.innerHTML = iErrs
        .map((e) => `<small class="form-field__error" role="alert">${e}</small>`)
        .join("");
    } else {
      isbn.removeAttribute("aria-errormessage");
      isbnError.hidden = true;
      isbnError.innerHTML = "";
    }
  }

  if (touched.title) {
    title.classList.toggle("is-invalid", tErrs.length > 0);
    title.setAttribute("aria-invalid", tErrs.length ? "true" : "false");
    if (tErrs.length) {
      title.setAttribute("aria-describedby", "title-error");
      titleError.hidden = false;
    } else {
      title.removeAttribute("aria-describedby");
      titleError.hidden = true;
    }
  }

  return valid;
}

isbn.addEventListener("blur", () => {
  touched.isbn = true;
  validate();
});
title.addEventListener("blur", () => {
  touched.title = true;
  validate();
});
isbn.addEventListener("input", validate);
title.addEventListener("input", validate);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  touched.isbn = true;
  touched.title = true;
  if (!validate()) return;
  const book = {
    isbn: isbn.value.trim(),
    title: title.value.trim(),
    author: document.getElementById("author").value.trim(),
    cover: document.getElementById("cover").value.trim(),
    abstract: document.getElementById("abstract").value.trim(),
    price: "$0.00",
  };
  await create(book);
  location.href = "books.html";
});

validate();
