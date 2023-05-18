let currentDate; // Declare currentDate variable

const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};

// Select Items
const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".list"); 
let mainContent = document.querySelector('main')
let errorMsg = document.querySelector('.msg')

// Restore stored items from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedItems = JSON.parse(localStorage.getItem("itemList")) || [];
  storedItems.forEach((item) => {
    const newUrl = document.createElement("p");
    newUrl.classList.add("list-group");
    newUrl.innerHTML = ` 
      <small>${item.url}</small>
      <p>${item.shortLink}</p>
      <p>Generated on: ${item.generatedOn}</p>
      <button class="btn-list">Copy</button>
      <button class="btn-del">Delete</button>
    `;
    result.prepend(newUrl);
  });
});

// SHORTENING
form.addEventListener("submit", (e) => {
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
    shortenUrl(url);
  }
});

// Fetch API
async function shortenUrl(url) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    currentDate = new Date().toLocaleDateString(); // Update the value of currentDate

    const newUrl = document.createElement("p");
    newUrl.classList.add("list-group");
    newUrl.innerHTML = ` 
      <small>${url}</small>
      <p>${data.result.short_link}</p>
      <p>Generated on: ${currentDate}</p>
      <button class="btn-list">Copy</button>
      <button class="btn-del">Delete</button>
    `;
    result.prepend(newUrl);

    // Copy-Button Interaction
    const copyBtn = result.querySelector(".btn-list");
    const delBtn = result.querySelector(".btn-del");

    copyBtn.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-list")) {
        navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
        let btn = e.target;
        btn.style.backgroundColor = "rgb(61, 3, 95)";
        btn.innerHTML = "Copied!";

        // Revert to normal
        setTimeout(() => {
          btn.style.backgroundColor = "";
          btn.innerHTML = "Copy";
        }, 1000);
      }
    });

    delBtn.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-del")) {
        newUrl.style.display = "none";
      }
    });

    input.value = "";

    // Store item in local storage
    const itemList = JSON.parse(localStorage.getItem("itemList")) || [];
    itemList.push({
      url,
      shortLink: data.result.short_link,
      generatedOn: currentDate,
    });
    localStorage.setItem("itemList", JSON.stringify(itemList));
  } catch (err) {
    console.log(err);
  }
}
