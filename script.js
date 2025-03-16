document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const newsContainer = document.getElementById("news");
    
    async function fetchProducts() {
        try {
            const response = await fetch("https://api.bestbuy.com/v1/products((categoryPath.id=pcmcat209400050001))?apiKey=YOUR_BESTBUY_API_KEY&format=json");
            const data = await response.json();
            
            productsContainer.innerHTML = "";
            data.products.slice(0, 5).forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <img src="${product.image}" alt="${product.name}" />
                    <p>Price: $${product.salePrice}</p>
                    <a href="${product.url}" target="_blank">View Product</a>
                `;
                productsContainer.appendChild(productElement);
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            productsContainer.innerHTML = "<p>Failed to load products.</p>";
        }
    }

    async function fetchNews() {
        try {
            const response = await fetch("https://newsapi.org/v2/top-headlines?category=technology&apiKey=YOUR_NEWSAPI_KEY");
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
