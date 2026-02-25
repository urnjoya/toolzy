function generate() {
    const result = document.getElementById("result");
    const lengthInput = document.getElementById("length");

    let count = parseInt(lengthInput.value);

    if (isNaN(count) || count < 8) count = 8;
    if (count > 64) count = 64;

    result.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const color = generateRandomColor();
        const rgb = hexToRGB(color);
        const name = getColorName(color);

        const card = document.createElement("div");
        card.className = "color-card";

        card.innerHTML = `
            <div class="color-preview" style="background:${color}"></div>
            <div class="color-info">
                <strong>${name}</strong>
                <strong>HEX: ${color}</strong>
                <strong>RGB: ${rgb}</strong>
            </div>
        `;

        result.appendChild(card);
    }
}

function generateRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
}

function hexToRGB(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

/* Basic color name approximation */
function getColorName(hex) {
    const colors = {
        "#FF0000": "Red",
        "#00FF00": "Lime",
        "#0000FF": "Blue",
        "#FFFF00": "Yellow",
        "#FFA500": "Orange",
        "#800080": "Purple",
        "#000000": "Black",
        "#FFFFFF": "White",
        "#808080": "Gray",
        "#FFC0CB": "Pink"
    };

    if (colors[hex]) return colors[hex];

    return "Custom Color";
}
