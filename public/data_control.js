const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value;
    const inputCheck = inputValue.replace(/\s/g, '')
    if (inputCheck != '') {
        searchForm.submit();
    } else {
        window.location = '/scoreplus/results';
    }
})