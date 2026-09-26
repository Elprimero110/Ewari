// cart.js - Logique d'affichage et de gestion du panier

const SHIPPING_COST = 1500;

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const itemsContainer = document.getElementById('cart-items-container');
    const cartContent = document.getElementById('cart-content');
    const cartEmpty = document.getElementById('cart-empty');
    
    let cart = JSON.parse(localStorage.getItem('ewari_cart')) || [];
    
    if (cart.length === 0) {
        if(cartContent) cartContent.style.display = 'none';
        if(cartEmpty) cartEmpty.style.display = 'block';
        return;
    }
    
    if(cartEmpty) cartEmpty.style.display = 'none';
    if(cartContent) cartContent.style.display = 'flex'; 
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        const sizeLabel = item.category === 'Chaussures' ? 'Pointure' : 'Taille';
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <span class="cart-item-price" style="font-weight:700; font-size:1.1rem; color:var(--color-black);">${formatPrice(itemTotal)}</span>
                    </div>
                    
                    <div style="font-size:0.85rem; color:var(--color-grey-dark); margin-bottom:12px;">
                        ${item.brand ? item.brand + ' • ' : ''}${sizeLabel} : <span style="font-weight:600;">${item.size || 'Standard'}</span>
                    </div>
                    
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:auto;">
                        <!-- Sélecteur de quantité -->
                        <div class="quantity-selector">
                            <button class="qty-btn qty-minus" data-id="${item.cartItemId}">-</button>
                            <input type="text" readonly value="${item.quantity}" class="qty-input">
                            <button class="qty-btn qty-plus" data-id="${item.cartItemId}">+</button>
                        </div>
                        
                        <!-- Bouton Supprimer (Rouge) -->
                        <button class="remove-btn" data-id="${item.cartItemId}" style="background:none; border:none; color:#D32F2F; font-weight:600; text-decoration:underline; cursor:pointer; font-size:0.85rem;">Supprimer</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    if(itemsContainer) itemsContainer.innerHTML = html;
    
    const subE = document.getElementById('cart-subtotal');
    if(subE) subE.textContent = formatPrice(subtotal);
    
    const totE = document.getElementById('cart-total');
    if(totE) totE.textContent = formatPrice(subtotal + SHIPPING_COST);
    
    updateCartCount();
    attachCartEvents();
}

function attachCartEvents() {
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateQuantity(e.target.getAttribute('data-id'), 1);
        });
    });
    
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateQuantity(e.target.getAttribute('data-id'), -1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeItem(e.target.getAttribute('data-id'));
        });
    });
}

function updateQuantity(cartItemId, change) {
    let cart = JSON.parse(localStorage.getItem('ewari_cart')) || [];
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showToast("Produit retiré du panier");
        }
        
        localStorage.setItem('ewari_cart', JSON.stringify(cart));
        renderCart();
    }
}

function removeItem(cartItemId) {
    let cart = JSON.parse(localStorage.getItem('ewari_cart')) || [];
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    
    localStorage.setItem('ewari_cart', JSON.stringify(cart));
    showToast("Produit supprimé");
    renderCart();
}
