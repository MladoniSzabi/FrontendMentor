let documentReadyPromise = new Promise(resolver => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", resolver);
    } else {
        resolver();
    }
})

let xhrPromise = new Promise(resolver => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "./data.json")
    xhr.onload = resolver
    xhr.send()
})

Promise.all([documentReadyPromise, xhrPromise]).then((arguments) => {
    let data = JSON.parse(arguments[1].target.response)
    let colors = ['red', 'yellow', 'green', 'blue']

    let sectionsContainer = document.getElementById("summary-container")
    let code = ""

    for (let i = 0; i < data.length; i++) {
        code += `
        <div class="summary-component ${colors[i]}">
            <span>
                <img class="icon" src="${data[i].icon}" alt="icon" />
                <span class="name">${data[i].category}</span>
            </span>
            <span class="score"><span class="bold">${data[i].score}</span> / 100</span>
        </div>
        `
    }

    sectionsContainer.innerHTML = `
    <h2>Summary</h2>

    ${code}

    <div id="button-container">
      <button id="continue">Continue</button>
    </div>
    `

})