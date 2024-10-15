const input = document.querySelector(".input");
const form = document.querySelector("form");
const result = document.querySelector(".result");
const navMenu = document.querySelectorAll(".nav-menu")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;

    if (!UrlIsValid(url)) {
        displayError("Invalid URL. Please enter a valid URL.");
        return;
    }
    shortenUrl(url);

})

async function shortenUrl(url) {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error("Shortening URL failed");
        }
        const shortUrl = await response.text();

        const newUrl = document.createElement("div");
        newUrl.classList.add("item");
        newUrl.innerHTML = `
            <p class="original-link">${url}</p>
            <p class="shortened-link">${shortUrl}</p>
            <button class="newUrl-btn">Copy</button>
        `;
        result.prepend(newUrl);

        const copyBtn = newUrl.querySelector(".newUrl-btn");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(shortUrl);
        });

        input.value = "";
    } catch (err) {
        console.log(err);
    }
}

function displayError(message) {
    
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.innerHTML =`<p>${message}</p>`;
    result.prepend(errorDiv);
    setTimeout(() => {
        result.removeChild(errorDiv);
    
    }, 3000);
}

function UrlIsValid(url){
    return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);
}