//favicon//
const currentFavicon = document.querySelector("link[rel*='icon']");

if (currentFavicon) {
  currentFavicon.type = 'image/png';
  currentFavicon.href = 'pastel logo.png';
} else {
  const newFavicon = document.createElement('link');
  newFavicon.rel = 'icon';
  newFavicon.type = 'image/png';
  newFavicon.href = 'pastel logo.png';
  document.head.appendChild(newFavicon);
}
document.title = 'Petals n Pastry';


// ===== GLOBAL STATE =====
let currentQty = 1;
let currentPrice = 30;
let currentVariant = 'solo (1 pc.)';


// ===== PRODUCT DATABASE (GLOBAL) =====
const productDB = {
    'biscoff': {
        name: "Crunchy Biscoff Cookie (Solo & Box)",
        
        desc: "A buttery, crisp cookie packed with rich Biscoff spread and crunchy Biscoff crumbles. Perfect as a solo treat or share-worthy box gift.",
        
        images: ["images/biscoff.png", "images/biscoff2.png", "images/biscoff3.png", "images/biscoff4.png"],
        variants: [
            { label: "solo (1 pc.)", price: 30 },
            { label: "one mini box (6 pcs.)", price: 160 }
        ],
        also: ['matcha', 'chips', 'smores', 'redvelvet']
    },
    'matcha': {
        name: "Matcha Cookie with White Chocolate",
        
        desc: "A vibrant, earthy cookie featuring premium ceremonial-grade matcha and velvety white chocolate pools. A sophisticated balance of bittersweet notes and buttery softness in every bite.",
        
        images: ["images/matcha.png", "images/matcha2.png", "images/matcha3.png", "images/matcha4.png"],
        variants: [
            { label: "solo (1 pc.)", price: 30 },
            { label: "one mini box (6 pcs.)", price: 160 }
        ],
        also: ['biscoff', 'chips', 'smores', 'redvelvet']
    },
    'chips': {
        name: "Chocolate Chip Cookie (Solo & Box)",
        desc: "A timeless classic featuring a golden, buttery base loaded with melty semi-sweet chocolate chunks and a hint of sea salt. Perfectly crisp edges with a soft, chewy center that feels like home.",
        images: ["images/chips.png", "images/chip2.png", "images/chip3.png", "images/chip4.png"],
        variants: [
            { label: "solo (1 pc.)", price: 30 },
            { label: "one mini box (6 pcs.)", price: 160 }
        ],
        also: ['biscoff', 'matcha', 'smores', 'redvelvet']
    },
    'smores': {
        name: "S'mores Cookie (Solo & Box)",
        desc: "Gooey marshmallow and rich chocolate in a campfire-inspired cookie.",
        images: ["images/smores.png", "images/s'mores2.png", "images/s'mores3.png", "images/s'mores4.png"],
        variants: [
            { label: "solo (1 pc.)", price: 30 },
            { label: "one mini box (6 pcs.)", price: 160 }
        ],
        also: ['biscoff', 'matcha', 'chips', 'redvelvet']
    },
    'redvelvet': {
        name: "Red Velvet Cookie (Solo & Box)",
        desc: "A decadent, deep-red cocoa base swirled with creamy white chocolate chips and a hint of tangy sweetness. Velvety smooth and strikingly bold, it’s the ultimate fusion of rich cake flavor and a classic cookie crunch.",
        images: ["images/redvelvet.png", "images/redvelvet2.png", "images/redvelvet3.png", "images/redvelvet4.png"],
        variants: [
            { label: "solo (1 pc.)", price: 30 },
            { label: "one mini box (6 pcs.)", price: 160 }
        ],
        also: ['biscoff', 'matcha', 'chips', 'smores']
    },
    'roses': {
        name: "Roses (Stem & Bouquet)",
        desc: "Elegant, hand-picked roses with velvety petals and a delicate fragrance. The perfect floral companion to our sweet treats, available as a single stem or a stunning boxed set.",
        images: ["images/roses.png", "images/rose2.png", "images/rose3.png", "images/rose4.png"],
        variants: [
            { label: "single stem", price: 50 },
            { label: "bouquet (12 pcs.)", price: 500 }
        ],
        also: ['sunflowers', 'tulips', 'orchids']
    },
    'sunflowers': {
        name: "Sunflowers (Stem & Bouquet)",
        desc: "Bright, sun-drenched blooms with velvet-soft petals and striking dark centers. A bold statement as a single stem or a share-worthy gift box.",
        images: ["images/sunflowers.png", "images/sunflower2.png", "images/sunflower3.png", "images/sunflower4.png"],
        variants: [
            { label: "single stem", price: 100 },
            { label: "bouquet (6 pcs.)", price: 550 }
        ],
        also: ['roses', 'tulips', 'orchids']
    },
    'tulips': {
        name: "Tulips (Stem & Bouquet)",
        desc: "Elegant, silk-soft tulips with vibrant, bell-shaped petals and fresh green stems. A graceful solo choice or a share-worthy addition to any gift box.",
        images: ["images/tulips.png", "images/tulip2.png", "images/tulip3.png", "images/tulip4.png"],
        variants: [
            { label: "single stem", price: 70 },
            { label: "bouquet (10 pcs.)", price: 600 }
        ],
        also: ['roses', 'sunflowers', 'orchids']
    },
    'orchids': {
        name: "Orchids",
        desc: "Exotic and graceful, our orchids feature delicate, architectural blooms and a long-lasting, sophisticated charm. A stunning choice as a high-end solo stem or an impressive, share-worthy gift box.",
        images: ["images/orchids.png", "images/orchids2.png", "images/orchids3.png", "images/orchids4.png"],
        variants: [
            { label: "single stem", price: 180 },
            { label: "bouquet (5 pcs.)", price: 800 }
        ],
        also: ['roses', 'sunflowers', 'tulips']
    }
};

