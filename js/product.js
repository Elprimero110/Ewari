// product.js — Logique complète de la fiche produit

document.addEventListener('DOMContentLoaded', () => {
    const urlParams  = new URLSearchParams(window.location.search);
    const productId  = urlParams.get('id');
    const product    = products.find(p => p.id === productId);
    const wrapper    = document.getElementById('product-detail-wrapper');
    const stickyBar  = document.getElementById('mobile-sticky-bar');
    const stickyPrice= document.getElementById('sticky-price');
    const stickyBtn  = document.getElementById('sticky-add-btn');

    if (!product) {
        wrapper.innerHTML = `<div style="text-align:center;padding:4rem 0;"><h2>Produit introuvable.</h2><a href="catalogue.html" class="btn btn-primary" style="margin-top:24px;">Retour au catalogue</a></div>`;
        stickyBar.style.display = 'none';
        return;
    }

    document.title = `${product.name} | Ewari`;

    const sizeLabel   = product.category === 'Chaussures' ? 'Pointure' : 'Taille';
    const requiresSize= product.sizes && product.sizes.length > 0;

    // ── Galerie : utilise product.gallery si défini, sinon construit à partir de image + lifestyle ──
    const galleryImages = product.gallery
        ? product.gallery
        : [product.image, product.lifestyle_image].filter(Boolean);

    // ── Étoiles ──
    const starsHtml = (n) => {
        let h = '';
        for (let i = 0; i < 5; i++) {
            const fill = i < Math.round(n) ? 'currentColor' : 'none';
            const stroke = i < Math.round(n) ? 'none' : 'currentColor';
            h += `<svg viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        }
        return h;
    };

    // ── Miniatures ──
    const thumbsHtml = galleryImages.map((src, i) =>
        `<img class="gallery-thumb${i === 0 ? ' active' : ''}" src="${src}" data-idx="${i}" alt="Vue ${i+1}">`
    ).join('');

    // ── Points indicateurs ──
    const dotsHtml = galleryImages.map((_, i) =>
        `<div class="gallery-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`
    ).join('');

    // ── Tailles ──
    let sizesHtml = '';
    if (requiresSize) {
        const btns = product.sizes.map(s =>
            `<button class="size-btn" data-size="${s}">${s}</button>`
        ).join('');
        sizesHtml = `
            <div class="size-section">
                <div class="size-header">
                    <span class="size-label-text">${sizeLabel}</span>
                    <span class="size-guide-link">Guide des tailles</span>
                </div>
                <div class="size-grid">${btns}</div>
                <p class="size-error-msg" id="size-error">⚠ Veuillez sélectionner votre ${sizeLabel.toLowerCase()} avant d'ajouter au panier.</p>
            </div>`;
    }

    // ── Bénéfices rapides (produit star uniquement) ──
    let benefitsHtml = '';
    if (product.isStar) {
        benefitsHtml = `
            <ul class="benefits-list">
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Cuir Smooth qui <strong>gagne en caractère</strong> avec le temps</span></li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Semelle AirWair — <strong>confort toute la journée</strong>, même debout</span></li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Polyvalent : casual, bureau, soirée — <strong>une seule paire suffit</strong></span></li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Icône fondée en 1961 — <strong>intemporel, jamais démodé</strong></span></li>
            </ul>`;
    }

    // ── Avis clients (produit star uniquement) ──
    let reviewsHtml = '';
    if (product.isStar) {
        reviewsHtml = `
            <div class="reviews-section" id="reviews">
                <h3 class="reviews-title">Avis clients <span style="color:#999;font-weight:400;font-size:0.88rem;">(${product.reviews} avis · ${product.rating}/5)</span></h3>
                <div class="review-card">
                    <div class="review-top"><span class="review-author">Koffi A.</span><span class="review-date">Il y a 3 jours</span></div>
                    <div class="review-stars">${starsHtml(5)}</div>
                    <p class="review-body">« Reçu en 2 jours, emballage impeccable. La qualité du cuir est vraiment au rendez-vous. Je les porte au bureau et le week-end, c'est polyvalent. »</p>
                    <span class="verified-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Achat vérifié</span>
                </div>
                <div class="review-card">
                    <div class="review-top"><span class="review-author">Fatou D.</span><span class="review-date">Il y a 1 semaine</span></div>
                    <div class="review-stars">${starsHtml(4)}</div>
                    <p class="review-body">« Ma deuxième paire ! J'avais la même il y a 5 ans et elle a duré tout ce temps. Un investissement qui vaut vraiment la peine. »</p>
                    <span class="verified-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Achat vérifié</span>
                </div>
                <div class="review-card">
                    <div class="review-top"><span class="review-author">Médard O.</span><span class="review-date">Il y a 2 semaines</span></div>
                    <div class="review-stars">${starsHtml(5)}</div>
                    <p class="review-body">« Service client au top. J'avais commandé la mauvaise taille, l'échange s'est fait en 48h. Je recommande à 100%. »</p>
                    <span class="verified-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Achat vérifié</span>
                </div>
            </div>`;
    }

    // ── Badges de réassurance ──
    const reassuranceHtml = `
        <div class="reassurance-grid">
            <div class="reassurance-card">
                <div class="reassurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                <div><div class="reassurance-title">Paiement Sécurisé</div><div class="reassurance-desc">Transactions 100% sécurisées</div></div>
            </div>
            <div class="reassurance-card">
                <div class="reassurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg></div>
                <div><div class="reassurance-title">Livraison Express</div><div class="reassurance-desc">Reçu chez vous en 24h ouvrées</div></div>
            </div>
            <div class="reassurance-card">
                <div class="reassurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 7"></path></svg></div>
                <div><div class="reassurance-title">Retours Gratuits</div><div class="reassurance-desc">30 jours pour changer d'avis</div></div>
            </div>
            <div class="reassurance-card">
                <div class="reassurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21.73 15"></path></svg></div>
                <div><div class="reassurance-title">Support WhatsApp</div><div class="reassurance-desc">Réponse garantie en moins d'1h</div></div>
            </div>
        </div>`;

    // ── INJECTION DU HTML COMPLET ──
    wrapper.innerHTML = `
        <div class="product-detail-layout">

            <!-- COLONNE GAUCHE : GALERIE -->
            <div class="product-detail-image">
                <div class="breadcrumb">
                    <a href="index.html">Accueil</a> /
                    <a href="catalogue.html">Catalogue</a> /
                    <a href="catalogue.html?cat=${product.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}">${product.category}</a> /
                    <span>${product.name}</span>
                </div>

                <div class="gallery-main-wrap" id="gallery-wrap">
                    ${product.isStar ? '<div class="star-badge">⭐ Produit Star</div>' : ''}
                    <button class="gallery-arrow prev" id="gallery-prev" aria-label="Image précédente">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <img id="gallery-main-img" src="${galleryImages[0]}" alt="${product.name}">
                    <button class="gallery-arrow next" id="gallery-next" aria-label="Image suivante">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>

                <div class="gallery-dots">${dotsHtml}</div>
                <div class="gallery-thumbs">${thumbsHtml}</div>
            </div>

            <!-- COLONNE DROITE : INFOS -->
            <div class="product-detail-info">
                <p class="prod-brand-label">${product.brand}</p>
                <h1 class="prod-title">${product.name}</h1>

                <div class="rating-row">
                    <div class="rating-stars">${starsHtml(product.rating)}</div>
                    <span class="rating-count">${product.rating} · <a href="#reviews" style="color:inherit;">${product.reviews} avis</a></span>
                </div>

                <div class="price-block">
                    <div class="price-value">${formatPrice(product.price)}</div>
                    <div class="price-note">Payez à la livraison · Livraison rapide disponible</div>
                </div>

                <div class="stock-row">
                    <span class="stock-dot"></span>
                    En stock — Expédié sous 24h ouvrées
                </div>

                ${sizesHtml}

                <!-- Quantité -->
                <div class="qty-section">
                    <span class="qty-label">Quantité</span>
                    <div class="qty-control">
                        <button class="qty-btn" id="qty-minus">−</button>
                        <input type="text" class="qty-input" id="qty-input" value="1" readonly>
                        <button class="qty-btn" id="qty-plus">+</button>
                    </div>
                </div>

                <!-- CTA Desktop uniquement -->
                <button class="cta-desktop" id="desktop-add-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Ajouter au panier
                </button>

                ${benefitsHtml}

                <div style="margin-bottom: 20px;">
                    <p style="font-weight: 700; font-size: 0.95rem; color: #111; margin-bottom: 8px;">Description</p>
                    <p style="font-size: 0.93rem; line-height: 1.75; color: #555; word-spacing: normal; word-break: break-word;">${product.description}</p>
                </div>

                ${reassuranceHtml}

                ${reviewsHtml}
            </div>
        </div>
    `;

    // ══════════════════════════════════════════════
    //  LOGIQUE GALERIE — flèches + miniatures + swipe
    // ══════════════════════════════════════════════
    let currentIdx = 0;
    const mainImg   = document.getElementById('gallery-main-img');
    const thumbEls  = document.querySelectorAll('.gallery-thumb');
    const dotEls    = document.querySelectorAll('.gallery-dot');
    const prevBtn   = document.getElementById('gallery-prev');
    const nextBtn   = document.getElementById('gallery-next');
    const galleryWrap = document.getElementById('gallery-wrap');

    function goTo(idx) {
        currentIdx = (idx + galleryImages.length) % galleryImages.length;
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
            mainImg.src = galleryImages[currentIdx];
            mainImg.style.opacity = '1';
        }, 150);
        thumbEls.forEach((t, i) => t.classList.toggle('active', i === currentIdx));
        dotEls.forEach((d, i)   => d.classList.toggle('active', i === currentIdx));
    }

    prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
    nextBtn.addEventListener('click', () => goTo(currentIdx + 1));

    thumbEls.forEach(t => t.addEventListener('click', () => goTo(+t.dataset.idx)));
    dotEls.forEach(d   => d.addEventListener('click', () => goTo(+d.dataset.idx)));

    // Swipe mobile (touch)
    let touchStartX = 0;
    galleryWrap.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    galleryWrap.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? currentIdx + 1 : currentIdx - 1);
    });

    // Zoom pavé tactile PC
    let zoomLevel = 1;
    galleryWrap.addEventListener('wheel', e => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        zoomLevel = Math.min(Math.max(1, zoomLevel - e.deltaY * 0.008), 3);
        mainImg.style.transform = `scale(${zoomLevel})`;
    }, { passive: false });
    galleryWrap.addEventListener('mousemove', e => {
        if (zoomLevel <= 1) return;
        const r = galleryWrap.getBoundingClientRect();
        mainImg.style.transformOrigin = `${((e.clientX - r.left)/r.width)*100}% ${((e.clientY - r.top)/r.height)*100}%`;
    });
    galleryWrap.addEventListener('mouseleave', () => {
        zoomLevel = 1;
        mainImg.style.transform = 'scale(1)';
        mainImg.style.transformOrigin = 'center center';
    });

    // ══════════════════════════════════════════════
    //  SÉLECTION DE TAILLE / POINTURE
    // ══════════════════════════════════════════════
    let selectedSize = null;
    const sizeBtns   = document.querySelectorAll('.size-btn');
    const sizeError  = document.getElementById('size-error');

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.dataset.size;
            if (sizeError) sizeError.style.display = 'none';
        });
    });

    // ══════════════════════════════════════════════
    //  QUANTITÉ — mise à jour du prix sticky
    // ══════════════════════════════════════════════
    const qtyInput   = document.getElementById('qty-input');

    function updateStickyPrice() {
        const qty = parseInt(qtyInput.value) || 1;
        stickyPrice.textContent = formatPrice(product.price * qty);
    }

    updateStickyPrice(); // initialisation

    document.getElementById('qty-minus').addEventListener('click', () => {
        let q = parseInt(qtyInput.value);
        if (q > 1) { qtyInput.value = q - 1; updateStickyPrice(); }
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        let q = parseInt(qtyInput.value);
        if (q < 10) { qtyInput.value = q + 1; updateStickyPrice(); }
    });

    // ══════════════════════════════════════════════
    //  AJOUT AU PANIER (desktop + sticky mobile)
    // ══════════════════════════════════════════════
    function doAddToCart() {
        if (requiresSize && !selectedSize) {
            if (sizeError) {
                sizeError.style.display = 'block';
                sizeError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const qty = parseInt(qtyInput.value) || 1;
        let cart  = JSON.parse(localStorage.getItem('ewari_cart')) || [];
        const cid = `${product.id}-${selectedSize || 'standard'}`;
        const idx = cart.findIndex(i => i.cartItemId === cid);

        if (idx > -1) {
            cart[idx].quantity += qty;
        } else {
            cart.push({
                cartItemId : cid,
                productId  : product.id,
                name       : product.name,
                category   : product.category,
                brand      : product.brand,
                price      : product.price,
                image      : galleryImages[0],
                size       : selectedSize,
                quantity   : qty
            });
        }

        localStorage.setItem('ewari_cart', JSON.stringify(cart));
        updateCartCount();
        showToast(`${product.name}${selectedSize ? ' — ' + sizeLabel + ' ' + selectedSize : ''} ajouté ✓`);
    }

    document.getElementById('desktop-add-btn').addEventListener('click', doAddToCart);
    stickyBtn.addEventListener('click', doAddToCart);
});
