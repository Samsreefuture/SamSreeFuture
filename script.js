/* =========================================================
   SamSreeFuture - Complete JavaScript
   Stable Website Functions + Telugu Breaking News
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {
            mainNav.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");
                menuToggle.classList.remove("active");

            });

        });
    }


    /* =====================================================
       TYPING ANIMATION
       ===================================================== */

    const typingElement = document.getElementById("typing");

    if (typingElement) {

        const roles = [
            "Web Developer",
            "AI Solutions Creator",
            "Graphic Designer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeText() {

            const currentRole = roles[roleIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentRole.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex >= currentRole.length) {

                    deleting = true;

                    setTimeout(typeText, 1600);

                    return;
                }

            } else {

                typingElement.textContent =
                    currentRole.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex <= 0) {

                    charIndex = 0;
                    deleting = false;

                    roleIndex++;

                    if (roleIndex >= roles.length) {
                        roleIndex = 0;
                    }
                }
            }

            setTimeout(
                typeText,
                deleting ? 55 : 95
            );
        }

        typeText();
    }


    /* =====================================================
       AOS ANIMATION
       ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 800,
            once: true,
            offset: 80
        });
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       COUNTERS
       ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const counter =
                            entry.target;

                        const target =
                            parseInt(
                                counter.getAttribute("data-target") ||
                                counter.textContent ||
                                "0",
                                10
                            );

                        let current = 0;

                        const increment =
                            Math.max(
                                1,
                                Math.ceil(target / 80)
                            );

                        function updateCounter() {

                            current += increment;

                            if (current >= target) {
                                current = target;
                            }

                            counter.textContent =
                                current;

                            if (current < target) {
                                requestAnimationFrame(
                                    updateCounter
                                );
                            }
                        }

                        updateCounter();

                        observer.unobserve(counter);

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }


    /* =====================================================
       SKILLS PROGRESS
       ===================================================== */

    const skillBars =
        document.querySelectorAll(".skill-progress");

    if (skillBars.length) {

        const skillObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const bar =
                            entry.target;

                        const width =
                            bar.getAttribute("data-width") ||
                            bar.dataset.width;

                        if (width) {
                            bar.style.width = width;
                        }

                        observer.unobserve(bar);

                    });

                },
                {
                    threshold: 0.3
                }
            );

        skillBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });
    }


    /* =====================================================
       PROMO SLIDER
       ===================================================== */

    const promoSlides =
        document.querySelectorAll(".promo-slide");

    if (promoSlides.length > 1) {

        let promoIndex = 0;

        promoSlides.forEach(function (slide, index) {

            slide.classList.toggle(
                "active",
                index === 0
            );

        });

        setInterval(function () {

            promoSlides[promoIndex]
                .classList.remove("active");

            promoIndex++;

            if (promoIndex >= promoSlides.length) {
                promoIndex = 0;
            }

            promoSlides[promoIndex]
                .classList.add("active");

        }, 4500);
    }


    /* =====================================================
       STICKY PROMO
       ===================================================== */

    const stickyPromo =
        document.getElementById("stickyPromo");

    const stickyClose =
        document.getElementById("stickyPromoClose");

    if (stickyPromo) {

        setTimeout(function () {

            stickyPromo.classList.add("show");

        }, 2500);
    }

    if (stickyClose && stickyPromo) {

        stickyClose.addEventListener(
            "click",
            function () {

                stickyPromo.classList.remove("show");

                setTimeout(function () {

                    stickyPromo.style.display =
                        "none";

                }, 400);

            }
        );
    }


    /* =====================================================
       DIGITAL STORE SEARCH
       ===================================================== */

    const storeSearch =
        document.getElementById("storeSearch");

    const storeItems =
        document.querySelectorAll(".store-item");

    if (storeSearch && storeItems.length) {

        storeSearch.addEventListener(
            "input",
            function () {

                const searchValue =
                    this.value
                        .trim()
                        .toLowerCase();

                storeItems.forEach(function (item) {

                    const text =
                        item.textContent
                            .toLowerCase();

                    item.style.display =
                        text.includes(searchValue)
                            ? ""
                            : "none";

                });
            }
        );
    }


    /* =====================================================
       DIGITAL STORE FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".store-filter");

    if (filterButtons.length && storeItems.length) {

        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );

                    this.classList.add("active");

                    const filter =
                        this.getAttribute(
                            "data-filter"
                        );

                    storeItems.forEach(
                        function (item) {

                            const category =
                                item.getAttribute(
                                    "data-category"
                                );

                            if (
                                filter === "all" ||
                                !filter ||
                                category === filter
                            ) {

                                item.style.display =
                                    "";

                            } else {

                                item.style.display =
                                    "none";
                            }

                        }
                    );
                }
            );
        });
    }


    /* =====================================================
       GET A QUOTE -> WHATSAPP
       ===================================================== */

    const quoteForm =
        document.getElementById("quoteForm");

    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    document.getElementById("name")
                        ?.value.trim() || "";

                const whatsapp =
                    document.getElementById("whatsapp")
                        ?.value.trim() || "";

                const service =
                    document.getElementById("service")
                        ?.value.trim() || "";

                const budget =
                    document.getElementById("budget")
                        ?.value.trim() || "";

                const timeline =
                    document.getElementById("timeline")
                        ?.value.trim() || "";

                const details =
                    document.getElementById("details")
                        ?.value.trim() || "";

                const message =
                    `Hello Mahesh,

I would like to get a quote from SamSreeFuture.

Name: ${name}
WhatsApp: ${whatsapp}
Service: ${service}
Budget: ${budget}
Timeline: ${timeline}

Project Details:
${details}`;

                const whatsappURL =
                    "https://wa.me/918125024046?text=" +
                    encodeURIComponent(message);

                window.open(
                    whatsappURL,
                    "_blank"
                );
            }
        );
    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    backToTop.classList.add("show");

                } else {

                    backToTop.classList.remove(
                        "show"
                    );
                }
            }
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
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "#currentYear, .current-year"
        );

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       AD CLICK TRACKING
       ===================================================== */

    document
        .querySelectorAll("[data-ad]")
        .forEach(function (ad) {

            ad.addEventListener(
                "click",
                function () {

                    const adName =
                        this.getAttribute("data-ad") ||
                        "unknown";

                    if (
                        typeof gtag === "function"
                    ) {

                        gtag(
                            "event",
                            "ad_click",
                            {
                                ad_name: adName
                            }
                        );
                    }
                }
            );
        });


    /* =========================================================
       TELUGU BREAKING NEWS
       ========================================================= */

    const newsTicker =
        document.getElementById("newsTicker");

    const newsTrack =
        document.querySelector(
            ".telugu-breaking-track"
        );

    const newsContent =
        document.getElementById("newsContent");

    const newsClone =
        document.getElementById("newsClone");


    if (
        newsTicker &&
        newsTrack &&
        newsContent &&
        newsClone
    ) {

        let newsOffset = 0;
        let newsLastTime = 0;
        let newsContentWidth = 0;
        let newsPaused = false;

        // FIXED: previously "alse" caused JavaScript error
        let newsReducedMotion = false;

        let newsSpeed = 40;


        /* -----------------------------------------------------
           FORCE TICKER STYLE
           ----------------------------------------------------- */

        newsTicker.style.setProperty(
            "background",
            "#e00000",
            "important"
        );

        newsTicker.style.setProperty(
            "overflow",
            "hidden",
            "important"
        );

        newsTicker.style.setProperty(
            "display",
            "flex",
            "important"
        );

        newsTicker.style.setProperty(
            "align-items",
            "center",
            "important"
        );

        newsTicker.style.setProperty(
            "width",
            "100%",
            "important"
        );

        newsTicker.style.setProperty(
            "min-height",
            "48px",
            "important"
        );


        /* -----------------------------------------------------
           LABEL
           ----------------------------------------------------- */

        const newsLabel =
            newsTicker.querySelector(
                ".telugu-breaking-label"
            );

        if (newsLabel) {

            newsLabel.style.setProperty(
                "background",
                "#a80000",
                "important"
            );

            newsLabel.style.setProperty(
                "color",
                "#ffffff",
                "important"
            );

            newsLabel.style.setProperty(
                "font-weight",
                "800",
                "important"
            );

            newsLabel.style.setProperty(
                "white-space",
                "nowrap",
                "important"
            );

            newsLabel.style.setProperty(
                "flex-shrink",
                "0",
                "important"
            );

            newsLabel.style.setProperty(
                "z-index",
                "5",
                "important"
            );
        }


        /* -----------------------------------------------------
           TRACK
           ----------------------------------------------------- */

        newsTrack.style.setProperty(
            "display",
            "flex",
            "important"
        );

        newsTrack.style.setProperty(
            "flex",
            "0 0 auto",
            "important"
        );

        newsTrack.style.setProperty(
            "width",
            "max-content",
            "important"
        );

        newsTrack.style.setProperty(
            "min-width",
            "max-content",
            "important"
        );

        newsTrack.style.setProperty(
            "gap",
            "0",
            "important"
        );

        // Disable CSS animation.
        // JavaScript handles continuous scrolling.

        newsTrack.style.setProperty(
            "animation",
            "none",
            "important"
        );

        newsTrack.style.setProperty(
            "transition",
            "none",
            "important"
        );


        /* -----------------------------------------------------
           CONTENT + CLONE
           ----------------------------------------------------- */

        [newsContent, newsClone]
            .forEach(function (element) {

                element.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );

                element.style.setProperty(
                    "align-items",
                    "center",
                    "important"
                );

                element.style.setProperty(
                    "flex",
                    "0 0 auto",
                    "important"
                );

                element.style.setProperty(
                    "width",
                    "max-content",
                    "important"
                );

                element.style.setProperty(
                    "min-width",
                    "max-content",
                    "important"
                );

                element.style.setProperty(
                    "white-space",
                    "nowrap",
                    "important"
                );

                element.style.setProperty(
                    "animation",
                    "none",
                    "important"
                );

                element.style.setProperty(
                    "transition",
                    "none",
                    "important"
                );

            });


        /* -----------------------------------------------------
           NEWS ITEM STYLE
           ----------------------------------------------------- */

        function styleNewsItems() {

            newsTicker
                .querySelectorAll(".news-item")
                .forEach(function (item) {

                    item.style.setProperty(
                        "color",
                        "#ffffff",
                        "important"
                    );

                    item.style.setProperty(
                        "display",
                        "inline-flex",
                        "important"
                    );

                    item.style.setProperty(
                        "align-items",
                        "center",
                        "important"
                    );

                    item.style.setProperty(
                        "white-space",
                        "nowrap",
                        "important"
                    );

                    item.style.setProperty(
                        "flex-shrink",
                        "0",
                        "important"
                    );

                    item.style.setProperty(
                        "margin-right",
                        "45px",
                        "important"
                    );

                    item.style.setProperty(
                        "text-decoration",
                        "none",
                        "important"
                    );

                });
        }


        /* -----------------------------------------------------
           RESPONSIVE SPEED
           ----------------------------------------------------- */

        function setNewsSpeed() {

            const width =
                window.innerWidth;

            if (width <= 480) {

                newsSpeed = 40;

            } else if (width <= 768) {

                newsSpeed = 40;

            } else {

                newsSpeed = 40;
            }
        }


        /* -----------------------------------------------------
           CALCULATE WIDTH
           ----------------------------------------------------- */

        function calculateNewsWidth() {

            newsContentWidth =
                newsContent.getBoundingClientRect().width;

            if (
                !newsContentWidth ||
                newsContentWidth < 10
            ) {

                setTimeout(
                    calculateNewsWidth,
                    300
                );

                return;
            }

            if (
                newsOffset >= newsContentWidth
            ) {

                newsOffset =
                    newsOffset %
                    newsContentWidth;
            }
        }


        /* -----------------------------------------------------
           ESCAPE HTML
           ----------------------------------------------------- */

        function escapeHTML(value) {

            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }


        /* -----------------------------------------------------
           CONTINUOUS NEWS ANIMATION
           ----------------------------------------------------- */

        function newsAnimation(timestamp) {

            if (!newsLastTime) {
                newsLastTime = timestamp;
            }

            const delta =
                Math.min(
                    timestamp - newsLastTime,
                    50
                );

            newsLastTime = timestamp;


            if (
                !newsPaused &&
                !newsReducedMotion &&
                newsContentWidth > 10
            ) {

                newsOffset +=
                    newsSpeed *
                    (delta / 500);


                if (
                    newsOffset >=
                    newsContentWidth
                ) {

                    newsOffset =
                        newsOffset -
                        newsContentWidth;
                }


                newsTrack.style.setProperty(
                    "transform",
                    `translate3d(-${newsOffset}px, 0, 0)`,
                    "important"
                );
            }


            requestAnimationFrame(
                newsAnimation
            );
        }


        /* -----------------------------------------------------
           REDUCED MOTION
           ----------------------------------------------------- */

        const motionQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        function checkMotionPreference() {

            newsReducedMotion =
                motionQuery.matches;

            if (newsReducedMotion) {

                newsOffset = 0;

                newsTrack.style.setProperty(
                    "transform",
                    "translate3d(0, 0, 0)",
                    "important"
                );
            }
        }


        checkMotionPreference();


        if (
            typeof motionQuery.addEventListener ===
            "function"
        ) {

            motionQuery.addEventListener(
                "change",
                checkMotionPreference
            );

        } else if (
            typeof motionQuery.addListener ===
            "function"
        ) {

            motionQuery.addListener(
                checkMotionPreference
            );
        }


        /* -----------------------------------------------------
           PAUSE WHEN MOUSE IS OVER TICKER
           ----------------------------------------------------- */

        newsTicker.addEventListener(
            "mouseenter",
            function () {
                newsPaused = true;
            }
        );

        newsTicker.addEventListener(
            "mouseleave",
            function () {
                newsPaused = false;
            }
        );

        newsTicker.addEventListener(
            "focusin",
            function () {
                newsPaused = true;
            }
        );

        newsTicker.addEventListener(
            "focusout",
            function () {
                newsPaused = false;
            }
        );


        /* -----------------------------------------------------
           LOAD TELUGU NEWS
           ----------------------------------------------------- */

        async function loadTeluguNews() {

            try {

                // Small loading message
                newsContent.innerHTML =
                    `<span class="news-item">
                        📰 తెలుగు తాజా వార్తలు లోడ్ అవుతున్నాయి...
                    </span>`;


                const controller =
                    new AbortController();


                const timeout =
                    setTimeout(
                        function () {
                            controller.abort();
                        },
                        8000
                    );


                const response =
                    await fetch(
                        "/.netlify/functions/news",
                        {
                            method: "GET",
                            cache: "no-store",
                            headers: {
                                "Accept":
                                    "application/json"
                            },
                            signal: controller.signal
                        }
                    );


                clearTimeout(timeout);


                if (!response.ok) {

                    throw new Error(
                        "News server error: HTTP " +
                        response.status
                    );
                }


                const data =
                    await response.json();


                if (
                    !data ||
                    data.success !== true ||
                    !Array.isArray(data.items) ||
                    data.items.length === 0
                ) {

                    throw new Error(
                        "No Telugu news items received."
                    );
                }


                let html = "";


                data.items.forEach(
                    function (item) {

                        const title =
                            escapeHTML(
                                item.title ||
                                "తాజా తెలుగు వార్త"
                            );

                        const link =
                            item.link || "#";


                        html += `
                            <a
                                class="news-item"
                                href="${link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="${title}"
                            >
                                📰 ${title}
                            </a>
                        `;

                    }
                );


                newsContent.innerHTML =
                    html;


                // Exact duplicate for seamless loop
                newsClone.innerHTML =
                    newsContent.innerHTML;


                styleNewsItems();


                // Reset scrolling
                newsOffset = 0;
                newsLastTime = 0;


                newsTrack.style.setProperty(
                    "transform",
                    "translate3d(0, 0, 0)",
                    "important"
                );


                // Wait for browser layout
                requestAnimationFrame(
                    function () {

                        calculateNewsWidth();

                        setNewsSpeed();

                    }
                );


                console.log(
                    "✅ Telugu Breaking News loaded:",
                    data.items.length
                );

            } catch (error) {

                console.error(
                    "❌ Telugu News Error:",
                    error
                );


                const fallbackNews = [

                    "📰 తెలుగు తాజా వార్తలు",

                    "📰 తెలంగాణ తాజా వార్తలు",

                    "📰 హైదరాబాద్ తాజా వార్తలు",

                    "📰 ఆంధ్రప్రదేశ్ తాజా వార్తలు",

                    "📰 దేశవ్యాప్తంగా తాజా వార్తలు",

                    "📰 టెక్నాలజీ & AI తాజా అప్డేట్స్"

                ];


                newsContent.innerHTML =
                    fallbackNews
                        .map(function (item) {

                            return `
                                <span class="news-item">
                                    ${item}
                                </span>
                            `;

                        })
                        .join("");


                newsClone.innerHTML =
                    newsContent.innerHTML;


                styleNewsItems();


                newsOffset = 0;
                newsLastTime = 0;


                requestAnimationFrame(
                    function () {

                        calculateNewsWidth();

                        setNewsSpeed();

                    }
                );
            }
        }


        /* -----------------------------------------------------
           INITIAL NEWS LOAD
           ----------------------------------------------------- */

        setNewsSpeed();

        loadTeluguNews();


        /* -----------------------------------------------------
           REFRESH EVERY 15 MINUTES
           ----------------------------------------------------- */

        setInterval(
            loadTeluguNews,
            15 * 60 * 1000
        );


        /* -----------------------------------------------------
           RESIZE
           ----------------------------------------------------- */

        window.addEventListener(
            "resize",
            function () {

                setNewsSpeed();

                calculateNewsWidth();

            }
        );


        /* -----------------------------------------------------
           START CONTINUOUS ANIMATION
           ----------------------------------------------------- */

        calculateNewsWidth();

        requestAnimationFrame(
            newsAnimation
        );


        console.log(
            "✅ SamSreeFuture Telugu Breaking News ticker started."
        );
    }


    /* =====================================================
       FINAL CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "✅ SamSreeFuture website JavaScript loaded successfully."
    );

});