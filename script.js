/* =========================================================
   SamSreeFuture - Main JavaScript
   Complete Website + Automatic Telugu Breaking News
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {

        function toggleMenu() {

            mainNav.classList.toggle("active");

            const isOpen =
                mainNav.classList.contains("active");

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close Menu" : "Open Menu"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        }

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

        menuToggle.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleMenu();
                }
            }
        );

        mainNav.querySelectorAll("a").forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mainNav.classList.remove("active");

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Open Menu"
                        );
                    }
                );
            }
        );
    }



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
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1800
                    );

                    return;
                }

                setTimeout(
                    typeEffect,
                    100
                );

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                    setTimeout(
                        typeEffect,
                        400
                    );

                    return;
                }

                setTimeout(
                    typeEffect,
                    55
                );
            }
        }

        typeEffect();
    }



    /* =====================================================
       AOS ANIMATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: "ease-out-cubic"
        });
    }



    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        const header =
                            document.querySelector(
                                ".site-header"
                            );

                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;

                        const targetPosition =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.pageYOffset -
                            headerHeight -
                            10;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            );
        });



    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    if (counters.length) {

        let countersStarted = false;

        function startCounters() {

            if (countersStarted) return;

            const statsSection =
                document.querySelector(
                    ".stats-section"
                );

            if (!statsSection) return;

            const sectionTop =
                statsSection
                    .getBoundingClientRect()
                    .top;

            const windowHeight =
                window.innerHeight;

            if (
                sectionTop <
                windowHeight - 100
            ) {

                countersStarted = true;

                counters.forEach(
                    function (counter) {

                        const target =
                            parseInt(
                                counter.getAttribute(
                                    "data-target"
                                ),
                                10
                            ) || 0;

                        let current = 0;

                        const increment =
                            Math.max(
                                1,
                                Math.ceil(
                                    target / 60
                                )
                            );

                        const timer =
                            setInterval(
                                function () {

                                    current +=
                                        increment;

                                    if (
                                        current >=
                                        target
                                    ) {

                                        current =
                                            target;

                                        clearInterval(
                                            timer
                                        );
                                    }

                                    counter.textContent =
                                        current;

                                },
                                25
                            );
                    }
                );
            }
        }

        window.addEventListener(
            "scroll",
            startCounters
        );

        startCounters();
    }



    /* =====================================================
       SKILLS PROGRESS
    ===================================================== */

    const skillBars =
        document.querySelectorAll(
            ".progress span"
        );

    if (skillBars.length) {

        skillBars.forEach(
            function (bar) {

                const originalWidth =
                    bar.style.width;

                bar.style.width = "0";

                setTimeout(
                    function () {

                        bar.style.width =
                            originalWidth;

                    },
                    400
                );
            }
        );
    }



    /* =====================================================
       PROMOTIONAL TOP SLIDER
    ===================================================== */

    const promoSlider =
        document.getElementById(
            "promoAdSlider"
        );

    if (promoSlider) {

        const slides =
            promoSlider.querySelectorAll(
                ".promo-ad"
            );

        const previousButton =
            document.getElementById(
                "promoPrev"
            );

        const nextButton =
            document.getElementById(
                "promoNext"
            );

        const dotsContainer =
            document.getElementById(
                "promoDots"
            );

        let currentSlide = 0;
        let autoPlay = null;


        if (
            dotsContainer &&
            slides.length
        ) {

            dotsContainer.innerHTML = "";

            slides.forEach(
                function (_, index) {

                    const dot =
                        document.createElement(
                            "button"
                        );

                    dot.type = "button";

                    dot.className =
                        index === 0
                            ? "promo-dot active"
                            : "promo-dot";

                    dot.setAttribute(
                        "aria-label",
                        "Show promotion " +
                        (index + 1)
                    );

                    dot.addEventListener(
                        "click",
                        function () {

                            showSlide(index);

                            restartAutoPlay();
                        }
                    );

                    dotsContainer.appendChild(
                        dot
                    );
                }
            );
        }


        function showSlide(index) {

            if (!slides.length) return;

            if (
                index >=
                slides.length
            ) {
                index = 0;
            }

            if (index < 0) {
                index =
                    slides.length - 1;
            }

            currentSlide = index;

            slides.forEach(
                function (slide, i) {

                    slide.classList.toggle(
                        "active",
                        i === currentSlide
                    );
                }
            );

            if (dotsContainer) {

                const dots =
                    dotsContainer.querySelectorAll(
                        ".promo-dot"
                    );

                dots.forEach(
                    function (dot, i) {

                        dot.classList.toggle(
                            "active",
                            i === currentSlide
                        );
                    }
                );
            }
        }


        function nextSlide() {

            showSlide(
                currentSlide + 1
            );
        }


        function previousSlide() {

            showSlide(
                currentSlide - 1
            );
        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextSlide();

                    restartAutoPlay();
                }
            );
        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousSlide();

                    restartAutoPlay();
                }
            );
        }


        function startAutoPlay() {

            if (
                slides.length <= 1
            ) {
                return;
            }

            autoPlay =
                setInterval(
                    function () {

                        nextSlide();

                    },
                    4500
                );
        }


        function stopAutoPlay() {

            if (autoPlay) {

                clearInterval(
                    autoPlay
                );

                autoPlay = null;
            }
        }


        function restartAutoPlay() {

            stopAutoPlay();

            startAutoPlay();
        }


        promoSlider.addEventListener(
            "mouseenter",
            stopAutoPlay
        );

        promoSlider.addEventListener(
            "mouseleave",
            startAutoPlay
        );


        promoSlider.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextSlide();

                    restartAutoPlay();
                }

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousSlide();

                    restartAutoPlay();
                }
            }
        );


        slides.forEach(
            function (slide, index) {

                slide.addEventListener(
                    "click",
                    function (event) {

                        const clickedElement =
                            event.target.closest(
                                "a"
                            );

                        if (
                            !clickedElement
                        ) {
                            return;
                        }

                        const promoName =
                            slide.dataset.name ||
                            "Promotion " +
                            (index + 1);

                        if (
                            typeof gtag ===
                            "function"
                        ) {

                            gtag(
                                "event",
                                "promo_click",
                                {
                                    promo_name:
                                        promoName,

                                    promo_position:
                                        index + 1
                                }
                            );
                        }
                    }
                );
            }
        );


        showSlide(0);

        startAutoPlay();
    }



    /* =====================================================
       STICKY PROMOTIONAL AD
    ===================================================== */

    const stickyPromo =
        document.getElementById(
            "stickyPromoAd"
        );

    const stickyClose =
        document.getElementById(
            "stickyPromoClose"
        );

    if (stickyPromo) {

        let stickyClosed = false;

        setTimeout(
            function () {

                if (!stickyClosed) {

                    stickyPromo.classList.add(
                        "show"
                    );
                }

            },
            4000
        );


        if (stickyClose) {

            stickyClose.addEventListener(
                "click",
                function () {

                    stickyClosed = true;

                    stickyPromo.classList.remove(
                        "show"
                    );
                }
            );
        }
    }



    /* =====================================================
       DIGITAL STORE SEARCH + FILTER
    ===================================================== */

    const storeSearch =
        document.getElementById(
            "store-search"
        );

    const storeCards =
        document.querySelectorAll(
            ".store-card"
        );

    const storeFilters =
        document.querySelectorAll(
            ".store-filter"
        );

    const storeNoResults =
        document.getElementById(
            "store-no-results"
        );

    let selectedCategory = "all";


    function filterStore() {

        const searchText =
            storeSearch
                ? storeSearch.value
                    .toLowerCase()
                    .trim()
                : "";

        let visibleCount = 0;


        storeCards.forEach(
            function (card) {

                const category =
                    (
                        card.getAttribute(
                            "data-category"
                        ) || ""
                    ).toLowerCase();

                const name =
                    (
                        card.getAttribute(
                            "data-name"
                        ) ||
                        card.textContent ||
                        ""
                    ).toLowerCase();


                const categoryMatch =
                    selectedCategory ===
                    "all" ||
                    category ===
                    selectedCategory;


                const searchMatch =
                    !searchText ||
                    name.includes(
                        searchText
                    );


                if (
                    categoryMatch &&
                    searchMatch
                ) {

                    card.style.display =
                        "";

                    visibleCount++;

                } else {

                    card.style.display =
                        "none";
                }
            }
        );


        if (storeNoResults) {

            storeNoResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";
        }
    }


    if (storeSearch) {

        storeSearch.addEventListener(
            "input",
            filterStore
        );
    }


    storeFilters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    selectedCategory =
                        (
                            this.getAttribute(
                                "data-filter"
                            ) || "all"
                        ).toLowerCase();


                    storeFilters.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );
                        }
                    );


                    this.classList.add(
                        "active"
                    );

                    filterStore();
                }
            );
        }
    );



    /* =====================================================
       QUOTE FORM → WHATSAPP
    ===================================================== */

    const quoteForm =
        document.getElementById(
            "quote-form"
        );

    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "quote-name"
                    )?.value.trim() || "";


                const phone =
                    document.getElementById(
                        "quote-phone"
                    )?.value.trim() || "";


                const service =
                    document.getElementById(
                        "quote-service"
                    )?.value || "";


                const budget =
                    document.getElementById(
                        "quote-budget"
                    )?.value || "";


                const timeline =
                    document.getElementById(
                        "quote-timeline"
                    )?.value || "";


                const message =
                    document.getElementById(
                        "quote-message"
                    )?.value.trim() || "";


                const successMessage =
                    document.getElementById(
                        "quote-success"
                    );


                const whatsappMessage =
                    `Hello Mahesh,

I would like to get a quote from SamSreeFuture.

Name: ${name}
WhatsApp: ${phone}
Service: ${service}
Budget: ${budget}
Timeline: ${timeline}

Project Details:
${message}`;


                const whatsappURL =
                    "https://wa.me/918125024046?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                if (successMessage) {

                    successMessage.style.display =
                        "block";

                    successMessage.textContent =
                        "Opening WhatsApp...";
                }


                if (
                    typeof gtag ===
                    "function"
                ) {

                    gtag(
                        "event",
                        "quote_whatsapp",
                        {
                            service: service,
                            budget: budget
                        }
                    );
                }


                setTimeout(
                    function () {

                        window.open(
                            whatsappURL,
                            "_blank"
                        );

                    },
                    300
                );
            }
        );
    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );

    if (backToTop) {

        function updateBackToTop() {

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
        }


        window.addEventListener(
            "scroll",
            updateBackToTop
        );

        updateBackToTop();


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

    const currentYear =
        document.getElementById(
            "current-year"
        );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }



    /* =====================================================
       ADVERTISEMENT CLICK TRACKING
    ===================================================== */

    document
        .querySelectorAll("[data-ad-name]")
        .forEach(
            function (adLink) {

                adLink.addEventListener(
                    "click",
                    function () {

                        const adName =
                            this.getAttribute(
                                "data-ad-name"
                            ) ||
                            "Advertisement";

                        const adPosition =
                            this.getAttribute(
                                "data-ad-position"
                            ) || "";


                        if (
                            typeof gtag ===
                            "function"
                        ) {

                            gtag(
                                "event",
                                "advertisement_click",
                                {
                                    ad_name:
                                        adName,

                                    ad_position:
                                        adPosition
                                }
                            );
                        }
                    }
                );
            }
        );


    /* =====================================================
       AUTOMATIC TELUGU BREAKING NEWS
       NETLIFY FUNCTION + CLICKABLE LIVE NEWS
    ===================================================== */

    const newsTicker =
        document.getElementById(
            "newsTicker"
        );


    if (newsTicker) {

        const newsTrack =
            newsTicker.querySelector(
                ".news-ticker-track"
            );


        const newsContent =
            document.getElementById(
                "newsContent"
            );


        const newsClone =
            document.getElementById(
                "newsClone"
            );


        if (
            newsTrack &&
            newsContent &&
            newsClone
        ) {


            /* -----------------------------------------
               FALLBACK
            ----------------------------------------- */

            const fallbackNews = [

                {
                    title:
                        "తెలుగు తాజా వార్తలు త్వరలో అందుబాటులోకి వస్తాయి.",

                    link: ""
                }

            ];


            /* -----------------------------------------
               CREATE NEWS ITEM
            ----------------------------------------- */

            function createNewsItem(news) {

                if (news.link) {

                    const link =
                        document.createElement(
                            "a"
                        );


                    link.className =
                        "news-item";


                    link.href =
                        news.link;


                    link.target =
                        "_blank";


                    link.rel =
                        "noopener noreferrer";


                    link.textContent =
                        "📰 " +
                        news.title;


                    return link;

                }


                const span =
                    document.createElement(
                        "span"
                    );


                span.className =
                    "news-item";


                span.textContent =
                    "📰 " +
                    news.title;


                return span;
            }


            /* -----------------------------------------
               DISPLAY NEWS
            ----------------------------------------- */

            function displayNews(newsList) {

                newsContent.innerHTML =
                    "";


                newsList.forEach(
                    function (news) {

                        newsContent.appendChild(
                            createNewsItem(
                                news
                            )
                        );

                    }
                );


                /*
                 * Duplicate headlines for
                 * seamless continuous scrolling.
                 */

                newsClone.innerHTML =
                    newsContent.innerHTML;


                /*
                 * Restart animation.
                 */

                newsTrack.style.animation =
                    "none";


                void newsTrack.offsetWidth;


                newsTrack.style.animation =
                    "";

            }


            /* -----------------------------------------
               LOAD LIVE NEWS
            ----------------------------------------- */

            async function loadLiveNews() {

                try {

                    const response =
                        await fetch(
                            "/.netlify/functions/news",
                            {
                                cache:
                                    "no-store"
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "News function unavailable"
                        );

                    }


                    const data =
                        await response.json();


                    if (
                        !data.success ||
                        !Array.isArray(
                            data.items
                        ) ||
                        !data.items.length
                    ) {

                        throw new Error(
                            "No news found"
                        );

                    }


                    const latestNews =
                        data.items
                            .slice(0, 15)
                            .filter(
                                function (item) {

                                    return (
                                        item &&
                                        item.title
                                    );

                                }
                            )
                            .map(
                                function (item) {

                                    return {

                                        title:
                                            item.title
                                                .trim(),

                                        link:
                                            item.link ||
                                            ""

                                    };

                                }
                            );


                    if (
                        !latestNews.length
                    ) {

                        throw new Error(
                            "No headlines found"
                        );

                    }


                    displayNews(
                        latestNews
                    );


                    console.log(
                        "Telugu breaking news updated successfully."
                    );


                } catch (error) {

                    console.warn(
                        "Live Telugu news unavailable.",
                        error
                    );


                    displayNews(
                        fallbackNews
                    );

                }

            }


            /* -----------------------------------------
               PAUSE
            ----------------------------------------- */

            function pauseNews() {

                newsTrack.classList.add(
                    "is-paused"
                );

            }


            /* -----------------------------------------
               RESUME
            ----------------------------------------- */

            function resumeNews() {

                newsTrack.classList.remove(
                    "is-paused"
                );

            }


            /* -----------------------------------------
               MOUSE PAUSE
            ----------------------------------------- */

            newsTicker.addEventListener(
                "mouseenter",
                pauseNews
            );


            newsTicker.addEventListener(
                "mouseleave",
                resumeNews
            );


            /* -----------------------------------------
               KEYBOARD / FOCUS PAUSE
            ----------------------------------------- */

            newsTicker.addEventListener(
                "focusin",
                pauseNews
            );


            newsTicker.addEventListener(
                "focusout",
                resumeNews
            );


            /* -----------------------------------------
               FIRST LOAD
            ----------------------------------------- */

            loadLiveNews();


            /* -----------------------------------------
               AUTO REFRESH
               Every 15 minutes
            ----------------------------------------- */

            setInterval(
                loadLiveNews,
                15 * 60 * 1000
            );

        }

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.style.scrollBehavior =
            "auto";
    }

});