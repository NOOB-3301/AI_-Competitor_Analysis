import axios from 'axios';
import * as cheerio from 'cheerio';
type Result = {
    title: string;
    link: string;
};

export async function POST(req: Request) {
    const { targetCompany, competitorCompany } = await req.json();

    if (!targetCompany || !competitorCompany) {
        return new Response(JSON.stringify({ error: 'Missing company names' }), { status: 400 });
    }

    const queryCollabs = [
        `${targetCompany} ${competitorCompany} collaboration`,
        `${targetCompany} ${competitorCompany} partnership`,
        `${targetCompany} ${competitorCompany} joint venture`,
        `${targetCompany} ${competitorCompany} acquisition`,
        `${targetCompany} ${competitorCompany} merger`,
        `${targetCompany} ${competitorCompany} investment`,
        `${targetCompany} ${competitorCompany} funding`,
        `${targetCompany} ${competitorCompany} alliance`,
        `${targetCompany} ${competitorCompany} agreement`,
    ];

    const results: Result[] = [];

    // Use Promise.all to handle all scraping tasks
    await Promise.all(
        queryCollabs.map(async (query) => {
            const duckUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
            try {
                const { data: html } = await axios.get(duckUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; scraperbot/1.0)',
                    },
                });

                const $ = cheerio.load(html);

                $('a.result__a').each((_, el) => {
                    const title = $(el).text().trim();
                    const rawLink = $(el).attr('href');

                    // Decode DuckDuckGo redirect link (if it exists)
                    if (title && rawLink) {
                        const linkUrl = new URL(rawLink, "https://duckduckgo.com");
                        const finalLink = decodeURIComponent(linkUrl.searchParams.get("uddg") || rawLink);
                        results.push({ title, link: finalLink });
                    }
                });
            } catch (err: any) {
                console.error(`Error scraping query "${query}":`, err.message);
            }
        })
    );

    return new Response(JSON.stringify({ count: results.length, results }), { status: 200 });
}