const productMeta = {
    'biscoff':    { img: "images/biscoff.png",    label: "Crunchy Biscoff Cookie" },
    'matcha':     { img: "images/matcha.png",     label: "Matcha Cookie with White Chocolate" },
    'chips':      { img: "images/chips.png",       label: "Chocolate Chip Cookie" },
    'smores':     { img: "images/smores.png",      label: "S'mores Cookie" },
    'redvelvet':  { img: "images/RedVelvet.png",   label: "Red Velvet Cookie" },
    'roses':      { img: "images/roses.png",       label: "Roses" },
    'sunflowers': { img: "images/sunflowers.png",  label: "Sunflowers" },
    'tulips':     { img: "images/tulips.png",      label: "Tulips" },
    'orchids':    { img: "images/orchids.png",     label: "Orchids" }
};




// search products list (global)
const searchProducts = [
    { name: "Crunchy Biscoff Cookie",             price: "₱160.00", img: "images/biscoff.png",    href: "selection.html?id=biscoff",    category: "cookies" },
    { name: "Matcha Cookie with White Chocolate", price: "₱160.00", img: "images/matcha.png",     href: "selection.html?id=matcha",     category: "cookies" },
    { name: "Chocolate Chip Cookie",              price: "₱160.00", img: "images/chips.png",      href: "selection.html?id=chips",      category: "cookies" },
    { name: "Red Velvet Cookie",                  price: "₱160.00", img: "images/RedVelvet.png",  href: "selection.html?id=redvelvet",  category: "cookies" },
    { name: "S'mores Cookie",                     price: "₱160.00", img: "images/smores.png",     href: "selection.html?id=smores",     category: "cookies" },
    { name: "Roses",                              price: "₱50.00",  img: "images/roses.png",      href: "selection.html?id=roses",      category: "flowers" },
    { name: "Sunflowers",                         price: "₱100.00", img: "images/sunflowers.png", href: "selection.html?id=sunflowers", category: "flowers" },
    { name: "Tulips",                             price: "₱70.00",  img: "images/tulips.png",     href: "selection.html?id=tulips",     category: "flowers" },
    { name: "Orchids",                            price: "₱180.00", img: "images/orchids.png",    href: "selection.html?id=orchids",    category: "flowers" },
];


