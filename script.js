// ===== Smooth Scroll =====
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

        // Mobile Menu Close
        const navMenu = document.querySelector("nav ul");
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }
    });
});


// ===== Three Line Typing Animation =====

document.addEventListener("DOMContentLoaded", () => {

    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    if (line1 && line2 && line3) {

        const words = [
            "Web Developer",
            "AI Solutions",
            "Graphic Designer"
        ];

        function startTyping() {

            line1.textContent = "";
            line2.textContent = "";
            line3.textContent = "";

            let i = 0;

            function typeLine(element, text, callback) {

                let j = 0;

                const timer = setInterval(() => {

                    element.textContent += text.charAt(j);

                    j++;

                    if (j >= text.length) {
                        clearInterval(timer);

                        if (callback) {
                            setTimeout(callback, 400);
                        }
                    }

                }, 100);

            }

            typeLine(line1, words[0], () => {
                typeLine(line2, words[1], () => {
                    typeLine(line3, words[2], () => {

                        setTimeout(startTyping, 2000);

                    });
                });
            });

        }

        startTyping();

    }

});


// ===== Mobile Menu =====

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

}


// ===== Counter Animation =====

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.getAttribute("data-target");

            let count = 0;

            const update = () => {

                const increment = Math.ceil(target / 50);

                if (count < target) {

                    count += increment;

                    if (count > target) count = target;

                    counter.innerText = count;

                    setTimeout(update, 30);

                }

            };

            update();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter => {
    observer.observe(counter);
});


// ===== Console =====

console.log("SamSreeFuture Loaded Successfully");