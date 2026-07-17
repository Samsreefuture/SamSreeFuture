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


// ===== Typing Animation =====

const words = [
    "Web Developer",
    "AI Solutions",
    "Graphic Designer"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {

    currentWord = words[i];

    if (isDeleting) {
        j--;
    } else {
        j++;
    }

    document.querySelector(".typing-text").textContent =
        currentWord.substring(0, j);

    if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    }
    else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        setTimeout(typeEffect, 500);
    }
    else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}


console.log("SamSreeFuture Loaded Successfully");

const typing = document.querySelector(".typing-text");

if (typing) {
    typeEffect();
}