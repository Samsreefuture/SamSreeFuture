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
       GET A QUOTE
       WhatsApp First + Optional AI Quote
       ===================================================== */

    const quoteForm =
        document.getElementById("quoteForm");

    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* ---------------------------------------------
                   GET FORM VALUES
                --------------------------------------------- */

                const name =
                    document.getElementById("quote-name")?.value.trim() ||
                    document.getElementById("name")?.value.trim() ||
                    "";

                const whatsapp =
                    document.getElementById("quote-phone")?.value.trim() ||
                    document.getElementById("whatsapp")?.value.trim() ||
                    "";

                const service =
                    document.getElementById("quote-service")?.value.trim() ||
                    document.getElementById("service")?.value.trim() ||
                    "";

                const budget =
                    document.getElementById("quote-budget")?.value.trim() ||
                    document.getElementById("budget")?.value.trim() ||
                    "";

                const timeline =
                    document.getElementById("quote-timeline")?.value.trim() ||
                    document.getElementById("timeline")?.value.trim() ||
                    "";

                const details =
                    document.getElementById("quote-details")?.value.trim() ||
                    document.getElementById("details")?.value.trim() ||
                    "";


                /* ---------------------------------------------
                   VALIDATION
                --------------------------------------------- */

                if (!service) {

                    alert("Please select a service.");

                    return;
                }

                if (!details) {

                    alert("Please enter your project or service details.");

                    return;
                }


                /* ---------------------------------------------
                   BASIC WHATSAPP MESSAGE
                   --------------------------------------------- */

                const basicWhatsAppMessage =
                    `Hello Mahesh,

I would like to send a SamSreeFuture enquiry.

Name:
${name || "Not provided"}

WhatsApp Number:
${whatsapp || "Not provided"}

Service:
${service}

Budget:
${budget || "Not provided"}

Timeline:
${timeline || "Not provided"}

Project Details:
${details}

Please review my enquiry and provide the quotation.

Thank you.`;


                const basicWhatsAppURL =
                    "https://wa.me/918125024046?text=" +
                    encodeURIComponent(
                        basicWhatsAppMessage
                    );


                /* ---------------------------------------------
                   OPEN WHATSAPP IMMEDIATELY
                   --------------------------------------------- */

                /*
                   This is intentionally done BEFORE the AI API
                   request.

                   Therefore, even if OpenAI credits are exhausted,
                   the customer enquiry still reaches WhatsApp.
                */

                const whatsappWindow =
                    window.open(
                        basicWhatsAppURL,
                        "_blank"
                    );


                /*
                   If the browser blocks the new tab, provide
                   a fallback message below.
                */

                if (!whatsappWindow) {

                    const openWhatsApp =
                        confirm(
                            "Please allow pop-ups for this website to open WhatsApp.\n\n" +
                            "Would you like to open WhatsApp now?"
                        );

                    if (openWhatsApp) {

                        window.location.href =
                            basicWhatsAppURL;
                    }
                }


                /* ---------------------------------------------
                   SUBMIT BUTTON
                --------------------------------------------- */

                const submitButton =
                    quoteForm.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );

                const originalButtonText =
                    submitButton
                        ? submitButton.textContent
                        : "";


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "🤖 Preparing AI Quote...";
                }


                /* ---------------------------------------------
                   REMOVE OLD AI RESULT
                --------------------------------------------- */

                const oldResult =
                    document.getElementById(
                        "ai-quote-result"
                    );

                if (oldResult) {

                    oldResult.remove();
                }


                /* ---------------------------------------------
                   TRY AI QUOTE
                --------------------------------------------- */

                try {

                    const response =
                        await fetch(
                            "/.netlify/functions/ai-quote",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    name:
                                        name,

                                    whatsapp:
                                        whatsapp,

                                    service:
                                        service,

                                    budget:
                                        budget,

                                    timeline:
                                        timeline,

                                    details:
                                        details
                                })
                            }
                        );


                    const data =
                        await response.json();


                    if (
                        !response.ok ||
                        !data ||
                        data.success !== true ||
                        !data.quote
                    ) {

                        throw new Error(
                            data?.error ||
                            "Unable to generate AI quotation."
                        );
                    }


                    const quote =
                        data.quote;


                    /* -----------------------------------------
                       CREATE AI RESULT BOX
                    ----------------------------------------- */

                    const resultBox =
                        document.createElement("div");

                    resultBox.id =
                        "ai-quote-result";


                    resultBox.innerHTML = `

                    <div
                        style="
                            margin-top:25px;
                            padding:25px;
                            border-radius:18px;
                            background:#0b1b2d;
                            border:1px solid rgba(43,184,255,0.45);
                            box-shadow:0 10px 35px rgba(0,0,0,0.25);
                        "
                    >

                        <div
                            style="
                                font-size:22px;
                                font-weight:700;
                                color:#2bb8ff;
                                margin-bottom:20px;
                            "
                        >
                            🤖 Your AI Quote Estimate
                        </div>


                        <div style="margin-bottom:18px;">

                            <strong style="color:#ffffff;">
                                Recommended Service
                            </strong>

                            <div
                                style="
                                    margin-top:6px;
                                    color:#2bb8ff;
                                    font-weight:600;
                                "
                            >
                                ${escapeQuoteHTML(
                        quote.recommended_service
                    )}
                            </div>

                        </div>


                        <div style="margin-bottom:18px;">

                            <strong style="color:#ffffff;">
                                💰 Estimated Price
                            </strong>

                            <div
                                style="
                                    margin-top:6px;
                                    color:#25d366;
                                    font-size:20px;
                                    font-weight:700;
                                "
                            >
                                ${escapeQuoteHTML(
                        quote.estimated_price
                    )}
                            </div>

                        </div>


                        <div style="margin-bottom:18px;">

                            <strong style="color:#ffffff;">
                                ⏱ Estimated Delivery
                            </strong>

                            <div
                                style="
                                    margin-top:6px;
                                    color:#ffffff;
                                "
                            >
                                ${escapeQuoteHTML(
                        quote.estimated_delivery
                    )}
                            </div>

                        </div>


                        <div style="margin-bottom:18px;">

                            <strong style="color:#ffffff;">
                                📋 Requirements
                            </strong>

                            <ul
                                style="
                                    margin-top:8px;
                                    padding-left:22px;
                                    color:#d9e7f2;
                                "
                            >

                                ${Array.isArray(
                        quote.requirements
                    )

                            ? quote.requirements
                                .map(function (item) {

                                    return `
                                                    <li
                                                        style="
                                                            margin-bottom:6px;
                                                        "
                                                    >
                                                        ${escapeQuoteHTML(item)}
                                                    </li>
                                                `;

                                })
                                .join("")

                            : ""
                        }

                            </ul>

                        </div>


                        <div style="margin-bottom:18px;">

                            <strong style="color:#ffffff;">
                                🚀 Next Steps
                            </strong>

                            <ol
                                style="
                                    margin-top:8px;
                                    padding-left:22px;
                                    color:#d9e7f2;
                                "
                            >

                                ${Array.isArray(
                            quote.next_steps
                        )

                            ? quote.next_steps
                                .map(function (item) {

                                    return `
                                                    <li
                                                        style="
                                                            margin-bottom:6px;
                                                        "
                                                    >
                                                        ${escapeQuoteHTML(item)}
                                                    </li>
                                                `;

                                })
                                .join("")

                            : ""
                        }

                            </ol>

                        </div>


                        <div
                            style="
                                margin-top:20px;
                                padding:14px;
                                border-radius:12px;
                                background:rgba(255,255,255,0.05);
                                color:#b9c9d6;
                                font-size:14px;
                                line-height:1.6;
                            "
                        >

                            ℹ️ ${escapeQuoteHTML(
                            quote.note
                        )}

                        </div>


                        <button
                            type="button"
                            id="ai-whatsapp-button"
                            style="
                                width:100%;
                                margin-top:20px;
                                padding:14px 20px;
                                border:none;
                                border-radius:10px;
                                background:#25d366;
                                color:#ffffff;
                                font-size:16px;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            💬 Send AI Quote Enquiry on WhatsApp
                        </button>

                    </div>

                    `;


                    /* -----------------------------------------
                       INSERT AI RESULT
                    ----------------------------------------- */

                    quoteForm.insertAdjacentElement(
                        "afterend",
                        resultBox
                    );


                    /* -----------------------------------------
                       AI WHATSAPP BUTTON
                    ----------------------------------------- */

                    const whatsappButton =
                        document.getElementById(
                            "ai-whatsapp-button"
                        );


                    if (whatsappButton) {

                        whatsappButton.addEventListener(
                            "click",
                            function () {

                                const message =
                                    `Hello Mahesh,

I would like to proceed with a SamSreeFuture enquiry.

Name:
${name || "Not provided"}

WhatsApp:
${whatsapp || "Not provided"}

Service:
${quote.recommended_service}

Estimated Price:
${quote.estimated_price}

Estimated Delivery:
${quote.estimated_delivery}

Budget:
${budget || "Not provided"}

Timeline:
${timeline || "Not provided"}

Project Details:
${details}

AI Quote Requirements:
${Array.isArray(quote.requirements)
                                        ? quote.requirements.join("\n- ")
                                        : "To be confirmed"
                                    }

AI Suggested Next Steps:
${Array.isArray(quote.next_steps)
                                        ? quote.next_steps.join("\n- ")
                                        : "To be confirmed"
                                    }

Note:
${quote.note || ""}

Please review my requirements and provide the final quotation.`;


                                const whatsappURL =
                                    "https://wa.me/918125024046?text=" +
                                    encodeURIComponent(
                                        message
                                    );


                                window.open(
                                    whatsappURL,
                                    "_blank"
                                );

                            }
                        );
                    }


                    /* -----------------------------------------
                       SCROLL TO AI RESULT
                    ----------------------------------------- */

                    setTimeout(
                        function () {

                            resultBox.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        },
                        100
                    );


                } catch (error) {

                    /*
                       IMPORTANT:

                       WhatsApp has already been opened before
                       this AI request.

                       Therefore, an OpenAI 429 error will NOT
                       stop the customer's enquiry.
                    */

                    console.error(
                        "❌ AI Quote Error:",
                        error
                    );


                    const errorBox =
                        document.createElement("div");

                    errorBox.id =
                        "ai-quote-result";


                    errorBox.innerHTML = `

                    <div
                        style="
                            margin-top:25px;
                            padding:20px;
                            border-radius:15px;
                            background:#0b1b2d;
                            border:1px solid rgba(43,184,255,0.35);
                            color:#ffffff;
                        "
                    >

                        <strong
                            style="
                                color:#2bb8ff;
                                font-size:18px;
                            "
                        >
                            ✅ Your enquiry has been prepared for WhatsApp
                        </strong>

                        <p
                            style="
                                margin-top:10px;
                                color:#d9e7f2;
                                line-height:1.6;
                            "
                        >
                            Your WhatsApp enquiry was opened successfully.
                            The AI quote assistant is temporarily unavailable,
                            but your enquiry details are safe and can be sent through WhatsApp.
                        </p>

                    </div>

                    `;


                    quoteForm.insertAdjacentElement(
                        "afterend",
                        errorBox
                    );


                    /*
                       If WhatsApp popup was blocked,
                       show a manual button.
                    */

                    if (!whatsappWindow) {

                        const manualButton =
                            document.createElement("button");

                        manualButton.type =
                            "button";

                        manualButton.textContent =
                            "💬 Open WhatsApp Enquiry";

                        manualButton.style.cssText = `
                            width:100%;
                            margin-top:15px;
                            padding:14px 20px;
                            border:none;
                            border-radius:10px;
                            background:#25d366;
                            color:#ffffff;
                            font-size:16px;
                            font-weight:700;
                            cursor:pointer;
                        `;

                        manualButton.addEventListener(
                            "click",
                            function () {

                                window.open(
                                    basicWhatsAppURL,
                                    "_blank"
                                );

                            }
                        );

                        errorBox.appendChild(
                            manualButton
                        );
                    }

                } finally {

                    /* -----------------------------------------
                       RESTORE BUTTON
                    ----------------------------------------- */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            originalButtonText ||
                            "💬 Send Quote Request on WhatsApp";
                    }

                }

            }
        );
    }


    /* =====================================================
       AI QUOTE HTML ESCAPE
       ===================================================== */

    function escapeQuoteHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
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
                "change",
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


                newsClone.innerHTML =
                    newsContent.innerHTML;


                styleNewsItems();


                newsOffset = 0;
                newsLastTime = 0;


                newsTrack.style.setProperty(
                    "transform",
                    "translate3d(0, 0, 0)",
                    "important"
                );


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
       SERVICES - VIEW SERVICES BUTTON
       ===================================================== */

    const serviceButtons =
        document.querySelectorAll(".view-services-btn");

    serviceButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card =
                this.closest(".service-card");

            if (!card) return;

            const isOpen =
                card.classList.contains("service-open");

            document
                .querySelectorAll(".service-card.service-open")
                .forEach(function (otherCard) {

                    if (otherCard !== card) {

                        otherCard.classList.remove("service-open");

                        const otherButton =
                            otherCard.querySelector(".view-services-btn");

                        if (otherButton) {

                            const otherSpan =
                                otherButton.querySelector("span");

                            if (otherSpan) {
                                otherSpan.textContent = "+";
                            }
                        }
                    }
                });

            if (isOpen) {

                card.classList.remove("service-open");

                const span =
                    this.querySelector("span");

                if (span) {
                    span.textContent = "+";
                }

            } else {

                card.classList.add("service-open");

                const span =
                    this.querySelector("span");

                if (span) {
                    span.textContent = "×";
                }
            }

        });

    });


    console.log(
        "✅ SamSreeFuture website JavaScript loaded successfully."
    );

});