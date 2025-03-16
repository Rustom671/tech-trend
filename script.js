document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news");

    if (!newsContainer) {
        console.error("Error: News container not found.");
        return;
    }

    const sources = [
        { name: "Samsung", url: "https://news.samsung.com/global/feed" },
        { name: "Apple", url: "https://www.apple.com/newsroom/rss-feed.rss" },
        { name: "TechCrunch", url: "https://techcrunch.com/feed/" }
    ];

    async function fetchNews() {
        try {
            newsContainer.innerHTML = "<p>Loading news...</p>";
            let allArticles = [];

            // Fetch news from all sources
            for (const source of sources) {
                const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    console.warn(`Skipping ${source.name}: HTTP error! Status: ${response.status}`);
                    continue;
                }

                const data = await response.json();
                if (!data.items || data.items.length === 0) continue;

                // Add source name to articles
                data.items.forEach(article => {
                    allArticles.push({ ...article, source: source.name });
                });
            }

            if (allArticles.length === 0) {
                newsContainer.innerHTML = "<p>No news available.</p>";
                return;
            }

            // Sort articles by published date (latest first)
            allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

            // Display news
            newsContainer.innerHTML = "";
            allArticles.slice(0, 10).forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-item");
                articleElement.innerHTML = `
                    <h3>${article.title} (${article.source})</h3>
                    ${article.thumbnail ? `<img src="${article.thumbnail}" alt="Article Image" style="max-width:100%;">` : ""}
                    <p>${article.description || "No description available."}</p>
                    <a href="${article.link}" target="_blank">Read More</a>
                `;
                newsContainer.appendChild(articleElement);
            });

        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news.</p>";
        }
    }

    fetchNews();
});
