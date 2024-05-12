const quoteAuthor = document.getElementById("quote-author");
const quoteText = document.getElementById("quote-text");
const quoteTags = document.getElementById("quote-tags");
const randomQuoteBtn = document.getElementById("random");
const copyQuoteBtn = document.getElementById("copy");

function removeTags() {
  while (quoteTags.hasChildNodes()) {
    quoteTags.removeChild(quoteTags.lastChild);
  }
}

function getRandomQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      removeTags();
      quoteAuthor.innerText = data.author;
      quoteText.innerText = data.content;
      data.tags.forEach((element) => {
        const tag = document.createElement("div");
        tag.classList.add("quote__tag");
        tag.innerText = element;
        quoteTags.appendChild(tag);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

randomQuoteBtn.addEventListener("click", getRandomQuote);
copyQuoteBtn.addEventListener("click", () =>
  navigator.clipboard.writeText(
    `${quoteAuthor.innerText}:${quoteText.innerText}`,
  ),
);

getRandomQuote();
