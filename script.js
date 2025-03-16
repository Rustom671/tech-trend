document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news");

    if (!newsContainer) {
        console.error("Error: News container not found.");
        return;
    }

    async function fetchNews() {
        try {
            const feedURL = "https://news.samsung.com/global/feed"; // Samsung Newsroom
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedURL)}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                newsContainer.innerHTML = "<p>No news available.</p>";
                return;
            }

            newsContainer.innerHTML = "";
            data.items.slice(0, 5).forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-item");
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
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
