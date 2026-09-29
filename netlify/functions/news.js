// ============================================================
// SAMSREEFUTURE - TELUGU BREAKING NEWS NETLIFY FUNCTION
// Google News Telugu RSS -> JSON
// ============================================================

exports.handler = async function (event, context) {

    try {

        const RSS_URL =
            "https://news.google.com/rss?hl=te&gl=IN&ceid=IN:te";

        // --------------------------------------------------------
        // Fetch Google News RSS
        // --------------------------------------------------------

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 8000);

        const response = await fetch(RSS_URL, {
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Accept":
                    "application/rss+xml, application/xml, text/xml, */*"
            },
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(
                "Google News RSS request failed: HTTP " +
                response.status
            );
        }

        const xml = await response.text();

        if (!xml || xml.length < 100) {
            throw new Error("Google News RSS returned empty data.");
        }

        // --------------------------------------------------------
        // Helper: Decode common XML / HTML entities
        // --------------------------------------------------------

        function decodeEntities(text) {

            if (!text) {
                return "";
            }

            return text
                .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
                .replace(/&amp;/gi, "&")
                .replace(/&lt;/gi, "<")
                .replace(/&gt;/gi, ">")
                .replace(/&quot;/gi, '"')
                .replace(/&#39;/gi, "'")
                .replace(/&apos;/gi, "'")
                .replace(/&#(\d+);/g, function (match, dec) {
                    return String.fromCharCode(dec);
                })
                .replace(/&#x([0-9a-f]+);/gi, function (match, hex) {
                    return String.fromCharCode(
                        parseInt(hex, 16)
                    );
                })
                .trim();
        }

        // --------------------------------------------------------
        // Extract <item> blocks
        // --------------------------------------------------------

        const itemMatches =
            xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

        const items = [];

        // Maximum 15 latest news items
        const maxItems = Math.min(
            itemMatches.length,
            15
        );

        for (let i = 0; i < maxItems; i++) {

            const item = itemMatches[i];

            // ----------------------------------------------------
            // Title
            // ----------------------------------------------------

            const titleMatch =
                item.match(
                    /<title\b[^>]*>([\s\S]*?)<\/title>/i
                );

            if (!titleMatch) {
                continue;
            }

            let title =
                decodeEntities(titleMatch[1]);

            // Remove unnecessary whitespace
            title =
                title
                    .replace(/\s+/g, " ")
                    .trim();

            // ----------------------------------------------------
            // Link
            // ----------------------------------------------------

            const linkMatch =
                item.match(
                    /<link\b[^>]*>([\s\S]*?)<\/link>/i
                );

            let link = "";

            if (linkMatch) {
                link =
                    decodeEntities(linkMatch[1])
                        .replace(/\s+/g, "")
                        .trim();
            }

            // ----------------------------------------------------
            // Published date
            // ----------------------------------------------------

            const pubDateMatch =
                item.match(
                    /<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i
                );

            let pubDate = "";

            if (pubDateMatch) {
                pubDate =
                    decodeEntities(pubDateMatch[1]);
            }

            // ----------------------------------------------------
            // Source
            // ----------------------------------------------------

            const sourceMatch =
                item.match(
                    /<source\b[^>]*>([\s\S]*?)<\/source>/i
                );

            let source = "";

            if (sourceMatch) {
                source =
                    decodeEntities(sourceMatch[1]);
            }

            // ----------------------------------------------------
            // Add valid item
            // ----------------------------------------------------

            if (title) {

                items.push({
                    title: title,
                    link: link,
                    pubDate: pubDate,
                    source: source
                });

            }
        }

        // --------------------------------------------------------
        // Remove duplicate headlines
        // --------------------------------------------------------

        const uniqueItems = [];

        const seenTitles =
            new Set();

        for (const item of items) {

            const key =
                item.title
                    .toLowerCase()
                    .trim();

            if (!seenTitles.has(key)) {

                seenTitles.add(key);

                uniqueItems.push(item);

            }
        }

        // --------------------------------------------------------
        // Return JSON
        // --------------------------------------------------------

        return {

            statusCode: 200,

            headers: {

                "Content-Type":
                    "application/json; charset=utf-8",

                // Cache for 5 minutes
                "Cache-Control":
                    "public, max-age=300, s-maxage=300",

                "Access-Control-Allow-Origin":
                    "*"

            },

            body: JSON.stringify({

                success: true,

                updated:
                    new Date().toISOString(),

                count:
                    uniqueItems.length,

                items:
                    uniqueItems

            })

        };

    } catch (error) {

        console.error(
            "Telugu News Function Error:",
            error
        );

        return {

            statusCode: 500,

            headers: {

                "Content-Type":
                    "application/json; charset=utf-8",

                "Cache-Control":
                    "no-cache",

                "Access-Control-Allow-Origin":
                    "*"

            },

            body: JSON.stringify({

                success: false,

                items: [],

                error:
                    error &&
                        error.message
                        ? error.message
                        : "Unable to load Telugu breaking news."

            })

        };

    }

};