// ===== CART STORAGE =====
function getCart() {
    return JSON.parse(localStorage.getItem('pnp-cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('pnp-cart', JSON.stringify(cart));
}


// ===== SELECTION PAGE =====
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

    const priceDisplay = document.getElementById('price-display');
    if (priceDisplay) {
        priceDisplay.textContent = 'PHP ' + price.toFixed(2);
    }

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = false;
        addToCartBtn.style.cursor = 'pointer';
        addToCartBtn.style.opacity = '1';
    }
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


// ===== DYNAMIC SELECTION PAGE =====
function initSelectionPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id || !productDB[id]) return;

    const product = productDB[id];

    currentPrice = product.variants[0].price;
    currentVariant = product.variants[0].label;

    const title = document.getElementById('product-title');
    if (title) title.textContent = product.name;

    const desc = document.getElementById('product-desc');
    if (desc) desc.textContent = product.desc;

    const priceDisplay = document.getElementById('price-display');
    if (priceDisplay) {
        const min = product.variants[0].price;
        const max = product.variants[product.variants.length - 1].price;
        priceDisplay.textContent = min === max
            ? 'PHP ' + min.toFixed(2)
            : 'PHP ' + min.toFixed(2) + ' - PHP ' + max.toFixed(2);
    }

    const mainImg = document.getElementById('main-product-img');
    if (mainImg) {
        mainImg.src = product.images[0];
        mainImg.alt = product.name;
    }

    const thumbContainer = document.getElementById('product-reco');
    if (thumbContainer) {
        thumbContainer.innerHTML = product.images.map(function(src, i) {
            return '<img src="' + src + '" class="thumb ' + (i === 0 ? 'active' : '') + '" onclick="setThumb(this)">';
        }).join('');
    }

    const variantRow = document.getElementById('variant-row');
    if (variantRow) {
        variantRow.innerHTML = product.variants.map(function(v, i) {
            return '<button class="variant-btn ' + (i === 0 ? 'active' : '') + '" onclick="setVariant(this, ' + v.price + ', \'' + v.label + '\')">' + v.label + '</button>';
        }).join('');
    }

    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
        addBtn.disabled = false;
        addBtn.style.cursor = 'pointer';
        addBtn.style.opacity = '1';
    }

    const alsoGrid = document.getElementById('also-grid');
    if (alsoGrid && product.also) {
    alsoGrid.innerHTML = product.also.map(function(pid) {
        const meta = productMeta[pid];
        const alsoProduct = productDB[pid]; 
        if (!meta) return '';
        return '<a href="selection.html?id=' + pid + '">' +
            '<div class="also-card">' +
            '<img src="' + meta.img + '" alt="' + meta.label + '">' +
            '<div class="product-info">' +
            '<div class="also-price">₱' + alsoProduct.variants[alsoProduct.variants.length -1].price.toFixed(2) + '</div>' + 
            '<div class="also-name">' + meta.label + '</div>' +
            '</div></div></a>';
    }).join('');
}
    document.title = product.name + ' | Petals n Pastry';
}

// ===== CART COUNT BADGE =====
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


// ===== CART PAGE =====
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
        rows[1].textContent = 'FREE';
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

    if (cart.length === 0) {
        if (notice) notice.style.display = 'block';
        if (ordersHeader) ordersHeader.style.display = 'none';
        updateTotals(0);
        return;
    }

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
            <button onclick="removeFromCart(${item.id})" style="background:none;border:none;cursor:pointer;color:#aaa;font-size:1rem;"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(div);
    });

    updateTotals(orderTotal);
}


// ===== PROFILE =====
function initProfile() {
    const profileSection = document.getElementById('profile-info');
    if (!profileSection) return;

    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const title = document.getElementById('profile-title');
    if (title) title.innerText = currentUser.fname.toUpperCase() + "'S ACCOUNT";

    const historySection = document.getElementById('order-history-section');
    const notice = document.querySelector('.notice-1');

    if (currentUser.orderHistory && currentUser.orderHistory.length > 0) {
        if (notice) notice.style.display = 'none';
        currentUser.orderHistory.forEach(function(order) {
            const row = document.createElement('div');
            row.className = 'order-table-header';
            row.innerHTML = `
                <span>${order.date}</span>
                <span>${order.orderNum}</span>
                <span>PHP ${order.total.toFixed(2)}</span>
                <span style="color:#d4a373;">${order.status}</span>
            `;
            historySection.appendChild(row);
        });
    }
}


// ===== CART USER INFO =====
function renderCartUserInfo() {
    const userInfoContainer = document.getElementById('cart-user-details');
    if (!userInfoContainer) return;

    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));
    if (currentUser) {
        userInfoContainer.innerHTML = `
            <div style="font-family:'Lexend',sans-serif; margin-bottom:20px; padding:15px; background:#ffffff; border-radius:8px;">
                <p style="margin:2px 0; font-size:0.9rem;"><strong>Name:</strong> ${currentUser.fname} ${currentUser.lname}</p>
                <p style="margin:2px 0; font-size:0.9rem;"><strong>Email:</strong> ${currentUser.email}</p>
            </div>
        `;
    } else {
        userInfoContainer.innerHTML = `<p style="font-size:0.8rem;color:#888;padding-left:20px;">Please <a href="login.html">login</a> to see details.</p>`;
    }
}


// ===== CHECKOUT =====
function showCheckoutMessage(text, isError) {
    if (isError === undefined) isError = true;
    const msgArea = document.getElementById('checkout-message');
    if (!msgArea) return;
    msgArea.textContent = text;
    msgArea.style.color = isError ? '#e63946' : '#2a9d8f';
    setTimeout(function() { msgArea.textContent = ''; }, 4000);
}

