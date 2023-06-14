document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-query').value;
    fetch('/search?q=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(results => {
            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = '';
            for (const result of results) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = result.link;
                a.textContent = result.title;
                li.appendChild(a);
                resultsElement.appendChild(li);
            }
        });
});
