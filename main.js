//SEARCH FEATURE//
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const searchInline = document.getElementById('search-inline');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults=document.getElementById('search-results');

    const products = [
        { name: "Crunchy Biscoff Cookie", price: "₱160.00", img: "/images/biscoff.png", href: "selection.html", category: "cookies" },
        { name: "Matcha Cookie with White Chocolate", price: "₱160.00", img: "/images/matcha.png", href: "selection-2.html", category: "cookies" },
        { name: "Chocolate Chip Cookie", price: "₱160.00", img: "/images/chips.png", href: "selection-3.html", category: "cookies" },
        { name: "Red Velvet Cookie", price: "₱160.00", img: "/images/RedVelvet.png", href: "selection-4.html", category: "cookies" },
        { name: "S'mores Cookie", price: "₱160.00", img: "/images/smores.png", href: "selection-5.html", category: "cookies" },
        { name: "Roses", price: "₱50.00", img: "/images/roses.png", href: "rose-selection.html", category: "flowers" },
        { name: "Sunflowers", price: "₱100.00", img: "/images/sunflowers.png", href: "sunflower-selection.html", category: "flowers" },
        { name: "Tulips", price: "₱70.00", img: "/images/tulips.png", href: "tulips-selection.html", category: "flowers" },
        { name: "Orchids", price: "₱180.00", img: "/images/orchids.png", href: "#", category: "flowers" },
    ];


    //opens the search icon when clicked
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchInline.classList.add('open');
            searchBtn.style.display = 'none';
            searchInput.focus();
        });
    }

    //closes the search icon when clicked
    if (closeSearch) {
        closeSearch.addEventListener('click', function() {
            searchInline.classList.remove('open');
            searchBtn.style.display = 'block';
            searchInput.value='';
            resetAll();
        });
    }
    //drop down menu on search
    if(searchInput){
        searchInput.addEventListener('input', function(){
            const query=searchInput.value.trim().toLowerCase();

            if(query === ''){
                searchResults.classList.remove('open');
                searchResults.innerHTML='';
                return;
            }

            //filter
            const filtered = products.filter(function(product){
                return(
                    product.name.toLowerCase().includes(query) || product.category.includes(query)
                );
            });

            // build results HTML
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
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('#navbar')) {
            searchResults.classList.remove('open');
        }
    });
});

// CHANGE PW FEATURE//
document.addEventListener('DOMContentLoaded',()=>{
    const openBtn=document.getElementById('change-password-btn');
    const closeBtn=document.getElementById('close-modal');
    const modal=document.getElementById('change-password-modal');

        //all elements open when the hyperlink is clicked
    if(openBtn && closeBtn && modal){
        openBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            modal.classList.add('active');
        });

        closeBtn.addEventListener('click',()=>{
            modal.classList.remove('active');// modal will exit
        });

        modal.addEventListener('click',(e)=>{
            if(e.target===modal)
                modal.classList.remove('active');
        });
    }
});