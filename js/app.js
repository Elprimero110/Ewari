// app.js - Fonctions globales

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Icône check
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createProductCard(product) {
    let starsHtml = '';
    for(let i=0; i<5; i++) {
        starsHtml += `<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }

    // Bouton d'ajout rapide supprimé car choix de taille obligatoire
    return `
        <div class="product-card">
            <a href="produit.html?id=${product.id}" style="display:block; color:inherit;">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                </div>
            </a>
            
            <a href="produit.html?id=${product.id}" style="display:block; color:inherit; text-decoration:none;" class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="stars-container">
                    ${starsHtml}
                    <span class="reviews-count">(${product.reviews})</span>
                </div>
                <p class="product-price">${formatPrice(product.price)}</p>
            </a>
        </div>
    `;
}

function renderProductsGrid(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let displayProducts = products;
    if (limit) displayProducts = products.slice(0, limit);

    let html = '';
    displayProducts.forEach(product => {
        html += createProductCard(product);
    });
    container.innerHTML = html;
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (!countElement) return;

    let cart = JSON.parse(localStorage.getItem('ewari_cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    countElement.textContent = totalItems;
    countElement.style.display = totalItems === 0 ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // Ces appels ne servent qu'à l'accueil
    renderProductsGrid('home-products', 4); 
});
