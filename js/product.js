// product.js - Logique spécifique à la page produit

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = products.find(p => p.id === productId);
    const wrapper = document.getElementById('product-detail-wrapper');

    if (!product) {
        wrapper.innerHTML = `<div style="text-align:center; width:100%; padding: 4rem 0;"><h2>Produit introuvable</h2></div>`;
        return;
    }

    document.title = `${product.name} | Ewari`;

    const sizeLabel = product.category === 'Chaussures' ? 'Pointure' : 'Taille';
    
    const requiresSize = product.sizes && product.sizes.length > 0;
    const initialDisabledAttr = requiresSize ? 'disabled' : '';

    // Tailles
    let sizesHtml = '';
    if (requiresSize) {
        let sizeBtns = product.sizes.map(size => 
            `<button type="button" class="size-btn" data-size="${size}">${size}</button>`
        ).join('');
        sizesHtml = `
            <div class="size-selector" style="margin-bottom: 24px;">
                <div class="size-selector-header" style="margin-bottom: 8px;">
                    <span style="font-weight: 600; font-size: 0.95rem;">${sizeLabel}</span>
                </div>
                <div class="size-grid">${sizeBtns}</div>
            </div>`;
    }

    // Etoiles
    let starsHtml = '';
    for(let i=0; i<5; i++) {
        starsHtml += `<svg class="star" style="width:18px;height:18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }

    let galleryHtml = `
        <div class="product-detail-image">
            <div id="img-container" style="overflow: hidden; border-radius: var(--radius-md); position: relative; cursor: zoom-in;">
                <img id="main-product-img" src="${product.image}" alt="${product.name}" style="width: 100%; display: block; transition: transform 0.1s ease-out; transform-origin: center center;">
            </div>
            <div style="display: flex; gap: 12px; margin-top: 12px;">
                <img class="gallery-thumb active-thumb" src="${product.image}" style="width:70px; height:85px; object-fit:cover; border-radius:6px; cursor:pointer; border: 2px solid var(--color-black);">
                <img class="gallery-thumb" src="${product.lifestyle_image}" style="width:70px; height:85px; object-fit:cover; border-radius:6px; cursor:pointer; opacity: 0.6; border: 2px solid transparent;">
            </div>
        </div>
    `;

    const trustBadgesHtml = `
        <div class="trust-badges" style="display:flex; gap:16px; margin-top:24px; padding-top:16px; border-top:1px solid var(--color-grey-medium); justify-content:center;">
            <div class="trust-badge" style="text-align:center; font-size:0.7rem; color:var(--color-grey-dark);">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-black)" stroke-width="2" style="width:20px;height:20px; margin-bottom:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><br>Paiement<br>Sécurisé
            </div>
            <div class="trust-badge" style="text-align:center; font-size:0.7rem; color:var(--color-grey-dark);">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-black)" stroke-width="2" style="width:20px;height:20px; margin-bottom:4px;"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon></svg><br>Livraison<br>Rapide
            </div>
            <div class="trust-badge" style="text-align:center; font-size:0.7rem; color:var(--color-grey-dark);">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-black)" stroke-width="2" style="width:20px;height:20px; margin-bottom:4px;"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 7"></path></svg><br>Retours<br>30 jours
            </div>
        </div>
    `;

    // Le fil d'Ariane est maintenant placé tout en haut (grid-column: 1 / -1)
    wrapper.innerHTML = `
        <div class="breadcrumb" style="font-size:0.85rem; margin-bottom:24px; color:var(--color-grey-dark); width:100%; grid-column: 1 / -1;">
            <a href="index.html" style="color:inherit; text-decoration:none;">Accueil</a> / 
            <a href="catalogue.html" style="color:inherit; text-decoration:none;">Catalogue</a> / 
            ${product.category}
        </div>
        
        ${galleryHtml}
        
        <div class="product-detail-info">
            <p class="product-brand" style="text-transform:uppercase; font-size:0.8rem; letter-spacing:1px; color:var(--color-grey-dark); margin-bottom:4px;">${product.brand}</p>
            <h1 class="product-detail-title" style="font-size:1.8rem; font-weight:700; margin-bottom:8px; line-height:1.2;">${product.name}</h1>
            
            <div class="stars-container" style="padding:0; margin-bottom:16px;">
                ${starsHtml}
                <span class="reviews-count" style="font-size:0.9rem; margin-left: 8px;">${product.rating} (${product.reviews} avis vérifiés)</span>
            </div>
            
            <div class="product-detail-price" style="font-size: 1.6rem; font-weight: 800; color: var(--color-black); margin-bottom: 24px;">${formatPrice(product.price)}</div>
            
            <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 24px; color: #444;">${product.description}</p>
            
            ${sizesHtml}
            
            <div style="margin-bottom: 24px;">
                <span style="display:block; margin-bottom: 8px; font-weight: 600; font-size: 0.95rem;">Quantité</span>
                <div class="quantity-selector">
                    <button type="button" class="qty-btn qty-minus" id="qty-minus">-</button>
                    <input type="text" class="qty-input" id="qty-input" value="1" readonly>
                    <button type="button" class="qty-btn qty-plus" id="qty-plus">+</button>
                </div>
            </div>
            
            <div class="add-to-cart-container">
                <button id="add-to-cart-btn" class="btn btn-primary" style="width: 100%;" ${initialDisabledAttr}>
                    Ajouter au panier
                </button>
            </div>
            
            ${trustBadgesHtml}
        </div>
    `;

    // Galerie & Zoom interactif
    const mainImg = document.getElementById('main-product-img');
    const imgContainer = document.getElementById('img-container');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    
    // Zoom Logic
    let zoomLevel = 1;
    imgContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault(); // Empêche le zoom natif de la page entière
            zoomLevel -= e.deltaY * 0.01;
            zoomLevel = Math.min(Math.max(1, zoomLevel), 3); // Limite entre 1x et 3x
            mainImg.style.transform = `scale(${zoomLevel})`;
            imgContainer.style.cursor = zoomLevel > 1 ? 'zoom-out' : 'zoom-in';
        }
    }, { passive: false });

    // Suivi de la souris quand zoomé
    imgContainer.addEventListener('mousemove', (e) => {
        if (zoomLevel > 1) {
            const rect = imgContainer.getBoundingClientRect();
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
            mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        }
    });

    // Reset du zoom à la sortie
    imgContainer.addEventListener('mouseleave', () => {
        zoomLevel = 1;
        mainImg.style.transform = `scale(1)`;
        mainImg.style.transformOrigin = 'center center';
        imgContainer.style.cursor = 'zoom-in';
    });

    // Miniatures click
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImg.style.opacity = '0.5';
            setTimeout(() => {
                mainImg.src = thumb.src;
                mainImg.style.opacity = '1';
                // Reset zoom on image change
                zoomLevel = 1;
                mainImg.style.transform = `scale(1)`;
            }, 150);
            
            thumbs.forEach(t => { t.style.borderColor = 'transparent'; t.style.opacity = '0.6'; });
            thumb.style.borderColor = 'var(--color-black)';
            thumb.style.opacity = '1';
        });
    });

    // Sélection taille
    let selectedSize = null;
    const sizeBtns = document.querySelectorAll('.size-btn');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            sizeBtns.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedSize = e.target.getAttribute('data-size');
            addToCartBtn.disabled = false;
        });
    });

    // Quantité
    const qtyInput = document.getElementById('qty-input');
    document.getElementById('qty-minus').addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
            qtyInput.value = currentQty - 1;
        }
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty < 10) {
            qtyInput.value = currentQty + 1;
        }
    });

    // Ajout au panier
    addToCartBtn.addEventListener('click', () => {
        if (requiresSize && !selectedSize) {
            showToast(`Veuillez sélectionner une ${sizeLabel.toLowerCase()}`);
            return;
        }

        const qtyToAdd = parseInt(qtyInput.value);
        let cart = JSON.parse(localStorage.getItem('ewari_cart')) || [];
        const cartItemId = `${product.id}-${selectedSize || 'standard'}`;
        const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += qtyToAdd;
        } else {
            cart.push({
                cartItemId: cartItemId,
                productId: product.id,
                name: product.name,
                category: product.category,
                brand: product.brand,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: qtyToAdd
            });
        }
        
        localStorage.setItem('ewari_cart', JSON.stringify(cart));
        updateCartCount();
        showToast("Produit ajouté au panier ✓");
    });
});
