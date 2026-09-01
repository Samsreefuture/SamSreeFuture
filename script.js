/* =====================================================
   SamSreeFuture | Mahesh Portfolio
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }

        });


        document.querySelectorAll("nav ul a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";

            });

        });


        document.addEventListener("click", function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";

            }

        });

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =================================================
       TYPING ANIMATION
       Web Developer
       AI Solutions
       Graphic Designer
    ================================================= */

    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    if (line1 && line2 && line3) {

        const words = [
            "Web Developer",
            "AI Solutions",
            "Graphic Designer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typingAnimation() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                if (wordIndex === 0) {
                    line1.textContent =
                        currentWord.substring(0, charIndex + 1);
                }

                if (wordIndex === 1) {
                    line2.textContent =
                        currentWord.substring(0, charIndex + 1);
                }

                if (wordIndex === 2) {
                    line3.textContent =
                        currentWord.substring(0, charIndex + 1);
                }

                charIndex++;

                if (charIndex === currentWord.length) {

                    setTimeout(function () {

                        deleting = true;

                        typingAnimation();

                    }, 1500);

                    return;

                }

            } else {

                if (wordIndex === 0) {
                    line1.textContent =
                        currentWord.substring(0, charIndex - 1);
                }

                if (wordIndex === 1) {
                    line2.textContent =
                        currentWord.substring(0, charIndex - 1);
                }

                if (wordIndex === 2) {
                    line3.textContent =
                        currentWord.substring(0, charIndex - 1);
                }

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    if (wordIndex === 0) {
                        line1.textContent = "";
                    }

                    if (wordIndex === 1) {
                        line2.textContent = "";
                    }

                    if (wordIndex === 2) {
                        line3.textContent = "";
                    }

                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }

                }

            }

            setTimeout(
                typingAnimation,
                deleting ? 45 : 75
            );

        }


        /* Clear all lines first */

        line1.textContent = "";
        line2.textContent = "";
        line3.textContent = "";


        /* Start */

        typingAnimation();

    }


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = parseInt(
            counter.getAttribute("data-target"),
            10
        );

        if (isNaN(target)) {
            return;
        }

        let current = 0;

        const duration = 1500;
        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const easeOut =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.floor(easeOut * target);

            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent = target;

            }

        }


        requestAnimationFrame(updateCounter);

    }


    /* =================================================
       COUNTER OBSERVER
    ================================================= */

    if (
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(function (counter) {

            const target = parseInt(
                counter.getAttribute("data-target"),
                10
            );

            counter.textContent =
                isNaN(target) ? 0 : target;

        });

    }


    /* =================================================
       PORTFOLIO IMAGE CURSOR
    ================================================= */

    const projectImages =
        document.querySelectorAll(".project img");

    projectImages.forEach(function (image) {

        image.addEventListener(
            "mouseenter",
            function () {

                image.style.cursor = "pointer";

            }
        );

    });


    /* =================================================
       CONTACT FORM
    ================================================= */

    const contactForm =
        document.querySelector(".contact form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function () {

                const button =
                    contactForm.querySelector("button");

                if (button) {

                    button.textContent =
                        "Sending...";

                    button.disabled = true;

                }

            }
        );

    }


    /* =================================================
       CLOSE MOBILE MENU ON RESIZE
    ================================================= */

    window.addEventListener("resize", function () {

        if (
            window.innerWidth > 768 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove("active");

            menuToggle.textContent = "☰";

        }

    });


    /* =================================================
       BACK TO TOP BUTTON
    ================================================= */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

    }


    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "SamSreeFuture | Mahesh Portfolio Loaded Successfully 🚀"
    );

});