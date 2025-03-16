document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const newsContainer = document.getElementById("news");

    async function fetchNews() {
        try {
            const response = await fetch("https://newsapi.org/v2/top-headlines?category=technology&apiKey=aff2a12e5f974e1c9e1a354041131c9f");
            const data = await response.json();
            
            newsContainer.innerHTML = "";
            data.articles.slice(0, 5).forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-item");
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                `;
                newsContainer.appendChild(articleElement);
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news.</p>";
        }
    }

    fetchProducts();
    fetchNews();
});
