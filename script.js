/* =====================================================
   SamSreeFuture | Mahesh Portfolio
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("main-nav");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                menuToggle.textContent = "✕";
                menuToggle.setAttribute("aria-expanded", "true");
            } else {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        /* Close menu after clicking a link */

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove("active");

                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

        /* Close menu with Escape */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navMenu.classList.remove("active");

                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const header = document.querySelector(".site-header");

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       TYPING ANIMATION
    ===================================================== */

    const typingElement =
        document.getElementById("typing");

    if (typingElement) {

        const words = [
            "Web Developer",
            "AI Solutions",
            "Graphic Designer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;

                if (
                    charIndex >=
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;

                if (charIndex <= 0) {

                    charIndex = 0;
                    deleting = false;

                    wordIndex++;

                    if (
                        wordIndex >=
                        words.length
                    ) {
                        wordIndex = 0;
                    }

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 45 : 75
            );

        }

        typingElement.textContent = "";

        typeEffect();

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target =
            parseInt(
                counter.getAttribute("data-target"),
                10
            );

        if (isNaN(target)) {
            return;
        }

        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const easeOut =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const current =
                Math.floor(
                    easeOut * target
                );

            counter.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(
            updateCounter
        );

    }


    /* =====================================================
       COUNTER OBSERVER
    ===================================================== */

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

            const target =
                parseInt(
                    counter.getAttribute(
                        "data-target"
                    ),
                    10
                );

            counter.textContent =
                isNaN(target)
                    ? 0
                    : target;

        });

    }


    /* =====================================================
       PORTFOLIO IMAGE CURSOR
    ===================================================== */

    const portfolioImages =
        document.querySelectorAll(
            ".portfolio-card img"
        );

    portfolioImages.forEach(function (image) {

        image.style.cursor = "pointer";

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function () {

                const button =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );

                if (button) {

                    button.textContent =
                        "Sending...";

                    button.disabled = true;

                }

            }
        );

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );

    function handleHeaderScroll() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            "#main-nav a"
        );

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       AOS ANIMATION
    ===================================================== */

    if (
        typeof AOS !== "undefined"
    ) {

        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
            offset: 80,
            disable: "mobile"
        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "back-to-top"
        );

    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 400
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            },
            { passive: true }
        );

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       WHATSAPP BUTTON
    ===================================================== */

    const whatsappButton =
        document.querySelector(
            ".whatsapp-float"
        );

    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening WhatsApp..."
                );

            }
        );

    }


    /* =====================================================
       DIGITAL STORE BUY BUTTONS
    ===================================================== */

    const buyButtons =
        document.querySelectorAll(
            ".buy-btn, .product-buy-btn, .custom-product-btn"
        );

    buyButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const productCard =
                    button.closest(
                        ".product-card, .store-card"
                    );

                if (productCard) {

                    const productNameElement =
                        productCard.querySelector(
                            "h3"
                        );

                    if (
                        productNameElement
                    ) {

                        console.log(
                            "Product selected:",
                            productNameElement.textContent.trim()
                        );

                    }

                }

            }
        );

    });


    /* =====================================================
       LAZY LOAD IMAGES
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(function (image) {

        if (
            !image.hasAttribute("loading")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="http"]'
    ).forEach(function (link) {

        if (
            !link.hasAttribute("target")
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "current-year"
        );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 768 &&
                navMenu &&
                menuToggle
            ) {

                navMenu.classList.remove(
                    "active"
                );

                menuToggle.textContent =
                    "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (
        prefersReducedMotion.matches &&
        typingElement
    ) {

        typingElement.textContent =
            "Web Developer";

    }


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "SamSreeFuture | Mahesh Portfolio Loaded Successfully 🚀"
    );

});