// ===== Smooth Scroll =====

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.hash);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });
});


// ===== Three Line Typing Animation =====

const words = [
    "Web Developer",
    "AI Solutions",
    "Graphic Designer"
];

let index = 0;

function clearLines() {
    document.querySelector("#line1").textContent = "";
    document.querySelector("#line2").textContent = "";
    document.querySelector("#line3").textContent = "";
}

function typeEffect() {

    clearInterval(window.typingInterval);

    if (index >= words.length) {

        setTimeout(() => {
            index = 0;
            clearLines();
            typeEffect();
        }, 1500);

        return;
    }

    const line = document.querySelector("#line" + (index + 1));

    let text = words[index];
    let char = 0;

    window.typingInterval = setInterval(() => {

        line.textContent += text.charAt(char);
        char++;

        if (char === text.length) {

            clearInterval(window.typingInterval);

            index++;

            setTimeout(typeEffect, 500);
        }

    }, 100);
}


// ===== Website Loaded =====

console.log("SamSreeFuture Loaded Successfully");


document.addEventListener("DOMContentLoaded", () => {

    typeEffect();

});