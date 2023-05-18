let currentDate; // Declare currentDate variable

const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};

// Select Items using DOM manipulation
const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".list");
let errorMsg = selectElement('.msg');
const loader = selectElement('.loader'); // Selecting the loader element

// Restore stored items from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedItems = JSON.parse(localStorage.getItem("itemList")) || [];
  storedItems.forEach((item) => {
    const newUrl = createShortenedUrlElement(item.url, item.shortLink, item.generatedOn);
    result.prepend(newUrl);
  });
});

// Create a new shortened URL element
function createShortenedUrlElement(url, shortLink, generatedOn) {
  const newUrl = document.createElement("div");
  newUrl.classList.add("list-group");
  newUrl.innerHTML = `
    <p><strong>Original URL:</strong> ${url}</p>
    <p><strong>Shortened URL:</strong> ${shortLink}</p>
    <p><strong>Generated on:</strong> ${generatedOn}</p>
    <button class="btn-list">Copy</button>
    <button class="btn-del">Delete</button>
  `;
  return newUrl;
}

// Add a new shortened URL to the list
function addShortenedUrl(url, shortLink, generatedOn) {
  const newUrl = createShortenedUrlElement(url, shortLink, generatedOn);
  result.prepend(newUrl);
}

// Copy and Delete-Button Interaction

result.addEventListener("click", async (e) => {
  
  if (e.target.classList.contains("btn-list")) {
    const copyBtn = e.target;
    const shortLink = copyBtn.previousElementSibling.previousElementSibling.textContent.trim();
    try {
      await navigator.clipboard.writeText(shortLink);
      copyBtn.style.backgroundColor = "rgb(61, 3, 95)";
      copyBtn.innerHTML = "Copied!";

      // Revert to normal
      setTimeout(() => {
        copyBtn.style.backgroundColor = "";
        copyBtn.innerHTML = "Copy";
      }, 1000);
    } catch (err) {
      console.log("Copy to clipboard failed:", err);
    }
  }
  else if (e.target.classList.contains("btn-del")) {
    const deleteBtn = e.target;
    const listItem = deleteBtn.parentElement;
    listItem.style.display = "none";

    // Remove item from local storage
    const url = listItem.querySelector("p:first-child").textContent.split(":")[1].trim();
    const itemList = JSON.parse(localStorage.getItem("itemList")) || [];
    const updatedItemList = itemList.filter((item) => item.url !== url);
    localStorage.setItem("itemList", JSON.stringify(updatedItemList));
  }
});





// SHORTENING
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (input.value === '') {
    // Error Message
    errorMsg.innerHTML = 'Please add a link';
    input.style.border = '1px solid rgb(250, 70, 70)';

    // Revert to normal
    setTimeout(() => {
      errorMsg.innerHTML = '';
      input.style.border = 'none';
    }, 2000);
  } else {
    const url = input.value;
    await shortenUrl(url);
    input.value = '';
  }
});

// Fetch API
async function shortenUrl(url) {
  try {
    loader.style.display = 'block';
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    currentDate = new Date().toLocaleDateString(); // Update the value of currentDate

    addShortenedUrl(url, data.result.short_link, currentDate);

    // Store item in local storage
    const itemList = JSON.parse(localStorage.getItem("itemList")) || [];
    itemList.push({
      url,
      shortLink: data.result.short_link,
      generatedOn: currentDate,
    });
    localStorage.setItem("itemList", JSON.stringify(itemList));

    loader.style.display = 'none'; // Hide the loader after data is fetched
  } catch (err) {
    loader.style.display = 'none'; // Hide the loader in case of error
    console.log(err);
  }
}


// RESPONSIVE NAV MENU
const Navy = document.querySelector('.btn')
const Ham = document.querySelector('.harmburger')
const Linky = document.querySelectorAll('.nav-link')

	Ham.addEventListener("click", ()=>{
	Navy.classList.toggle("active")
	Ham.classList.toggle("active")
})
Linky.forEach(n=> n.addEventListener('click', ()=>{
	Navy.classList.remove("active")
	Ham.classList.remove("active")
}))