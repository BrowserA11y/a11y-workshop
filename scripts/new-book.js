if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:4730/books", {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("isbn").value,
        isbn: document.getElementById("title").value,
        cover: document.getElementById("author").value,
        abstract: document.getElementById("abstract").value,
        author: document.getElementById("author").value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        form.reset();
        elementsWithValidaton.forEach((element) => {
          element.classList.remove("validated");
        });
      })
      .finally(() => {
        form.addEventListener(
          "input",
          (e) => {
            resultElement.innerHTML = "";
          },
          { once: true }
        );
      });
  });
}
