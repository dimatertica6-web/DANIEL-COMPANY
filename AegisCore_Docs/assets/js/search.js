
function searchDocs() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.searchable');
    for(let item of items) {
        const text = item.innerText.toLowerCase();
        if(text.includes(query)) item.style.display = 'block';
        else item.style.display = 'none';
    }
}
    