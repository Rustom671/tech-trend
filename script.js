document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("products");

    async function fetchNews() {
        try {
            const apiKey = "YOUR_NEWSAPI_KEY"; // Store API key securely
            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${aff2a12e5f974e1c9e1a354041131c9f}`);
            const data = await response.json();

            newsContainer.innerHTML = "";
            data.articles.slice(0, 5).forEach(article => {
                if (!article.title || !article.url) return; // Ensure data validity
                
                const articleElement = document.createElement("products");
                articleElement.classList.add("news-item");
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="Article Image" style="max-width:100%;">` : ""}
                    <p>${article.description || "No description available."}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
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
