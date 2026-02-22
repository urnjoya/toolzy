document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("tool-list");

    fetch("/data/json/utility-tool-list.json")
        .then(res => res.json())
        .then(data => {

            // Remove tools where id contains '#'
            const cleaned = data.filter(item => item.active === true);

            // Sort by rank-id
            cleaned.sort((a, b) =>
                Number(a["rank-id"]) - Number(b["rank-id"])
            );

            renderItems(cleaned);
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "Failed to load.";
        });


    function renderItems(items) {

        container.innerHTML = "";

        items.forEach(item => {

            // TOOL CARD
            if (item.type === "tool") {

                const card = document.createElement("div");
                card.className = "tool-card";

                card.innerHTML = `
                <div>
                  <a href="/tools${item.slug}" class="tool-card card">
                    <div class="tool-card-icon">${item.icon}</div>
                    <div class="tool-card-body">
                      <h3 class="card-title">${item.title}</h3>
                      <p class="card-description">${item.short_description}</p>
                    </div>
                    <span class="tool-card-link">Open Tool</span>
                  </a>
                </div>
            `;

                container.appendChild(card);
            }

            // ADS BOX
            if (item.type === "ad") {

                const adWrapper = document.createElement("div");
                adWrapper.className = "ad-container";

                adWrapper.innerHTML = `
                <div class="ad-block ad-block-square">
                  <p>Advertisement Space</p>
                </div>
            `;

                container.appendChild(adWrapper);
            }

        });
    }

});