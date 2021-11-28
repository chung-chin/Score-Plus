const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => {
    const inputCheck = searchInput.value.replace(/\s/g, '');

    if (inputCheck != '') {
        searchForm.submit();
    } else {
        window.location = '/scoreplus/results';
    }
})