// GLOBAL STATE

let currentQty = 1;
let currentPrice = 30;
let currentVariant = 'solo (1 pc.)';


// CART STORAGE 

function getCart() {
    return JSON.parse(localStorage.getItem('pnp-cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('pnp-cart', JSON.stringify(cart));
}

// SELECTION PAGE 
function changeQty(change) {
    currentQty = Math.max(1, currentQty + change);
    document.getElementById('qty-num').textContent = currentQty;
}

function setVariant(btn, price, variant) {
    document.querySelectorAll('.variant-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');
    currentPrice = price;
    currentVariant = variant;
}

function setThumb(img) {
    document.querySelectorAll('.thumb').forEach(function(t) {
        t.classList.remove('active');
    });
    img.classList.add('active');
    document.getElementById('main-product-img').src = img.src;
}

function addToCart() {
    const productTitle = document.getElementById('product-title').textContent;
    const productImg = document.getElementById('main-product-img').src;
    const cart = getCart();

    const existing = cart.find(function(item) {
        return item.name === productTitle && item.variant === currentVariant;
    });

    if (existing) {
        existing.qty += currentQty;
    } else {
        cart.push({
            id: Date.now(),
            name: productTitle,
            variant: currentVariant,
            price: currentPrice,
            qty: currentQty,
            img: productImg
        });
    }

    saveCart(cart);
    updateCartCount();
}

// CART COUNT
function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce(function(sum, item) {
        return sum + item.qty;
    }, 0);

    let badge = document.getElementById('cart-count-badge');
    if (!badge) {
        const cartIcon = document.querySelector('a[href="cart.html"]');
        if (cartIcon) {
            badge = document.createElement('span');
            badge.id = 'cart-count-badge';
            badge.style.cssText = `
                position: absolute;
                top: -6px;
                right: -8px;
                background: #3a3a3a;
                color: #fff;
                font-size: 10px;
                font-family: 'Lexend', sans-serif;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(badge);
        }
    }

    if (badge) {
        badge.textContent = total;
        badge.style.display = total === 0 ? 'none' : 'flex';
    }
}

// CART PAGE FUNCTIONS

function changeCartQty(id, change) {
    const cart = getCart();
    const item = cart.find(function(i) { return i.id === id; });
    
    if (item) {
        const newQty = item.qty + change;
        
        if (newQty <= 0) {
            removeFromCart(id);
        } else {
            item.qty = newQty;
            saveCart(cart);
            renderCart();
            updateCartCount();
        }
    }
}

function removeFromCart(id) {
    const cart = getCart().filter(function(i) { return i.id !== Number(id); });
    saveCart(cart);
    renderCart();
    updateCartCount();
}

function updateTotals(orderTotal) {
    const rows = document.querySelectorAll('.shipping-row span:last-child');
    if (rows.length >= 3) {
        rows[0].textContent = 'PHP ' + orderTotal.toFixed(2);
        rows[1].textContent = 'PHP 0.00';
        rows[2].textContent = 'PHP ' + orderTotal.toFixed(2);
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return;

    const cart = getCart();
    const notice = document.querySelector('.notice');
    const ordersHeader = document.querySelector('.orders');

    cartItemsContainer.innerHTML = '';

    // cart checker
    if (cart.length === 0) {
        if (notice) notice.style.display = 'block';
        if (ordersHeader) ordersHeader.style.display = 'none';
        updateTotals(0);
        return;
    }

    //headers
    if (notice) notice.style.display = 'none';
    if (ordersHeader) ordersHeader.style.display = 'grid';

    let orderTotal = 0;

    cart.forEach(function(item) {
        const itemTotal = item.price * item.qty;
        orderTotal += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.style.cssText = `
            display: grid;
            grid-template-columns: 70px 1fr 120px 100px 30px;
            align-items: center;
            gap: 12px;
            padding: 14px 0;
            border-bottom: 0.5px solid #eee;
        `;
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width:70px;height:70px;object-fit:cover;">
            <div style="min-width:0;">
                <p style="font-family:'Lexend',sans-serif;font-size:0.8rem;font-weight:500;color:#3a3a3a;margin:0;">${item.name}</p>
                <p style="font-family:'Lexend',sans-serif;font-size:0.72rem;color:#888;margin:4px 0 0;">${item.variant}</p>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
                <button onclick="changeCartQty(${item.id}, -1)" style="background:none;border:none;font-size:1.1rem;cursor:pointer;color:#3a3a3a;">−</button>
                <span style="font-family:'Lexend',sans-serif;font-size:0.85rem;">${item.qty}</span>
                <button onclick="changeCartQty(${item.id}, 1)" style="background:none;border:none;font-size:1.1rem;cursor:pointer;color:#3a3a3a;">+</button>
            </div>
            <p style="font-family:'Lexend',sans-serif;font-size:0.85rem;color:#3a3a3a;margin:0;text-align:right;">PHP ${itemTotal.toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})" style="background:none;border:none;cursor:pointer;color:#aaa;font-size:1rem;">🗑</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    updateTotals(orderTotal);
}

//
document.addEventListener('DOMContentLoaded', function() {

    updateCartCount();
    renderCart();

    const firstVariant = document.querySelector('.variant-btn');
    if (firstVariant) firstVariant.classList.add('active');

    // SEARCH
    const searchBtn = document.getElementById('search-btn');
    const searchInline = document.getElementById('search-inline');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const products = [
        { name: "Crunchy Biscoff Cookie",             price: "₱160.00", img: "/images/biscoff.png",    href: "selection.html",           category: "cookies" },
        { name: "Matcha Cookie with White Chocolate", price: "₱160.00", img: "/images/matcha.png",     href: "selection-2.html",         category: "cookies" },
        { name: "Chocolate Chip Cookie",              price: "₱160.00", img: "/images/chips.png",      href: "selection-3.html",         category: "cookies" },
        { name: "Red Velvet Cookie",                  price: "₱160.00", img: "/images/RedVelvet.png",  href: "selection-4.html",         category: "cookies" },
        { name: "S'mores Cookie",                     price: "₱160.00", img: "/images/smores.png",     href: "selection-5.html",         category: "cookies" },
        { name: "Roses",                              price: "₱50.00",  img: "/images/roses.png",      href: "rose-selection.html",      category: "flowers" },
        { name: "Sunflowers",                         price: "₱100.00", img: "/images/sunflowers.png", href: "sunflower-selection.html", category: "flowers" },
        { name: "Tulips",                             price: "₱70.00",  img: "/images/tulips.png",     href: "tulips-selection.html",    category: "flowers" },
        { name: "Orchids",                            price: "₱180.00", img: "/images/orchids.png",    href: "#",                        category: "flowers" },
    ];

    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchInline.classList.add('open');
            searchBtn.style.display = 'none';
            searchInput.focus();
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', function() {
            searchInline.classList.remove('open');
            searchBtn.style.display = 'block';
            searchInput.value = '';
            if (searchResults) {
                searchResults.classList.remove('open');
                searchResults.innerHTML = '';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.trim().toLowerCase();

            if (query === '') {
                if (searchResults) {
                    searchResults.classList.remove('open');
                    searchResults.innerHTML = '';
                }
                return;
            }

            const filtered = products.filter(function(product) {
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.category.includes(query)
                );
            });

            if (searchResults) {
                if (filtered.length === 0) {
                    searchResults.innerHTML = '<p class="no-results">No results found.</p>';
                } else {
                    searchResults.innerHTML = filtered.map(function(product) {
                        return `
                            <a href="${product.href}" class="search-result-item">
                                <img src="${product.img}" alt="${product.name}">
                                <div class="result-info">
                                    <span class="result-name">${product.name}</span>
                                    <span class="result-price">${product.price}</span>
                                </div>
                            </a>
                        `;
                    }).join('');
                }
                searchResults.classList.add('open');
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (searchResults && !e.target.closest('#navbar')) {
            searchResults.classList.remove('open');
        }
    });

    // CHANGE PASSWORD
    const openBtn = document.getElementById('change-password-btn');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('change-password-modal');

    if (openBtn && closeBtn && modal) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
        });

        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

});

//buttons for solo and box 
function setVariant(btn, price, variant) {
    // 1. Toggle active class visual
    document.querySelectorAll('.variant-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // 2. Update global selection data
    currentPrice = price;
    currentVariant = variant;

    // 3. Update the price on the screen
    const priceDisplay = document.getElementById('price-display');
    if (priceDisplay) {
        priceDisplay.textContent = 'PHP ' + price.toFixed(2);
    }
}

//menu achnor link 
window.addEventListener('load', function() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function setVariant(btn, price, variant) {

    document.querySelectorAll('.variant-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    currentPrice = price;
    currentVariant = variant;

    const priceDisplay = document.getElementById('price-display');
    if (priceDisplay) {
        priceDisplay.textContent = 'PHP ' + price.toFixed(2);
    }

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = false;
    }
}