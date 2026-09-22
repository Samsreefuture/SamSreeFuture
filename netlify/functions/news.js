exports.handler = async function (event, context) {
    try {
        const response = await fetch(
            "https://news.google.com/rss?hl=te&gl=IN&ceid=IN:te",
            {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                "Google News RSS request failed: " +
                response.status
            );
        }

        const xml = await response.text();

        const itemMatches =
            xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

        const items = [];

        for (
            let i = 0;
            i < Math.min(itemMatches.length, 15);
            i++
        ) {
            const item = itemMatches[i];

            const titleMatch =
                item.match(
                    /<title>([\s\S]*?)<\/title>/i
                );

            const linkMatch =
                item.match(
                    /<link>([\s\S]*?)<\/link>/i
                );

            if (!titleMatch) {
                continue;
            }

            let title =
                titleMatch[1]
                    .replace(
                        /<!\[CDATA\[|\]\]>/g,
                        ""
                    )
                    .trim();

            let link =
                linkMatch
                    ? linkMatch[1].trim()
                    : "";

            if (title) {
                items.push({
                    title: title,
                    link: link
                });
            }
        }

        return {
            statusCode: 200,

            headers: {
                "Content-Type":
                    "application/json; charset=utf-8",

                "Cache-Control":
                    "public, max-age=300"
            },

            body: JSON.stringify({
                success: true,
                items: items
            })
        };

    } catch (error) {

        console.error(
            "News function error:",
            error
        );

        return {
            statusCode: 500,

            headers: {
                "Content-Type":
                    "application/json; charset=utf-8",

                "Cache-Control":
                    "no-cache"
            },

            body: JSON.stringify({
                success: false,
                items: [],
                error:
                    error && error.message
                        ? error.message
                        : "Unknown error"
            })
        };
    }
};