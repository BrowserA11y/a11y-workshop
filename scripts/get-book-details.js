// Obtain the ISBN parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get("isbn");

// Make a GET request to the API endpoint
const xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:4730/books/${isbn}`, true);
xhr.onload = function () {
  // Handle the response
  if (xhr.status === 200) {
    const bookDetailsElement = document.getElementById("bookDetails");
    const bookDetails = JSON.parse(xhr.responseText);
    // Display the book details on the page
    const title = `<h2 class="secondary-color">${bookDetails.title}</h2>`;
    const subtitle = `<h3>${bookDetails.subtitle}</h3>`;
    const author = `<p>Author: ${bookDetails.author}</p>`;
    const abstract = `<p>${bookDetails.abstract}</p>`;
    const price = `<p>Price: ${bookDetails.price}</p>`;
    const numPages = `<p>Number of pages: ${bookDetails.numPages}</p>`;
    const article = document.createElement("article");
    article.innerHTML = `${title}${subtitle}${author}${abstract}${price}${numPages}`;
    if (bookDetailsElement) bookDetailsElement.appendChild(article);
  } else {
    console.error("Error retrieving book details");
  }
};
xhr.send();

// Star rating
const radioButtons = document.querySelectorAll(
  ".star-rating input[type=radio]"
);
console.log(radioButtons);

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("click", handleRating);
});

function handleRating() {
  console.log(
    document.querySelector(".star-rating :checked ~ label span").textContent
  );
}
