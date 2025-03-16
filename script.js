document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news");

    if (!newsContainer) {
        console.error("Error: News container not found.");
        return;
    }

    async function fetchNews() {
        try {
            const apiKey = "aff2a12e5f974e1c9e1a354041131c9f"; // Ensure it's a string
            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${encodeURIComponent(apiKey)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.articles || data.articles.length === 0) {
                newsContainer.innerHTML = "<p>No news available.</p>";
                return;
            }

            newsContainer.innerHTML = "";
            data.articles.slice(0, 5).forEach(article => {
                if (!article.title || !article.url) return; // Ensure data validity
                
                const articleElement = document.createElement("div");
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
