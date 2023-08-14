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
        const api = await fetch (`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data = await api.json();
        if (data.ok) {
            const newUrl = document.createElement("div");
            newUrl.classList.add("item");
            newUrl.innerHTML = `<p class="original-link"> ${url} </p>
            <p class="shortened-link">${data.result.short_link}</p>
            <button class="newUrl-btn">Copy</button>`;
            result.prepend(newUrl);
            const copyBtn = result.querySelector(".newUrl-btn");
            copyBtn.addEventListener("click", () =>{
                navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);

            });
            input.value = "";
        } else {
            throw new Error("Shortening URL failed");
        }
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