window.processCheckout = function() {
    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));
    const cart = JSON.parse(localStorage.getItem('pnp-cart') || '[]');

    if (!currentUser) {
        showCheckoutMessage('Please log in first!');
        setTimeout(function() { window.location.href = 'login.html'; }, 1500);
        return;
    }

    if (cart.length === 0) {
        showCheckoutMessage('Your cart is empty!');
        return;
    }

    const orderTotal = cart.reduce(function(sum, item) {
        return sum + (item.price * item.qty);
    }, 0);

    const newOrder = {
        date: new Date().toLocaleDateString(),
        orderNum: 'PasTels-' + Math.floor(1000 + Math.random() * 9000),
        total: orderTotal,
        status: 'Processing'
    };

    const users = JSON.parse(localStorage.getItem('pnp-users') || '[]');
    const userIndex = users.findIndex(function(u) { return u.email === currentUser.email; });

    if (userIndex !== -1) {
        if (!users[userIndex].orderHistory) users[userIndex].orderHistory = [];
        users[userIndex].orderHistory.push(newOrder);
        localStorage.setItem('pnp-users', JSON.stringify(users));
        localStorage.setItem('pnp-currentUser', JSON.stringify(users[userIndex]));
    }

    localStorage.removeItem('pnp-cart');
    showCheckoutMessage('Order recorded! Redirecting...', false);
    setTimeout(function() { window.location.href = 'profile.html'; }, 1500);
};


// ===== LOGOUT =====
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('pnp-currentUser');
        window.location.href = 'login.html';
    });
}


// ===== REGISTER =====
const registerBtn = document.querySelector('#login #sign-in');
if (registerBtn && document.getElementById('input-fname')) {
    registerBtn.addEventListener('click', function() {
        const fname = document.getElementById('input-fname').value;
        const lname = document.getElementById('input-lname').value;
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('input-pw').value;
        const confirmPw = document.getElementById('input-confirm-pw').value;

        if (!fname || !email || !password) {
            document.getElementById('create-error').style.display = 'block';
            return;
        }
        if (password !== confirmPw) {
            document.getElementById('pw-unmatched').style.display = 'block';
            return;
        }

        const users = JSON.parse(localStorage.getItem('pnp-users') || '[]');
        if (users.find(function(u) { return u.email === email; })) {
            document.getElementById('alr-existed').style.display = 'block';
            return;
        }

        users.push({ fname: fname, lname: lname, email: email, password: password, orderHistory: [] });
        localStorage.setItem('pnp-users', JSON.stringify(users));
        document.getElementById('madeAcc-success').style.display = 'block';
        setTimeout(function() { window.location.href = 'login.html'; }, 1500);
    });
}


// ===== LOGIN =====
const loginBtn = document.querySelector('#login #sign-in');
if (loginBtn && document.getElementById('login-email') && !document.getElementById('input-fname')) {
    loginBtn.addEventListener('click', function() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            document.getElementById('login-error').style.display = 'block';
            return;
        }

        const users = JSON.parse(localStorage.getItem('pnp-users') || '[]');
        const user = users.find(function(u) { return u.email === email && u.password === password; });

        if (user) {
            localStorage.setItem('pnp-currentUser', JSON.stringify(user));
            window.location.href = 'main_page.html';
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });
}


// ===== SMOOTH SCROLL =====
window.addEventListener('load', function() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
});


// ===== CONTACT FORM =====
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input, textarea');
    const messages = JSON.parse(localStorage.getItem('pnp-messages') || '[]');
    messages.push({
        date: new Date().toLocaleDateString(),
        name: inputs[0].value,
        phone: inputs[1].value,
        message: inputs[2].value
    });
    localStorage.setItem('pnp-messages', JSON.stringify(messages));
    this.reset();
    const success = document.getElementById('contact-success');
    if (success) {
        success.style.display = 'block';
        setTimeout(function() { success.style.display = 'none'; }, 3000);
    }
});


// ===== SINGLE DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', function() {
    initSelectionPage();
    updateCartCount();
    renderCart();
    initProfile();
    renderCartUserInfo();

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.onclick = window.processCheckout;

    // SEARCH
    const searchBtn = document.getElementById('search-btn');
    const searchInline = document.getElementById('search-inline');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

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

            const filtered = searchProducts.filter(function(product) {
                return product.name.toLowerCase().includes(query) || product.category.includes(query);
            });

            if (searchResults) {
                searchResults.innerHTML = filtered.length === 0
                    ? '<p class="no-results">No results found.</p>'
                    : filtered.map(function(p) {
                        return `<a href="${p.href}" class="search-result-item">
                            <img src="${p.img}" alt="${p.name}">
                            <div class="result-info">
                                <span class="result-name">${p.name}</span>
                                <span class="result-price">${p.price}</span>
                            </div>
                        </a>`;
                    }).join('');
                searchResults.classList.add('open');
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (searchResults && !e.target.closest('#navbar')) {
            searchResults.classList.remove('open');
        }
    });

    // CHANGE PASSWORD MODAL
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