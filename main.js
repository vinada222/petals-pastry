//SEARCH FEATURE//
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const searchInline = document.getElementById('search-inline');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

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
        });
    }
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