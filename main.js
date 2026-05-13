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

//records all added products to the cart
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return;

    const cart = getCart();
    const notice = document.querySelector('.notice');
    const ordersHeader = document.querySelector('.orders');

    cartItemsContainer.innerHTML = '';

    if (ordersHeader) ordersHeader.style.display = 'grid';

    if (cart.length === 0) {

        if (notice) notice.style.display = 'block';
        updateTotals(0);
        return;
    }

    if (notice) notice.style.display = 'none';

    let orderTotal = 0;

    cart.forEach(function(item) {
        const itemTotal = item.price * item.qty;
        orderTotal += itemTotal;

        // horizontal line on details/menu info
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

//search filtering on products 
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

    currentPrice = price;
    currentVariant = variant;

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

// USERS AND SESSIONS
document.addEventListener('click', function(e) {
    if (e.target && e.target.textContent === 'Create Account') {
        e.preventDefault();
        window.location.href = 'register.html';
    }
    if (e.target && e.target.textContent.includes('log in here')) {
        e.preventDefault();
        window.location.href = 'login.html';
    }
});

//Register or Create a new account feature
const registerBtn = document.querySelector('#login #sign-in'); 

if (registerBtn && document.getElementById('input-fname')) {
    registerBtn.addEventListener('click', () => {
        const fname = document.getElementById('input-fname').value;
        const lname = document.getElementById('input-lname').value;
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('input-pw').value;
        const confirmPw = document.getElementById('input-confirm-pw').value;

        if (!fname || !email || !password){
        document.getElementById('create-error').style.display='block';
        return;
        }

        if (password !== confirmPw){
            document.getElementById('pw-unmatched').style.display='block'
            return;
        }

        const users = JSON.parse(localStorage.getItem('pnp-users') || '[]');
        if (users.find(u => u.email === email)){
        document.getElementById('alr-existed').style.display='block'
        return;
    }


        users.push({ 
            fname, 
            lname, 
            email, 
            password, 
            orderHistory: [] 
        });
        
        localStorage.setItem('pnp-users', JSON.stringify(users));

        document.getElementById('madeAcc-success').style.display = 'block';

        setTimeout(function() {
        window.location.href = 'login.html';
    }, 1500);
});
}

// Login feature
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
        const user = users.find(function(u) {
            return u.email === email && u.password === password;
        });

        if (user) {
            localStorage.setItem('pnp-currentUser', JSON.stringify(user));
            window.location.href = 'main_page.html';
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });
}

// check out monitor and record
function processCheckout() {
    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));
    const cart = JSON.parse(localStorage.getItem('pnp-cart') || '[]');

    if (!currentUser) {
        alert("Please log in to checkout!");
        window.location.href = 'login.html';
        return;
    }

    if (cart.length === 0) return alert("Your cart is empty!");

    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newOrder = {
        date: new Date().toLocaleDateString(),
        orderNum: 'PNP-' + Math.floor(1000 + Math.random() * 9000),
        total: orderTotal,
        status: 'Processing'
    };

    // Update the local storage (database for now)
    const users = JSON.parse(localStorage.getItem('pnp-users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
        users[userIndex].orderHistory.push(newOrder);
        localStorage.setItem('pnp-users', JSON.stringify(users));
        
        localStorage.setItem('pnp-currentUser', JSON.stringify(users[userIndex]));
    }

    localStorage.removeItem('pnp-cart'); //clears data
    alert("Purchase successful! Redirecting to profile...");
    window.location.href = 'profile.html';
}

// PROFILE AND HISTORY- user's information 
function initProfile() {
    const profileSection = document.getElementById('profile-info');
    if (!profileSection) return;

    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const title = document.getElementById('profile-title');
    if (title) title.innerText = `${currentUser.fname.toUpperCase()}'S ACCOUNT`;
    
    const historySection = document.getElementById('order-history-section');
    const notice = document.querySelector('.notice-1');

    if (currentUser.orderHistory && currentUser.orderHistory.length > 0) {
        if (notice) notice.style.display = 'none';
        
        currentUser.orderHistory.forEach(order => {
            const row = document.createElement('div');
            row.className = 'order-table-header';
            row.style.cssText = "font-weight: 400; border-top: 1px solid #eee; display: grid; grid-template-columns: repeat(4, 1fr); padding: 10px 0;";
            row.innerHTML = `
                <span>${order.date}</span>
                <span>${order.orderNum}</span>
                <span>PHP ${order.total.toFixed(2)}</span>
                <span style="color: #d4a373;">${order.status}</span>
            `;
            historySection.appendChild(row);
        });
    }
}

// logout feature 
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('pnp-currentUser'); // Clears only the session
        window.location.href = 'login.html';
    });
}

// refresh
document.addEventListener('DOMContentLoaded', () => {
    initProfile();
    
    // Wire up checkout button if we are on the cart page
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = processCheckout;
    }
});

//shopping cart information for the user
function renderCartUserInfo() {
    const userInfoContainer = document.getElementById('cart-user-details');
    if (!userInfoContainer) return;

    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));

    if (currentUser) {
        userInfoContainer.innerHTML = `
            <div class="user-info-row" style="font-family: 'Lexend', sans-serif; margin-bottom: 20px; padding: 15px; background: #ffffff; border-radius: 8px;">
                <h4 style="margin: 0 0 5px 0; color: #3a3a3a;">Customer Details</h4>
                <p style="margin: 2px 0; font-size: 0.9rem;"><strong>Name:</strong> ${currentUser.fname} ${currentUser.lname}</p>
                <p style="margin: 2px 0; font-size: 0.9rem;"><strong>Email:</strong> ${currentUser.email}</p>
                <p style="margin: 2px 0; font-size: 0.9rem;"><strong>Address:</strong> Address 0123, Philippines</p>
            </div>
        `;
    } else {
        userInfoContainer.innerHTML = `<p style="font-size: 0.8rem; color: #888; padding-left:20px; ">Please <a href="login.html">login</a> to see shipping details.</p>`;
    }
}

// Update DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
    initProfile();
    renderCartUserInfo(); 
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.onclick = processCheckout;
});

// check out button function for it to record on the profile tab (this is for visual and demo for now)
function showCheckoutMessage(text, isError = true) {
    const msgArea = document.getElementById('checkout-message');
    if (!msgArea) return;

    msgArea.textContent = text;
    msgArea.style.color = isError ? "#e63946" : "#2a9d8f"; // Red for errors, Green for success

    // Clear the message
    setTimeout(() => {
        msgArea.textContent = "";
    }, 4000);
}

window.processCheckout = function() {
    const currentUser = JSON.parse(localStorage.getItem('pnp-currentUser'));
    const cart = JSON.parse(localStorage.getItem('pnp-cart') || '[]');

    //check Login
    if (!currentUser) {
        showCheckoutMessage("Please log in first!");
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    //Check Cart
    if (cart.length === 0) {
        showCheckoutMessage("Your cart is empty!");
        return;
    }

    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newOrder = {
        date: new Date().toLocaleDateString(),
        orderNum: 'PasTels-' + Math.floor(1000 + Math.random() * 9000),
        total: orderTotal,
        status: 'Processing'
    };

    const users = JSON.parse(localStorage.getItem('pnp-users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
        users[userIndex].orderHistory.push(newOrder);
        localStorage.setItem('pnp-users', JSON.stringify(users));
        localStorage.setItem('pnp-currentUser', JSON.stringify(users[userIndex]));
    }

    localStorage.removeItem('pnp-cart');
    showCheckoutMessage("Order recorded! Redirecting...", false);
    

    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
};
