import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  const { data } = await request.json();

  const compName = data.trim().replace(/-/g, "").replace(/ /g, "-").toLowerCase();
  const url = `https://www.g2.com/products/${compName}/competitors/alternatives`;

  try {
    const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Referer": "https://www.google.com/", // optional but sometimes helps
        },
      });
      

    console.log("Response status:", response.status); // Log the response status
    // console.log("Response res", response.response); // Log the response headers

    const html = response.data;
    const $ = cheerio.load(html);

    const competitors: { name: string; url: string }[] = [];

    $(".product-alternatives__competitor").each((_, el) => {
      const name = $(el).find(".competitor-alternative__product-name").text().trim();
      const href = $(el).find("a").attr("href");

      if (name && href) {
        competitors.push({
          name,
          url: `https://www.g2.com${href}`,
        });
      }
    });

    return new Response(JSON.stringify(competitors), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Scraping error:", err);
    return new Response(JSON.stringify({ error: "Failed to scrape data" , errordeatils:err}), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
