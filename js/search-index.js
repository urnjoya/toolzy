const BASE_PATH = window.location.origin + window.location.pathname.split('/').slice(0, 2).join('/');


        function navigateTo(path) {
            window.location.href = BASE_PATH + '/' + path;
        }
        let pages = [];

        fetch('data/json/search-index.json')
            .then(res => res.json())
            .then(data => pages = data);

        const input = document.getElementById("searchInput");
        const resultsBox = document.getElementById("searchResults");

        input.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();

            if (!query) {
                resultsBox.style.display = "none";
                return;
            }

            const filtered = pages.filter(page =>
                page.title.toLowerCase().includes(query)
            );

            renderResults(filtered);
        });

        function renderResults(results) {
            resultsBox.innerHTML = "";

            if (results.length === 0) {
                resultsBox.innerHTML = `<div class="search-item">No results found</div>`;
            } else {
                results.forEach(page => {
                    const div = document.createElement("div");
                    div.classList.add("search-item");
                    div.textContent = page.title;

                    div.addEventListener("click", () => {
                        window.location.href = page.url;
                    });

                    resultsBox.appendChild(div);
                });
            }

            resultsBox.style.display = "block";
        }

        document.addEventListener("click", function (e) {
            if (!e.target.closest(".search-container")) {
                resultsBox.style.display = "none";
            }
        });
