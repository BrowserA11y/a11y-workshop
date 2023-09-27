fetch("http://localhost:4730/books")
  .then((response) => response.json())

  //https://www.a11yproject.com/posts/accessible-data-tables/
  //https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced#tables_for_visually_impaired_users
  //https://www.w3.org/WAI/tutorials/tables/
  .then((data) => {
    const table = document.createElement("table");
    const numberOfBooks = data.length;
    const uniqueAuthors = new Set();
    const uniquePublisher = new Set();
    let overallValue = 0;
    let numberOfPages = 0;

    data.map((book) => {
      numberOfPages = numberOfPages + (book.numPages || 0);
      overallValue = overallValue + convertPriceToNumber(book.price);
      uniqueAuthors.add(book.author);
      uniquePublisher.add(book.publisher);
    });

    const capture = `<capture class="visually-hidden">Statistics regarding our book collection</capture>`;
    const numberOfBooksRow = `<tr><th scope="row">Number of books:</th><td>${numberOfBooks} books</td></tr>`;
    const uniqueAuthorsRow = `<tr><th scope="row">Number of authors: </th><td>${uniqueAuthors.size} authors</td></tr>`;
    const uniquePublisherRow = `<tr><th scope="row">Number of publishers: </th><td>${uniquePublisher.size} publishers</td></tr>`;
    const numberOfPagesRow = `<tr><th scope="row">Number of book pages: </th><td>${numberOfPages} pages</td></tr>`;
    const overallValueRow = `<tr><th scope="row">Overall book value: </th><td>${overallValue.toFixed(
      2
    )} €</td></tr>`;

    table.innerHTML = `${capture}${numberOfBooksRow}${uniqueAuthorsRow}${uniquePublisherRow}${numberOfPagesRow}${overallValueRow}`;
    document.getElementById("stats").appendChild(table);
  })
  .catch((error) => console.error(error));

function convertPriceToNumber(price) {
  return price ? +price.replace(/^./, "") : 0;
}

var xValues = ["Mon", "Tue", "Wed", "Whu", "Fri", "Sat"];
var yValues = [55, 49, 44, 24, 15, 77];
var barColors = [
  "#114446",
  "#114446",
  "#114446",
  "#114446",
  "#114446",
  "#114446",
];

new Chart("dailyVisitors", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Number of visitors per day",
    },
  },
});
