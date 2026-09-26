// checkout.js - Logique de validation du formulaire de paiement

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Charger et afficher le résumé du panier
    const cart = JSON.parse(localStorage.getItem('ewari_cart')) || [];
    const previewContainer = document.getElementById('checkout-items-preview');
    
    // Si la personne arrive sur la page mais que son panier est vide, on la redirige vers le panier
    if (cart.length === 0) {
        window.location.href = 'panier.html';
        return;
    }

    let subtotal = 0;
    let itemsHtml = '';

    // Afficher chaque article en petit
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHtml += `
            <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); margin-bottom: var(--space-2);">
                <span>${item.quantity}x ${item.name} (${item.size || 'Standard'})</span>
                <span style="font-weight: 500;">${formatPrice(itemTotal)}</span>
            </div>
        `;
    });

    previewContainer.innerHTML = itemsHtml;

    // Mise à jour des totaux de paiement
    document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
    const SHIPPING = 1500;
    document.getElementById('checkout-total').textContent = formatPrice(subtotal + SHIPPING);

    // 2. Gestion de la soumission du formulaire
    const form = document.getElementById('checkout-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le navigateur de recharger la page
        
        // Simuler une petite attente de paiement (Feedback visuel important en UX)
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = "Traitement en cours...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Attendre 1,5 seconde
        setTimeout(() => {
            // Vider complètement le panier
            localStorage.removeItem('ewari_cart');
            
            // Générer un faux numéro de commande
            const orderRef = 'EWA-' + Math.floor(Math.random() * 1000000);
            
            // Rediriger vers la page de succès
            window.location.href = `confirmation.html?ref=${orderRef}`;
            
        }, 1500);
    });
});
