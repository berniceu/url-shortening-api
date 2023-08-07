const input = document.querySelector(".input");
const form = document.querySelector("form");
const result = document.querySelector(".result");
const navMenu = document.querySelectorAll(".nav-menu")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    shortenUrl(url);

})

async function shortenUrl(url) {
    try {
        const api = await fetch (`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data = await api.json();
        const newUrl = document.createElement("div");
        newUrl.classList.add("item");
        newUrl.innerHTML = `<p> ${data.result.short_link}</p>
        <button class="newUrl-btn">Copy</button>`;
        result.prepend(newUrl);
        const copyBtn = result.querySelector(".newUrl-btn");
        copyBtn.addEventListener("click", () =>{
            navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);

        });
        input.value = "";
    } catch (err) {
        console.log(err);
    }
}